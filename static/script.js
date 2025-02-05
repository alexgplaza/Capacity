function plotGraphs(data) {
    const container = document.getElementById("charts");
    container.innerHTML = ""; // Limpiar gráficos previos

    Object.keys(data).forEach(deployment => {
        ["tps", "tpd"].forEach(type => {
            if (data[deployment][type].length > 0) {
                const dates = data[deployment][type].map(d => new Date(d.Fecha)); 
                const values = data[deployment][type].map(d => d.Valor);
                const values2 = data[deployment][type].map(d => d.Valor2); // 📌 Nuevo valor

                const trace1 = {
                    x: dates,
                    y: values,
                    mode: "lines+markers",
                    name: `${deployment} - ${type} (Valor)`,
                    line: { color: "#FF5733", width: 2 },
                    marker: { color: "#FF5733", size: 8 }
                };

                const trace2 = {
                    x: dates,
                    y: values2,
                    mode: "lines+markers",
                    name: `${deployment} - ${type} (Valor2)`,
                    line: { color: "#3399FF", width: 2 },  // 📌 Diferente color para diferenciarlo
                    marker: { color: "#3399FF", size: 8 }
                };

                const layout = {
                    title: `${deployment} - ${type}`,
                    xaxis: { title: "Fecha", type: "date" },
                    yaxis: { title: "Valor" },
                    plot_bgcolor: "#404040",
                    paper_bgcolor: "#2c2c2c",
                    font: { color: "#FFFFFF" },
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
