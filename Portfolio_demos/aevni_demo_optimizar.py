"""Demo en VIDEO de AEVNI: pegar un prompt verbose y optimizarlo, en la app real.

REQUIERE UNA API KEY. AEVNI no tiene modo offline: siempre llama a un proveedor.
El proveedor gratis por defecto (Pollinations) hoy responde HTTP 402 en todos sus
modelos, asi que el camino que funciona sin tocar el navegador es la env var que
la app ya lee del entorno:

    setx GEMINI_API_KEY tu-clave      # una vez, en PowerShell
    # reabrir la terminal, levantar Token/app.py y correr este script

Sin key el script llega hasta el prompt cargado y avisa que no hubo resultado.

    python Portfolio_demos/aevni_demo_optimizar.py <carpeta-salida>
"""
from pathlib import Path
import sys
from playwright.sync_api import sync_playwright

OUT = Path(sys.argv[1] if len(sys.argv) > 1 else "."); OUT.mkdir(parents=True, exist_ok=True)
FR = OUT / "frames"; FR.mkdir(exist_ok=True)
for f in FR.glob("*.png"): f.unlink()
VID = OUT / "video"; VID.mkdir(exist_ok=True)
for f in VID.glob("*.webm"): f.unlink()
BASE = "http://localhost:5000"
W, H = 1280, 800

PROMPT = (
    # Caso ficticio de atencion al cliente: es un prompt con mucho relleno de
    # cortesia, que es exactamente lo que el optimizador tiene para cortar.
    "Hola! Espero que estés muy bien. Te quería hacer una consulta si no es "
    "molestia. Mirá, lo que pasa es que necesito, si es posible y si te parece "
    "bien, que me ayudes a redactar una respuesta para un cliente que nos "
    "escribió quejándose porque el pedido le llegó tarde. La idea sería que la "
    "respuesta sea amable, que le pidamos disculpas de manera sincera, que le "
    "expliquemos que hubo un problema con el correo pero sin echarle toda la "
    "culpa al correo tampoco, y que le ofrezcamos algún tipo de compensación, "
    "no sé, un descuento para la próxima compra o algo así. Ah, y que no sea "
    "muy larga porque si es muy larga la gente no la lee. También estaría bueno "
    "que termine invitándolo a que nos vuelva a escribir si necesita cualquier "
    "otra cosa. Muchísimas gracias por tu ayuda, de verdad te lo agradezco un "
    "montón."
)

n = [0]
def frame(pg, veces=1):
    for _ in range(veces):
        pg.screenshot(path=str(FR / f"f{n[0]:03d}.png")); n[0] += 1

with sync_playwright() as pw:
    b = pw.chromium.launch()
    ctx = b.new_context(viewport={"width": W, "height": H},
                        record_video_dir=str(VID),
                        record_video_size={"width": W, "height": H})
    pg = ctx.new_page()
    pg.goto(BASE, wait_until="networkidle")
    pg.wait_for_timeout(1500)

    # El provider por defecto es Pollinations, que hoy devuelve HTTP 402. Gemini
    # es el unico que la app puede resolver con una key del entorno del servidor,
    # sin escribirla en el navegador.
    gem = pg.locator("button", has_text="Gemini 2.5").first
    gem.click()
    pg.wait_for_timeout(900)
    frame(pg, 4)

    # tipeo progresivo: en el video se ve el prompt entrando
    ta = pg.locator("#prompt-input")
    ta.click()
    paso = max(1, len(PROMPT) // 14)
    for i in range(0, len(PROMPT), paso):
        ta.fill(PROMPT[: i + paso]); pg.wait_for_timeout(70); frame(pg)
    ta.fill(PROMPT)
    pg.wait_for_timeout(700); frame(pg, 3)
    pg.screenshot(path=str(OUT / "aevni-prompt.png"))

    pg.click("#optimize-btn")
    for _ in range(10):
        pg.wait_for_timeout(400); frame(pg)

    ok = True
    try:
        pg.wait_for_selector("#results", state="visible", timeout=120000)
        pg.wait_for_function(
            "() => { const e = document.querySelector('#output-text');"
            "        return e && e.textContent.trim().length > 40; }",
            timeout=120000)
    except Exception as e:
        ok = False
        print("SIN RESULTADO — falta una API key valida.", e)

    if ok:
        pg.wait_for_timeout(1500); frame(pg, 4)
        pg.locator("#results").scroll_into_view_if_needed()
        pg.wait_for_timeout(1200); frame(pg, 10)
        pg.screenshot(path=str(OUT / "aevni-resultado.png"))
        try:
            print("tokens:", pg.inner_text("#m-tokens-saved"),
                  "/", pg.inner_text("#m-tokens-pct"))
        except Exception:
            pass
        # la pestana de diff, si esta
        for lbl in ["Diff", "Comparar"]:
            t = pg.locator(f"#output-tabs >> text={lbl}")
            if t.count():
                t.first.click(); pg.wait_for_timeout(1200); frame(pg, 8)
                pg.screenshot(path=str(OUT / "aevni-diff.png"))
                break

    ctx.close(); b.close()

for v in VID.glob("*.webm"):
    print("video:", v, v.stat().st_size // 1024, "KB")
print("frames:", n[0])
