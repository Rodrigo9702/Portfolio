"""Capturas de AEVNI (localhost:5000) que NO dependen de llamar al modelo."""
from pathlib import Path
import sys
from playwright.sync_api import sync_playwright

OUT = Path(sys.argv[1]); OUT.mkdir(parents=True, exist_ok=True)

PROMPT = (
    "Hola, buenas. Quería pedirte por favor si podrías ayudarme con una cosa. "
    "Tengo una base de clientes en un CSV y me gustaría que me ayudes a escribir "
    "un script en Python que lea ese archivo, revise si hay filas duplicadas por "
    "email, y si las hay que se quede solo con la más reciente según la fecha de "
    "alta. Después que guarde el resultado en un CSV nuevo. Ah, y también estaría "
    "bueno que me imprima cuántas filas había antes y cuántas quedaron. Si podés "
    "agregarle manejo de errores por si el archivo no existe, buenísimo. Gracias."
)

def shot(pg, nombre, full=False):
    pg.screenshot(path=str(OUT / f"{nombre}.png"), full_page=full)
    print("  ->", nombre)

with sync_playwright() as pw:
    b = pw.chromium.launch()
    pg = b.new_page(viewport={"width": 1440, "height": 900}, device_scale_factor=2)
    pg.goto("http://localhost:5000", wait_until="networkidle")
    pg.wait_for_timeout(1500)

    # 1. Optimizar, con el prompt verbose ya pegado
    pg.fill("#prompt-input", PROMPT)
    pg.wait_for_timeout(600)
    shot(pg, "aevni-01-prompt")

    # 2. Los nueve proveedores, que es el diferencial del proyecto
    for sel in ["text=Pollinations", "#provider-btn", ".provider-select"]:
        el = pg.locator(sel).first
        if el.count() and el.is_visible():
            try:
                el.click(); pg.wait_for_timeout(800)
                shot(pg, "aevni-02-providers")
            except Exception as e:
                print("  providers:", e)
            break

    # 3. Directorio de modelos
    try:
        pg.locator("#directory-toggle").click()
        pg.wait_for_timeout(1500)
        shot(pg, "aevni-03-directorio")
        shot(pg, "aevni-03-directorio-full", full=True)
    except Exception as e:
        print("  directorio:", e)

    # 4. Pestana Crear Prompt, con la descripcion cargada
    pg.goto("http://localhost:5000", wait_until="networkidle")
    pg.wait_for_timeout(1200)
    try:
        pg.locator("button", has_text="Crear Prompt").first.click()
        pg.wait_for_timeout(900)
        pg.fill("#create-description",
                "Un agente que atiende consultas de una obra social: verifica "
                "afiliado, responde por cobertura y deriva a un humano cuando "
                "el caso es medico.")
        pg.fill("#create-requirements",
                "Tono formal, voseo, nunca inventar coberturas, siempre pedir "
                "numero de afiliado antes de responder.")
        pg.wait_for_timeout(600)
        shot(pg, "aevni-04-crear")
    except Exception as e:
        print("  crear:", e)

    b.close()
print("OK")
