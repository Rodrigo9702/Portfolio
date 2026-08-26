"""Levanta AEVNI para sacar las capturas del portfolio.

Existe por un detalle de Windows: `setx` escribe la variable en el registro del
usuario, pero un proceso que ya estaba vivo NO la ve — hereda el entorno de
cuando arranco. Si se levanta la app desde una terminal abierta antes de setear
GEMINI_API_KEY, la key no llega, el provider cae en Pollinations y desde la UI
eso se ve como un error de conexion.

Este runner lee la variable del registro del usuario cuando no esta en el
entorno del proceso, y recien despues importa la app.

    python Portfolio_demos/aevni_run_preview.py

Nunca imprime la key: solo dice si la encontro y cuantos caracteres tiene.
"""
from __future__ import annotations

import os
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent / "Token"

CLAVES = ("GEMINI_API_KEY", "GROQ_API_KEY", "OPENAI_API_KEY",
          "OPENROUTER_API_KEY", "CEREBRAS_API_KEY")


def _del_registro(nombre: str) -> str | None:
    """La variable de usuario tal como quedo en el registro tras un setx."""
    if sys.platform != "win32":
        return None
    try:
        import winreg
        with winreg.OpenKey(winreg.HKEY_CURRENT_USER, "Environment") as k:
            valor, _ = winreg.QueryValueEx(k, nombre)
            return (valor or "").strip() or None
    except (OSError, FileNotFoundError):
        return None


for nombre in CLAVES:
    if os.environ.get(nombre, "").strip():
        print(f"[aevni] {nombre}: ya estaba en el entorno")
        continue
    valor = _del_registro(nombre)
    if valor:
        os.environ[nombre] = valor
        print(f"[aevni] {nombre}: recuperada del registro ({len(valor)} chars)")

if not os.environ.get("GEMINI_API_KEY"):
    print("[aevni] AVISO: sin GEMINI_API_KEY. El provider Gemini va a fallar y "
          "Pollinations hoy devuelve HTTP 402.")

sys.path.insert(0, str(RAIZ))
os.chdir(RAIZ)

from app import app  # noqa: E402

if __name__ == "__main__":
    port = int(os.getenv("PORT", "5000"))
    print(f"[aevni] sirviendo en http://127.0.0.1:{port}")
    app.run(host="127.0.0.1", port=port, debug=False, use_reloader=False)
