"""Generate neural MP3 for A2 lessons and dialogues without altering A1 audio."""
import asyncio
import json
from pathlib import Path
import edge_tts

ROOT = Path(__file__).resolve().parents[1]
def read_js(path, prefix):
    raw = (ROOT / path).read_text(encoding="utf-8").strip()
    return json.loads(raw.removeprefix(prefix).rstrip(";\n "))
lessons = read_js("curriculum/a2-lessons.js", "window.LEXORA_A2 = ")
dialogues = read_js("curriculum/a2-dialogues.js", "window.LEXORA_A2_DIALOGUES = ")
phrases = list(dict.fromkeys(
    [ex["ru"] for lesson in lessons for ex in lesson["examples"]]
    + [turn[0] for dialogue in dialogues for turn in dialogue["turns"]]
))
async def main():
    directory = ROOT / "audio" / "neural"
    directory.mkdir(parents=True, exist_ok=True)
    manifest = {}
    failures = []
    for index, phrase in enumerate(phrases, 1):
        filename = f"a2-{index:03d}.mp3"
        output = directory / filename
        try:
            if not output.is_file() or output.stat().st_size < 1000:
                await edge_tts.Communicate(phrase, "ru-RU-SvetlanaNeural").save(str(output))
            if output.stat().st_size < 1000:
                raise ValueError("MP3 unexpectedly small")
            manifest[phrase] = f"audio/neural/{filename}"
        except Exception as exc:
            failures.append(f"{phrase}: {exc}")
    if failures:
        raise RuntimeError("\n".join(failures))
    (ROOT / "a2-neural-audio.js").write_text(
        "window.LEXORA_A2_AUDIO = " + json.dumps(manifest, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )
    print(f"Verified {len(manifest)} A2 neural recordings")
if __name__ == "__main__":
    asyncio.run(main())
