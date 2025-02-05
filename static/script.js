function plotGraphs(data) {
    const container = document.getElementById("charts");
    container.innerHTML = "";  // Limpiar gráficos previos

    Object.keys(data).forEach(deployment => {
        ["tps", "tpd"].forEach(type => {
            if (data[deployment][type].length > 0) {
                const dates = data[deployment][type].map(d => new Date(d.Fecha));  // 📌 Convertir a Date
                const values = data[deployment][type].map(d => d.Valor);

                const trace = {
                    x: dates,
                    y: values,
                    mode: "lines+markers",
                    name: `${deployment} - ${type}`
                };

                const layout = {
                    title: `${deployment} - ${type}`,
                    xaxis: { title: "Date", type: "date" },
                    yaxis: { title: "Value" },
                    plot_bgcolor: "#FAFAFA",  // 📌 Fondo de la gráfica (oscuro)
                    paper_bgcolor: "#F2F2F2",
                    autosize: true,  // 📌 Permite que la gráfica se ajuste automáticamente
                    width: null, // 📌 Deja que Plotly maneje el ancho
                    height: 600, // 📌 Ajusta la altura (puedes cambiarlo)
                };

                const div = document.createElement("div");
                div.style.width = "100%"; // 📌 Hace que el div ocupe todo el ancho disponible
                container.appendChild(div);
                Plotly.newPlot(div, [trace], layout, { responsive: true }); // 📌 Activa la adaptabilidad
            }
        });
    });
}
