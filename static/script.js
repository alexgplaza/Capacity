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
                    xaxis: { title: "Fecha", type: "date" },
                    yaxis: { title: "Valor" }
                };

                const div = document.createElement("div");
                container.appendChild(div);
                Plotly.newPlot(div, [trace], layout);
            }
        });
    });
}
