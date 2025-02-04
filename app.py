import os
import pandas as pd
import plotly.express as px
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    graphs = []  # Aquí guardaremos los gráficos en HTML

    if request.method == "POST":
        file = request.files["file"]
        if file:
            # 🔄 Cargar el Excel
            df = pd.read_excel(file)

            # 🛠️ Convertir la columna de fechas si existe
            if "Fecha" in df.columns:
                df["Fecha"] = pd.to_datetime(df["Fecha"], utc=True)

            # 📊 Generar gráficos para cada despliegue
            unique_deployments = df["DEPLOYMENT"].unique()
            for deployment in unique_deployments:
                subset = df[df["DEPLOYMENT"] == deployment]

                # 🔹 Crear el gráfico interactivo con Plotly
                fig = px.line(
                    subset, 
                    x="Fecha", 
                    y="Valor", 
                    title=f"DEPLOYMENT: {deployment}",
                    markers=True,  # Agrega puntos en la línea
                    labels={"Valor": "Valor"},
                    template="plotly_white",
                    width=1250, height=400
                )

                # Si hay una segunda serie de datos, la agregamos
                if "Valor 2" in df.columns:
                    fig.add_scatter(
                        x=subset["Fecha"], 
                        y=subset["Valor 2"], 
                        mode="lines+markers",
                        name="Valor 2"
                    )
                

                # 🔥 Convertir la gráfica en HTML y guardarla en la lista
                graph_html = fig.to_html(full_html=False)
                graphs.append(graph_html)

    return render_template("index.html", graphs=graphs)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
