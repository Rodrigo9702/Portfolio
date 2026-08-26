"""Levanta Epifron contra una base de DEMO, sembrada con datos inventados.

Existe para poder sacar capturas reales de la app sin publicar las finanzas
reales del usuario: la base de produccion (epifron.db / Postgres) nunca se toca.

    python Portfolio_demos/epifron_demo_seed.py          # siembra y sirve en :5001
    python Portfolio_demos/epifron_demo_seed.py --seed   # solo siembra y sale

La base queda en Portfolio_demos/epifron_demo.db y se puede borrar sin consecuencias.
"""
from __future__ import annotations

import os
import sys
from datetime import date, datetime, timedelta
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent / "finanzas_app"
DEMO_DB = Path(__file__).resolve().parent / "epifron_demo.db"

# El entorno se arma ANTES de importar la app: config.py lee os.getenv al
# importarse, asi que despues ya es tarde.
os.environ["DATABASE_URL"] = f"sqlite:///{DEMO_DB.as_posix()}"
os.environ["ENABLE_APSCHEDULER"] = "false"   # sin jobs ni Telegram en la demo
os.environ.pop("TELEGRAM_BOT_TOKEN", None)
os.environ.setdefault("SECRET_KEY", "epifron-demo")

sys.path.insert(0, str(RAIZ))
os.chdir(RAIZ)

from app import create_app                      # noqa: E402
from models import (db, User, Ingreso, Gasto, Compra, CuotaPago,   # noqa: E402
                    Suscripcion, Inversion, Presupuesto, Recordatorio)

HOY = date(2026, 8, 25)
USUARIO, CLAVE = "demo", "epifron-demo"


def _mes_atras(n: int) -> tuple[int, int]:
    total = HOY.year * 12 + (HOY.month - 1) - n
    return total // 12, total % 12 + 1


# Doce meses de ingresos: sueldo con un par de aumentos y algun freelance.
SUELDO = [1_650_000] * 4 + [1_980_000] * 4 + [2_380_000] * 4
EXTRAS = {2: ("Freelance — landing", 320_000), 6: ("Aguinaldo", 990_000),
          9: ("Freelance — bot WhatsApp", 450_000)}

# Reparto mensual de gastos por categoria, en proporcion del sueldo.
CATS = [
    ("Alquiler",        0.315, "Alquiler + expensas"),
    ("Supermercado",    0.150, "Compras del mes"),
    ("Transporte",      0.045, "SUBE y nafta"),
    ("Servicios",       0.062, "Luz, gas, internet"),
    ("Salud",           0.048, "Prepaga"),
    ("Comidas afuera",  0.055, "Bares y delivery"),
    ("Entretenimiento", 0.021, "Suscripciones"),
    ("Varios",          0.038, "Sin categoria clara"),
]

SUSCRIPCIONES = [
    ("Netflix",          9_490,  "ARS", "Visa ...4417",       12, "Entretenimiento", "streaming", "netflix"),
    ("Spotify Duo",      7_299,  "ARS", "Visa ...4417",        3, "Entretenimiento", "streaming", "spotify"),
    ("GitHub Copilot",      10,  "USD", "Visa ...4417",       18, "Trabajo",         "fijo",      ""),
    ("Gimnasio",        28_000,  "ARS", "Debito ...0092",      5, "Salud",           "fijo",      ""),
    ("Claude Pro",          20,  "USD", "Visa ...4417",        7, "Trabajo",         "fijo",      ""),
]

COMPRAS = [
    # nombre, tarjeta, total, cuotas, meses_atras_del_inicio
    ("Notebook Lenovo IdeaPad", "Visa ...4417",    1_450_000, 12, 0),
    ("Heladera Whirlpool",      "Naranja ...2233",   890_000, 18, 5),
    ("Pasaje a Bariloche",      "Visa ...4417",      620_000,  6, 3),
    ("Monitor 27\" LG",         "Visa ...4417",      340_000,  9, 8),
]

INVERSIONES = [
    ("cedear",  "AAPL", "Apple Inc.",        "USD",  18,  22_400,  26_950),
    ("cedear",  "SPY",  "S&P 500 ETF",       "USD",  25,  31_800,  35_100),
    ("cripto",  "BTC",  "Bitcoin",           "USD", 0.042, 61_000, 88_400),
    ("cripto",  "ETH",  "Ethereum",          "USD", 0.75,   2_450,  3_120),
    ("dolar",   "USD",  "Dolares en efectivo","USD", 1_200, 1_040,   1_385),
]

PRESUPUESTOS = [("Supermercado", 380_000), ("Comidas afuera", 140_000),
                ("Varios", 100_000), ("Transporte", 120_000)]


def sembrar(app):
    with app.app_context():
        db.drop_all()
        db.create_all()

        u = User(username=USUARIO, display_name="Demo", activo=True)
        u.set_password(CLAVE)
        db.session.add(u)
        db.session.flush()
        uid = u.id

        for n in range(12):
            anio, mes = _mes_atras(11 - n)
            sueldo = SUELDO[n]
            db.session.add(Ingreso(user_id=uid, anio=anio, mes=mes,
                                   monto=sueldo, concepto="Sueldo"))
            if n in EXTRAS:
                cpt, monto = EXTRAS[n]
                db.session.add(Ingreso(user_id=uid, anio=anio, mes=mes,
                                       monto=monto, concepto=cpt))

            # El mes en curso va a mitad de camino: es dia 25 de 31.
            escala = 0.77 if n == 11 else 1.0
            for i, (cat, prop, concepto) in enumerate(CATS):
                # variacion determinista, para que el grafico no sea una recta
                jitter = 1 + ((n * 7 + i * 13) % 11 - 5) / 100
                monto = round(sueldo * prop * jitter * escala, -2)
                db.session.add(Gasto(user_id=uid, anio=anio, mes=mes,
                                     categoria=cat, concepto=concepto,
                                     monto=monto, tarjeta="Visa ...4417"))

        for nombre, monto, moneda, tarjeta, dia, cat, tipo, slug in SUSCRIPCIONES:
            db.session.add(Suscripcion(user_id=uid, nombre=nombre, monto=monto,
                                       moneda=moneda, tarjeta=tarjeta,
                                       dia_cobro=dia, categoria=cat, tipo=tipo,
                                       slug_impuestito=slug, activa=True))

        for nombre, tarjeta, total, cuotas, atras in COMPRAS:
            anio, mes = _mes_atras(atras)
            c = Compra(user_id=uid, nombre=nombre, tarjeta=tarjeta,
                       monto_total=total, cuotas=cuotas,
                       monto_cuota=round(total / cuotas, 2),
                       mes_inicio=mes, anio_inicio=anio,
                       fecha_compra=date(anio, mes, 12))
            db.session.add(c)
            db.session.flush()
            for k in range(1, cuotas + 1):
                m, a = c.mes_de_cuota(k)
                vencida = (a, m) < (HOY.year, HOY.month)
                db.session.add(CuotaPago(
                    compra_id=c.id, numero=k, mes=m, anio=a, pagado=vencida,
                    fecha_pago=datetime(a, m, 12) if vencida else None))

        for tipo, ticker, nombre, moneda, cant, pc, pa in INVERSIONES:
            db.session.add(Inversion(user_id=uid, tipo=tipo, ticker=ticker,
                                     nombre=nombre, moneda=moneda,
                                     cantidad=cant, precio_compra=pc,
                                     precio_actual=pa,
                                     fecha_compra=HOY - timedelta(days=210)))

        for cat, monto in PRESUPUESTOS:
            db.session.add(Presupuesto(user_id=uid, categoria=cat, monto=monto))

        for desc, dias in [("Vence el seguro del auto", 6),
                           ("Renovar dominio epifron.app", 19)]:
            db.session.add(Recordatorio(user_id=uid, titulo=desc,
                                        descripcion="",
                                        fecha_vence=HOY + timedelta(days=dias)))

        db.session.commit()
        print(f"[demo] base sembrada en {DEMO_DB}")
        print(f"[demo] usuario: {USUARIO} / {CLAVE}")


if __name__ == "__main__":
    application = create_app()
    sembrar(application)
    if "--seed" not in sys.argv:
        port = int(os.getenv("PORT", "5001"))
        print(f"[demo] sirviendo en http://127.0.0.1:{port}")
        application.run(host="127.0.0.1", port=port, debug=False,
                        use_reloader=False)
