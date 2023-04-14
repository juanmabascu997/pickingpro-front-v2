import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { setProductsToPack } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import DialogPrint from "../../components/DialogPrint";
import ScrollDialog from "./DialogPrintV2";
import ScrollDialogProblem from "./DialogProblem";

const Packing = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const packingProducts = useSelector(state => state.packingProducts)
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState({});

  useEffect(()=>{ 
    setProductsToPack().then((resp) => {
      dispatch(resp);
    })
  },[])

  const columns = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "order_asigned_to_name",
      headerName: "Asignado a:",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "shipping_option",
      headerName: "Envio:",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "store_name",
      headerName: "Tienda:",
      flex: 1,
    },
    {
      field: "packed",
      headerName: "Empaquetar",
      flex: 1,
      renderCell: (row) => {
        return (
          <>
            <ScrollDialog row={row} />
            <ScrollDialogProblem row={row} />
          </>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <DialogPrint row={row} setOpen={setOpen} open={open} />
      <Header
        title="EMPAQUETAR"
        subtitle="Elija uno de los pickeos a empaquetar"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={packingProducts} columns={columns}/>
      </Box>
    </Box>
  );
};

export default Packing;
