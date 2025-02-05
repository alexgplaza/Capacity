from flask import Flask, request, jsonify, render_template
import pandas as pd

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        file = request.files["file"]
        if file:
            df = pd.read_excel(file)
            df["Fecha"] = pd.to_datetime(df["Fecha"], utc=True, errors="coerce")
            df["Valor"] = pd.to_numeric(df["Valor"], errors="coerce")
            df["Valor2"] = pd.to_numeric(df["Valor2"], errors="coerce")  # 📌 Convertir Valor2 a numérico


            # 📌 Convertir fechas a string ISO para evitar problemas con timestamps
            data = {}
            for DEPLOYMENT, datos in df.groupby("DEPLOYMENT"):
                data[DEPLOYMENT] = {
                    "tps": datos[datos["tps_tpd"] == "tps"][["Fecha", "Valor", "Valor2"]].dropna().to_dict(orient="records"),
                    "tpd": datos[datos["tps_tpd"] == "tpd"][["Fecha", "Valor", "Valor2"]].dropna().to_dict(orient="records"),
                }

            for DEPLOYMENT in data:
                for tipo in ["tps", "tpd"]:
                    for i in range(len(data[DEPLOYMENT][tipo])):
                        data[DEPLOYMENT][tipo][i]["Fecha"] = data[DEPLOYMENT][tipo][i]["Fecha"].isoformat()

            print(data)  # 📌 Verifica que las Fechas son cadenas
            return jsonify(data)

    # 📌 Manejar GET para renderizar la página con el formulario
    return render_template("index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
