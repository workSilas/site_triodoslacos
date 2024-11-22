import { Chart } from "react-google-charts";

export default function GraficoVendas() {
  const data = [
    ["Mês", "Vendas"],
    ["Janeiro", 33],
    ["Fevereiro", 45],
    ["Março", 28],
    ["Abril", 100],
  ];

  const options = {
    title: "Vendas de Laços por Mês",
    hAxis: { title: "Vendas" },
    vAxis: { title: "Mês" },
    colors: ["#FFC0CB"],
  };

  return (
    <Chart
      chartType="BarChart"
      data={data}
      options={options}
      width="100%"
      height="400px"
    />
  );
}
