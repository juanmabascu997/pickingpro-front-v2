import { tokens } from "../theme";

export default function formatearData(data) {
    let empaquetados = data[0].data;
    let pickeados = data[1].data;
    
  return [
    {
      id: "Pickeados",
      color: tokens("dark").greenAccent[500],
      data: pickeados
    },
    {
      id: "Empaquetados",
      color: tokens("dark").blueAccent[300],
      data: empaquetados
    },
  ];
}
