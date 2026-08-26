"""Capturas de las cinco vistas de Career Tracker (:4830) + demo en video del grafo."""
from pathlib import Path
import sys
from playwright.sync_api import sync_playwright

OUT = Path(sys.argv[1]); OUT.mkdir(parents=True, exist_ok=True)
VID = OUT / "video"; VID.mkdir(exist_ok=True)
for f in VID.glob("*.webm"): f.unlink()
BASE = "http://localhost:4830"
VISTAS = ["Graph view", "Avance", "Cronograma", "Legajo", "Planificador"]

with sync_playwright() as pw:
    b = pw.chromium.launch()

    # --- capturas fijas, a 2x ---
    pg = b.new_page(viewport={"width": 1440, "height": 900}, device_scale_factor=2)
    pg.goto(BASE, wait_until="networkidle"); pg.wait_for_timeout(4000)
    for i, v in enumerate(VISTAS):
        pg.locator("#tabbar .tab", has_text=v).first.click()
        pg.wait_for_timeout(3500 if i == 0 else 2200)
        nombre = v.lower().replace(" ", "-")
        pg.screenshot(path=str(OUT / f"career-{i}-{nombre}.png"))
        print("  ->", nombre)
    pg.close()

    # --- demo en video: recorrido por las cinco vistas ---
    ctx = b.new_context(viewport={"width": 1280, "height": 800},
                        record_video_dir=str(VID),
                        record_video_size={"width": 1280, "height": 800})
    v = ctx.new_page()
    v.goto(BASE, wait_until="networkidle"); v.wait_for_timeout(5000)

    # el grafo: pasar por encima de materias para que se vea la cadena de trabas
    caja = v.locator("svg, canvas").first
    try:
        bb = caja.bounding_box()
        if bb:
            for dx, dy in [(0.35, 0.4), (0.55, 0.55), (0.7, 0.35), (0.45, 0.7)]:
                v.mouse.move(bb["x"] + bb["width"] * dx, bb["y"] + bb["height"] * dy)
                v.wait_for_timeout(1400)
    except Exception as e:
        print("  hover grafo:", e)
    v.wait_for_timeout(1200)

    for nombre in VISTAS[1:]:
        v.locator("#tabbar .tab", has_text=nombre).first.click()
        v.wait_for_timeout(1000)
        v.mouse.wheel(0, 420); v.wait_for_timeout(1600)
        v.mouse.wheel(0, 420); v.wait_for_timeout(1800)
    v.locator("#tabbar .tab", has_text="Graph view").first.click()
    v.wait_for_timeout(2500)
    ctx.close()
    b.close()

for f in VID.glob("*.webm"):
    print("video:", f, f.stat().st_size // 1024, "KB")
print("OK")
