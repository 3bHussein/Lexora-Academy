"""Generate free neural Russian speech for Lexora A1 sample lessons.
Requires internet during generation; committed MP3 files work offline.
"""
import argparse
import asyncio
import json
from pathlib import Path
import edge_tts

ROOT = Path(__file__).resolve().parents[1]
PHRASES = [
"Привет!", "Здравствуйте!", "Меня зовут Анна.", "Как вас зовут?",
"Спасибо!", "Извините.", "Да.", "Нет.", "Я студент.",
"Вы инженер.", "Я из Египта.", "Я говорю по-русски.",
"Один, два, три.", "Десять.", "Где метро?", "Что это?",
"Это моя мама.", "Это мой брат.", "Я хочу чай.", "Можно воду?",
"Сегодня понедельник.", "Сейчас два часа.", "Сколько это стоит?",
"Это дорого."
]
async def main():
    p = argparse.ArgumentParser()
    p.add_argument("--voice", default="ru-RU-SvetlanaNeural")
    p.add_argument("--limit", type=int, default=0)
    args = p.parse_args()
    dest = ROOT / "audio" / "neural"
    dest.mkdir(parents=True, exist_ok=True)
    manifest = {}
    errors = []
    for i, phrase in enumerate(PHRASES[:args.limit or None]):
        filename = f"a1-{i+1:03}.mp3"
        output = dest / filename
        try:
            if not output.exists() or output.stat().st_size == 0:
                await edge_tts.Communicate(phrase, args.voice).save(str(output))
            manifest[phrase] = f"audio/neural/{filename}"
            print(f"{i+1}: {phrase}")
        except Exception as exc:
            errors.append({"phrase": phrase, "error": str(exc)})
            print(f"ERROR: {phrase}: {exc}")
    (ROOT / "neural-audio.js").write_text(
        "window.LEXORA_AUDIO = " + json.dumps(manifest, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )
    if errors:
        (ROOT / "audio-errors.json").write_text(json.dumps(errors, ensure_ascii=False, indent=2), encoding="utf-8")
        raise SystemExit(f"{len(errors)} audio files failed")
    print(f"Generated/verified {len(manifest)} MP3 files")

if __name__ == "__main__":
    asyncio.run(main())
