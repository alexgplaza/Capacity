function plotGraphs(data) {
    const container = document.getElementById("charts");
    container.innerHTML = ""; // Limpiar gráficos previos

    Object.keys(data).forEach(deployment => {
        ["TPS", "TPD"].forEach(type => {
            if (data[deployment][type].length > 0) {
                const dates = data[deployment][type].map(d => new Date(d.Date)); 
                const values = data[deployment][type].map(d => d.Value);
                const values2 = data[deployment][type].map(d => d.Demand); // 📌 Nuevo valor

                const trace1 = {
                    x: dates,
                    y: values,
                    mode: "lines",
                    name: `${deployment} - ${type} (Value)`,
                    line: { color: "#365bb7", width: 2 },
                    marker: { color: "#365bb7", size: 8 }
                };

                const trace2 = {
                    x: dates,
                    y: values2,
                    mode: "lines",
                    name: `${deployment} - ${type} (Demand)`,
                    line: { color: "#fb0006", width: 2, dash: 'dash' },  // 📌 Diferente color para diferenciarlo
                    marker: { color: "#fb0006", size: 8 }
                };

                const layout = {
                    title: `${deployment} - ${type}`,
                    xaxis: { title: "Date", type: "date" },
                    yaxis: { title: "Value" },
                    plot_bgcolor: "#ffffff",
                    paper_bgcolor: "#ffffff",
                    font: { color: "#000000" },
                    autosize: true,
                    width: null,
                    height: 600,
                };

                const div = document.createElement("div");
                div.style.width = "100%";
                container.appendChild(div);
                Plotly.newPlot(div, [trace1, trace2], layout, { responsive: true }); // 📌 Ahora hay dos líneas
            }
        });
    });
}
