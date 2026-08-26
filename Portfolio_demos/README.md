# Portfolio_demos — previews y demos de los 3 proyectos

Todo el contenido generado para el portfolio, para referenciarlo desde donde
sea que termine viviendo el sitio. Las capturas salieron de las apps corriendo
de verdad, no son mockups.

**Ninguna imagen muestra datos reales.** Epifron corre contra una base sembrada
aparte y Career Tracker contra un legajo inventado; la base de finanzas real y
el legajo real nunca se tocaron.

---

## El contenido — `media/`

18 archivos, 9,6 MB. Los `.webp` estan a 1800px de ancho.

### Epifron — finanzas por chat

| Archivo | Qué muestra |
|---|---|
| `epifron-chat.webm` · 3,7 MB | **Demo en video.** Se le dicta «gasté 48500 en el super con la visa» al chat, la IA lo clasifica en Supermercado y lo registra; después se le pregunta cuánto lleva gastado; cierra en Movimientos con ese mismo gasto ya en la tabla. Corrida real contra Groq/Llama 3.3. |
| `epifron-chat-poster.webp` | Poster del video (frame del chat con la respuesta puesta). |
| `epifron-chat.gif` · 2,6 MB | El mismo video como GIF 640x400, para LinkedIn o un README. |
| `epifron-dash.webp` | Dashboard de agosto 2026: KPIs, gráfico de 12 meses, próximos pagos. |
| `epifron-cuotas.webp` | Compras en cuotas: deuda total y calendario de las próximas. |
| `epifron-proy.webp` | Proyecciones 2026: real vs proyectado, tabla por mes. |
| `epifron-inv.webp` | Inversiones: CEDEARs, cripto y dólares. |
| `epifron-chat.webp` | Conversación de Telegram (mockup previo, no es captura de la app). |
| `epifron-arch.webp` | Diagrama de arquitectura (mockup previo). |

### Career Tracker — plan de estudios como grafo

| Archivo | Qué muestra |
|---|---|
| `career-tour.webm` · 2,2 MB | **Demo en video.** Recorrido por las cinco vistas, arrancando por el grafo de correlativas. |
| `career-tour-poster.webp` | Poster del video (el grafo). |
| `career.webp` | El grafo: cada nodo una materia, cada arista una traba. |
| `career-avance.webp` | Avance con proyección de cuatrimestres y distribución de notas. |
| `career-cronograma.webp` | Armado automático de horario con detección de superposiciones. |
| `career-planificador.webp` | Materias ordenadas por cuántas destraban. |

Legajo inventado: 52% de avance, promedio 7,69, 32/62 aprobadas.

### AEVNI — optimizador de prompts

| Archivo | Qué muestra |
|---|---|
| `aevni.webp` | Los nueve proveedores, el selector de modo y un prompt verbose cargado. |
| `aevni-crear.webp` | Pestaña Crear Prompt con descripción, requisitos, tono y audiencia. |
| `aevni-directorio.webp` | Directorio de modelos: un campeón por caso de uso. |

**Falta el video de AEVNI.** Ver más abajo.

---

## Los scripts que generaron todo esto

Se pueden volver a correr si cambia una pantalla. Necesitan `playwright`
(`pip install playwright && playwright install chromium`) y Pillow, y que estén
levantados los servidores de `.claude/launch.json` (`aevni` :5000,
`epifron` :5001, `career` :4830).

```bash
python Portfolio_demos/epifron_demo_seed.py          # siembra la base demo y sirve
python Portfolio_demos/epifron_capturas.py   <salida>
python Portfolio_demos/epifron_demo_chat.py  <salida>   # VIDEO del chat
python Portfolio_demos/career_demo_build.py             # regenera el legajo ficticio
python Portfolio_demos/career_capturas.py    <salida>   # 5 vistas + VIDEO
python Portfolio_demos/aevni_run_preview.py             # levanta AEVNI con la key del entorno
python Portfolio_demos/aevni_capturas.py     <salida>
python Portfolio_demos/aevni_demo_optimizar.py <salida> # VIDEO — ver cuota abajo
```

Archivos de apoyo que quedan acá: `epifron_demo.db` (base sembrada, borrable) y
`career-demo/index.html` (copia del tracker con el legajo inventado).

---

## Lo que falta y por qué

**El video de AEVNI.** La app siempre llama a un proveedor. El default
(Pollinations, "gratis · sin key") devuelve **HTTP 402** en todos sus modelos y
la UI no muestra ningún error: el request cierra con 200 y no pasa nada.

El camino que funciona es Gemini con la key en el entorno del servidor
(`setx GEMINI_API_KEY ...`; `aevni_run_preview.py` la recupera del registro
aunque la terminal sea vieja). Eso ya quedó andando y verificado: **86 tokens
ahorrados, −40,4%**, justo el número que AEVNI promete en su hero.

Lo que bloquea es la **cuota**: el free tier de Gemini son **20 requests por
día** por modelo, y se agotó probando prompts. Se renueva a medianoche del
Pacífico (≈04:00 en Buenos Aires). Después de eso alcanza con:

```bash
python Portfolio_demos/aevni_demo_optimizar.py salida
```

El prompt ya está elegido y verificado dentro del script (caso ficticio de
atención al cliente). **No conviene probar variantes antes de grabar**: 20
requests se van rápido, y un prompt ya denso puede dar ahorro negativo — el
ejemplo del script de CSV daba −1 token, que como demo de un optimizador de
tokens es peor que nada.

---

## Cómo referenciarlo desde el portfolio

Las entradas viven en `data.js`, en el array `shots` de cada proyecto. Una
entrada con `src` es una captura; una con `video` + `poster` es una demo
grabada:

```js
{ video: 'media/epifron-chat.webm', poster: 'media/epifron-chat-poster.webp',
  alt: { es: '…', en: '…' }, cap: { es: '…', en: '…' } }
```

El `<video>` se renderiza muteado, en loop y con autoplay — es una captura que
se mueve, no un clip que el visitante tenga que decidir mirar. Ese render está
en `index.html`, en la función `fillCase`.

Ojo al mover el sitio: la media tiene que quedar **dentro** de la carpeta que se
deploya. Hoy la copia viva es `portfolio-design/v2/media/`; esta de acá es el
respaldo para referenciar.
