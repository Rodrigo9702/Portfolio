"""Demo en VIDEO de Epifron: registrar gastos por chat con IA, en la app real.

Graba webm con el recorder de Playwright y ademas deja los frames por si hace
falta armar un GIF. Corre contra la base de DEMO en :5001.
"""
from pathlib import Path
import sys
from playwright.sync_api import sync_playwright

OUT = Path(sys.argv[1]); OUT.mkdir(parents=True, exist_ok=True)
FR = OUT / "frames-chat"; FR.mkdir(exist_ok=True)
for f in FR.glob("*.png"): f.unlink()
VID = OUT / "video"; VID.mkdir(exist_ok=True)
for f in VID.glob("*.webm"): f.unlink()
BASE = "http://127.0.0.1:5001"
W, H = 1280, 800

TURNOS = [
    "gasté 48500 en el super con la visa",
    "cuánto llevo gastado este mes?",
    "en qué categoría se me va más plata?",
]

n = [0]
def frame(pg, veces=1):
    for _ in range(veces):
        pg.screenshot(path=str(FR / f"f{n[0]:03d}.png")); n[0] += 1

def listo(pg):
    """El input se deshabilita mientras la IA procesa; hay que esperarlo."""
    pg.wait_for_selector("#chatInput:not([disabled])", timeout=180000)

with sync_playwright() as pw:
    b = pw.chromium.launch()
    ctx = b.new_context(viewport={"width": W, "height": H},
                        record_video_dir=str(VID),
                        record_video_size={"width": W, "height": H})
    pg = ctx.new_page()

    pg.goto(f"{BASE}/auth/login", wait_until="networkidle")
    pg.fill("input[name=username]", "demo")
    pg.fill("input[name=password]", "epifron-demo")
    pg.click("button[type=submit]")
    pg.wait_for_load_state("networkidle")
    pg.goto(f"{BASE}/?mes=8&anio=2026", wait_until="networkidle")
    pg.wait_for_timeout(2500)
    frame(pg, 4)

    pg.click("#chatToggle")
    pg.wait_for_timeout(1200)
    frame(pg, 4)

    for t in TURNOS:
        listo(pg)
        inp = pg.locator("#chatInput")
        inp.click()
        paso = max(1, len(t) // 12)
        for i in range(0, len(t), paso):
            inp.fill(t[: i + paso]); pg.wait_for_timeout(70); frame(pg)
        inp.fill(t)
        pg.wait_for_timeout(500); frame(pg, 2)

        pg.click("#chatSend")
        for _ in range(10):
            pg.wait_for_timeout(400); frame(pg)
        try:
            listo(pg)
        except Exception as e:
            print("timeout esperando respuesta a:", t, e)
        pg.wait_for_timeout(2500)
        frame(pg, 8)

    # cierre: el gasto recien cargado ya aparece en el dashboard
    pg.wait_for_timeout(1000)
    pg.click("#chatClose")
    pg.wait_for_timeout(600)
    pg.goto(f"{BASE}/movimientos?mes=8&anio=2026", wait_until="networkidle")
    pg.wait_for_timeout(2000)
    frame(pg, 4)
    # el movimiento que acaba de crear el chat esta al final de la tabla
    fila = pg.locator("tr", has_text="super").last
    try:
        fila.scroll_into_view_if_needed(timeout=8000)
    except Exception:
        pg.mouse.wheel(0, 600)
    pg.wait_for_timeout(2500)
    frame(pg, 12)

    pg.screenshot(path=str(OUT / "chat-final.png"))
    print(pg.url)
    ctx.close()
    b.close()

for v in VID.glob("*.webm"):
    print("video:", v, v.stat().st_size // 1024, "KB")
print("frames:", n[0])
