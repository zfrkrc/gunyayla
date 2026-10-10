#!/usr/bin/env python3
"""gunyayla Next.js i18n — src/locales/tr.json'dan hedef dillere çeviri (ollama)."""
import json, os, re, urllib.request

OLLAMA = os.environ.get("OLLAMA_URL", "http://172.16.16.99:11434")
MODEL = os.environ.get("I18N_MODEL", "qwen2.5:14b")
LANGS = [("en", "English"), ("de", "German"), ("es", "Spanish"), ("fr", "French"),
         ("ru", "Russian"), ("zh", "Simplified Chinese"), ("pt", "Portuguese")]
HERE = os.path.dirname(os.path.abspath(__file__))
LOCALES = os.path.join(HERE, "..", "src", "locales")


def gen(system, user):
    payload = {"model": MODEL, "stream": False, "options": {"temperature": 0.15},
               "messages": [{"role": "system", "content": system}, {"role": "user", "content": user}]}
    req = urllib.request.Request(OLLAMA + "/api/chat", data=json.dumps(payload).encode(),
                                 headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=600) as r:
        return json.load(r)["message"]["content"].strip()


def collect(o):
    out = []
    if isinstance(o, dict):
        for v in o.values():
            out += collect(v)
    elif isinstance(o, list):
        for v in o:
            out += collect(v)
    elif isinstance(o, str):
        out.append(o)
    return out


def setall(o, vals):
    it = iter(vals)
    def rec(x):
        if isinstance(x, dict):
            return {k: rec(v) for k, v in x.items()}
        if isinstance(x, list):
            return [rec(v) for v in x]
        if isinstance(x, str):
            return next(it)
        return x
    return rec(o)


def main():
    tr = json.load(open(os.path.join(LOCALES, "tr.json"), encoding="utf-8"))
    strings = collect(tr)
    for code, name in LANGS:
        print(f"== {code} ==", flush=True)
        try:
            sysmsg = (f"Translate each Turkish string to {name}. Return ONLY a JSON array of the "
                      f"SAME length/order. Keep brand names (GünYayla) and emails verbatim. No explanations.")
            raw = gen(sysmsg, json.dumps(strings, ensure_ascii=False))
            m = re.search(r"\[.*\]", raw, re.S)
            arr = json.loads(m.group(0)) if m else None
            if not isinstance(arr, list) or len(arr) != len(strings):
                raise ValueError("bad")
        except Exception as e:
            print("   batch hata, tek tek:", e, flush=True)
            arr = []
            for s in strings:
                try:
                    arr.append(gen(f"Translate to {name}. Output only the translation.", s))
                except Exception:
                    arr.append(s)
        out = setall(tr, arr)
        out["code"] = code
        json.dump(out, open(os.path.join(LOCALES, f"{code}.json"), "w", encoding="utf-8"),
                  ensure_ascii=False, indent=2)
        print("   yazıldı:", code, flush=True)


if __name__ == "__main__":
    main()
