import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { labelRoute } from "../../utils/APIRoutes";
import { generateLabelInfo, printLabel } from "../../utils/LabelGenerator";
import ReceiptIcon from "@mui/icons-material/Receipt";

export default function Step2({ carrito, handleNext, handleBack }) {
  const [loading, setLoading] = useState(false);
  const [labelPrinted, setLabelPrinted] = useState(false);
  const [taskData, setTaskData] = useState();
  const [printMethod, setPrintMethod] = useState("pdf");
  const [labelInfo, setLabelInfo] = useState();
  const componentRef = useRef(null);

  useEffect(()=>{
    initialConfig()
  },[])

  function initialConfig() {
    //Seteo datos de la tarea
    setTaskData(
        {
            envio: carrito.shipping_option.includes('Bluemail') ? 'bluemail' : 'same-day'
        }
    );
  }

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: "@page { size: 3.93in 5.9in }",
  });

  const onClickLabelButton = async () => {
    try {
      //Seteamos a loading
      setLoading(true);

      //Si es bluemail.. no importa el tipo de impresion
      if (taskData.envio == "bluemail") {
        //Preparo el request a mi API para obtener la etiqueta
        const myRequest = {
          store_id: carrito.store_id,
          id: carrito.id,
        };

        //Obtengo la etiqueta con un método GET
        const { data } = await axios.get(labelRoute, {
          params: myRequest,
          responseType: "blob",
        });

        //Genero la etiqueta
        const file = new Blob([data], { type: "application/pdf" });

        //Creo un enlace con la etiqueta
        const fileURL = URL.createObjectURL(file);

        //Abro una nueva ventana con la etiqueta
        window.open(fileURL);
        setLabelPrinted(true);
      }

      //Si el metodo de impresion es PDF
      if (taskData.envio != "bluemail" && printMethod == "pdf") {
        const myLabelInfo = await generateLabelInfo(carrito, taskData.envio);
        setLabelInfo(myLabelInfo);
        await timeout(100);
        handlePrint();
        setLabelPrinted(true);
      }

      //Si el metodo de impresion es zebra y es envio en el dia
      if (taskData.envio == "same-day" && printMethod == "zebra") {
        await printLabel(carrito, "same-day");
        setLabelPrinted(true);
      }

      //Si el metodo de impresion es zebra y es cash on delivery
      if (taskData.envio == "cod" && printMethod == "zebra") {
        await printLabel(carrito, "cod");
        setLabelPrinted(true);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        key="2"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "none",
          }}
        >
          <Typography variant="h4" sx={{ mt: 2 }}>
            <strong>Paso 2</strong>
          </Typography>
          {
            !labelPrinted?
            <>
                <Typography sx={{ mb: 1 }} >
                    Su etiqueta aun no fue impresa.
                    Podes realizar la impresión correspondiente haciendo click acá 👇.
                </Typography>
                <Box sx={{ pt: 3 }}>
                    <Button
                    fullWidth={true}
                    variant="contained"
                    endIcon={<ReceiptIcon />}
                    color="success"
                    size="large"
                    disabled={loading}
                    onClick={onClickLabelButton}
                    >
                    Imprimir
                    </Button>
                </Box>
            </>
            :
            <>
                <Typography sx={{ mb: 1 }} >
                    Su etiqueta ya fue impresa.
                    Ya podes continuar con la gestión.
                </Typography>

                <Box sx={{ pt: 3 }}>
                    <Button
                    fullWidth={true}
                    variant="contained"
                    endIcon={<ReceiptIcon />}
                    color="success"
                    size="large"
                    disabled={loading}
                    onClick={onClickLabelButton}
                    >
                    Volver a Imprimir
                    </Button>
                </Box>
            </>
          }
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }} disabled={loading}>
            Atras
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button onClick={handleNext} disabled={!labelPrinted}>Siguiente</Button>
        </Box>
      </Box>
      {!labelInfo ? (
        <></>
      ) : (
        <div style={{ display: "none" }}>
          <div ref={componentRef}>
            <div className="label">
              <div className="rotate">
                <h2 style={{ textAlign: "center" }}>{labelInfo.store_name}</h2>
                <table className="mylabel">
                  <tbody>
                    <tr className="mylabeltr">
                      <td className="mylabeltd" colSpan={2}>
                        {" "}
                        Fecha: {labelInfo.created_at}
                      </td>
                    </tr>
                    <tr className="mylabeltr">
                      <td className="mylabeltd" colSpan={2}>
                        {" "}
                        Remitente: {labelInfo.store_name}
                      </td>
                    </tr>
                    <tr className="mylabeltr">
                      <td className="mylabeltd" colSpan={2}>
                        {" "}
                        Destinatario: {labelInfo.name}
                      </td>
                    </tr>
                    <tr className="mylabeltr">
                      <td className="mylabeltd" colSpan={2}>
                        {" "}
                        Domicilio: {labelInfo.address}
                      </td>
                    </tr>
                    <tr className="mylabeltr">
                      <td className="mylabeltd"> CP: {labelInfo.zipcode}</td>
                      <td className="mylabeltd">
                        {" "}
                        Localidad: {labelInfo.city}
                      </td>
                    </tr>
                    <tr className="mylabeltr">
                      <td className="mylabeltd" colSpan={2}>
                        {" "}
                        Referencia: {labelInfo.reference}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
