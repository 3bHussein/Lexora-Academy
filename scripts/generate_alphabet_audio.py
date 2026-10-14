"""Generate natural Russian letter-name recordings for the 33 Cyrillic letters."""
import asyncio
import json
from pathlib import Path
import edge_tts

ROOT = Path(__file__).resolve().parents[1]
raw = (ROOT / "curriculum/a1-alphabet.js").read_text(encoding="utf-8")
letters = json.loads(raw.removeprefix("window.LEXORA_ALPHABET = ").rstrip(";\n "))
assert len(letters) == 33
async def main():
    folder = ROOT / "audio" / "neural"
    folder.mkdir(parents=True, exist_ok=True)
    manifest = {}
    for index, item in enumerate(letters, 1):
        char = item["letter"].split()[0]
        path = folder / f"letter-{index:02d}.mp3"
        if not path.is_file() or path.stat().st_size < 1000:
            # Russian neural voice reads the letter's conventional name in context.
            await edge_tts.Communicate(f"Буква {char}.", "ru-RU-SvetlanaNeural").save(str(path))
        assert path.stat().st_size > 1000, str(path)
        manifest[char] = "audio/neural/" + path.name
    (ROOT / "alphabet-neural-audio.js").write_text(
        "window.LEXORA_ALPHABET_AUDIO = " + json.dumps(manifest, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )
    print("Verified", len(manifest), "letter recordings")
if __name__ == "__main__":
    asyncio.run(main())
