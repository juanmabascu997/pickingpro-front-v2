import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataPicked } from "../../data/mockData";
import Header from "../../components/Header";
import { useEffect } from "react";
import { setProductsToPack } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";

const Packing = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const packingProducts = useSelector(state => state.packingProducts)

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
      field: "name",
      headerName: "Pickeado por",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "payment_status",
      headerName: "Estado de pago",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "order_picked",
      headerName: "Pickeado",
      flex: 1,
    },
    {
      field: "packed",
      headerName: "Empaquetar",
      flex: 1,
      renderCell: ({ row: { packed } }) => {
        return (
          <Button
            variant="contained"
            disabled={packed}
            color="secondary"
          >
            <Typography color="black" sx={{ ml: "5px" }}>
              Empaquetar
            </Typography>
          </Button>
        );
      },
    },
  ];

  return (
    <Box m="20px">
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

{/* <DataGrid rows={mockDataPicked} columns={columns} /> */}

        <DataGrid rows={packingProducts} columns={columns}/>
      </Box>
    </Box>
  );
};

export default Packing;
