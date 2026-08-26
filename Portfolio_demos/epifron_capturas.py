"""Capturas reales de Epifron contra la base de DEMO (:5001)."""
from pathlib import Path
import sys
from playwright.sync_api import sync_playwright

OUT = Path(sys.argv[1]); OUT.mkdir(parents=True, exist_ok=True)
FR = OUT / "frames"; FR.mkdir(exist_ok=True)
BASE = "http://127.0.0.1:5001"

PAGINAS = [
    ("/?mes=8&anio=2026",           "dashboard"),
    ("/",                          "dashboard-historico"),
    ("/compras",       "compras"),
    ("/proyecciones",  "proyecciones"),
    ("/inversiones",   "inversiones"),
    ("/suscripciones", "suscripciones"),
    ("/resumen?mes=8&anio=2026",    "resumen"),
    ("/calendario",    "calendario"),
    ("/movimientos?mes=8&anio=2026","movimientos"),
    ("/tarjetas",      "tarjetas"),
    ("/presupuestos",  "presupuestos"),
]

with sync_playwright() as pw:
    b = pw.chromium.launch()
    pg = b.new_page(viewport={"width": 1440, "height": 900}, device_scale_factor=2)

    pg.goto(f"{BASE}/auth/login", wait_until="networkidle")
    pg.screenshot(path=str(OUT / "00-login.png"))
    try:
        pg.fill("input[name=username]", "demo")
        pg.fill("input[name=password]", "epifron-demo")
        pg.click("button[type=submit]")
        pg.wait_for_load_state("networkidle")
    except Exception as e:
        print("login fallo:", e)
    print("post-login url:", pg.url)

    for ruta, nombre in PAGINAS:
        try:
            r = pg.goto(BASE + ruta, wait_until="networkidle", timeout=30000)
            pg.wait_for_timeout(1600)   # que terminen los graficos
            pg.screenshot(path=str(OUT / f"{nombre}.png"))
            pg.screenshot(path=str(OUT / f"{nombre}-full.png"), full_page=True)
            print(f"{ruta:16s} {r.status if r else '?'}  ok")
        except Exception as e:
            print(f"{ruta:16s} ERROR {e}")
    b.close()
print("OK")
