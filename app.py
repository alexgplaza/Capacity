from flask import Flask, request, jsonify, render_template
import pandas as pd

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        file = request.files["file"]
        if file:
            df = pd.read_excel(file)
            df["Date"] = pd.to_datetime(df["Date"], utc=True, errors="coerce")
            df["Value"] = pd.to_numeric(df["Value"], errors="coerce")
            df["Demand"] = pd.to_numeric(df["Demand"], errors="coerce")  # 📌 Convertir Valor2 a numérico


            # 📌 Convertir fechas a string ISO para evitar problemas con timestamps
            data = {}
            for DEPLOYMENT, datos in df.groupby("DEPLOYMENT"):
                data[DEPLOYMENT] = {
                    "TPS": datos[datos["tps_tpd"] == "tps"][["Date", "Value", "Demand"]].dropna().to_dict(orient="records"),
                    "TPD": datos[datos["tps_tpd"] == "tpd"][["Date", "Value", "Demand"]].dropna().to_dict(orient="records"),
                }

            for DEPLOYMENT in data:
                for tipo in ["TPS", "TPD"]:
                    for i in range(len(data[DEPLOYMENT][tipo])):
                        data[DEPLOYMENT][tipo][i]["Date"] = data[DEPLOYMENT][tipo][i]["Date"].isoformat()

            print(data)  # 📌 Verifica que las Fechas son cadenas
            return jsonify(data)

    # 📌 Manejar GET para renderizar la página con el formulario
    return render_template("index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
