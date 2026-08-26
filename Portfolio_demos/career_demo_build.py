"""Genera una copia DEMO de Career Tracker con un legajo ficticio.

Las capturas del portfolio no pueden mostrar el legajo real: notas y condicion
son datos personales. Este script toma `D:/CarreerTracker/index.html`, deja
intacto el plan de estudios (codigos, nombres, anios, correlativas — que son
publicos) y reemplaza SOLO `condicion` y `nota` por un recorrido inventado.

    python Portfolio_demos/career_demo_build.py

Escribe en `Portfolio_demos/career-demo/index.html`. El archivo
original NO se toca.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ORIGEN = Path("D:/CarreerTracker/index.html")
SALIDA = Path(__file__).resolve().parent / "career-demo" / "index.html"

# Cuantas materias aprobadas por anio en el legajo inventado, y cual queda
# "Cursada" (cursada con final pendiente). El resto queda sin aprobar.
PERFIL = {
    "Primer año":    {"aprobadas": 12, "cursadas": 0},
    "Segundo año":   {"aprobadas": 10, "cursadas": 1},
    "Tercer año":    {"aprobadas": 6,  "cursadas": 1},
    "Cuarto año":    {"aprobadas": 0,  "cursadas": 0},
    "Quinto año":    {"aprobadas": 0,  "cursadas": 0},
    "Transversales": {"aprobadas": 4,  "cursadas": 0},
}

# Notas ciclicas: dan una distribucion creible, con moda en 7-8, sin ser
# aleatorias (asi la captura es reproducible).
NOTAS = [8.0, 7.0, 9.0, 6.0, 8.0, 7.0, 10.0, 7.0, 8.0, 6.0, 9.0, 7.0]


def construir() -> None:
    html = ORIGEN.read_text(encoding="utf-8")
    m = re.search(r"const SEED = (\[.*?\]);", html, re.S)
    if not m:
        raise SystemExit("No encontre el array SEED en el HTML original.")

    seed = json.loads(m.group(1))

    contadores = {a: dict(v) for a, v in PERFIL.items()}
    i_nota = 0
    aprobadas = cursadas = 0

    for materia in seed:
        anio = materia.get("anio", "")
        cupo = contadores.get(anio)
        if cupo and cupo["aprobadas"] > 0:
            cupo["aprobadas"] -= 1
            materia["condicion"] = "Aprobada"
            materia["nota"] = NOTAS[i_nota % len(NOTAS)]
            i_nota += 1
            aprobadas += 1
        elif cupo and cupo["cursadas"] > 0:
            cupo["cursadas"] -= 1
            materia["condicion"] = "Cursada"
            materia["nota"] = 0
            cursadas += 1
        else:
            materia["condicion"] = "No aprobada"
            materia["nota"] = 0
        # la recalcula la app sola a partir de PREREQS
        materia["disponibilidad"] = "No Disponible"

    nuevo = "const SEED = " + json.dumps(seed, ensure_ascii=False) + ";"
    html = html[:m.start()] + nuevo + html[m.end():]

    SALIDA.parent.mkdir(parents=True, exist_ok=True)
    SALIDA.write_text(html, encoding="utf-8")

    prom = sum(NOTAS[k % len(NOTAS)] for k in range(aprobadas)) / max(aprobadas, 1)
    print(f"[career-demo] {SALIDA}")
    print(f"[career-demo] {aprobadas}/{len(seed)} aprobadas, {cursadas} cursada(s), "
          f"promedio {prom:.2f} — todo inventado")


if __name__ == "__main__":
    construir()
