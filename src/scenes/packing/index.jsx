import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataPicked } from "../../data/mockData";
import Header from "../../components/Header";
import { GetPackingProducts } from "../../data/testData";
import { useEffect } from "react";

const Packing = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "picked_by_name",
      headerName: "Pickeado por",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "quantity_products",
      headerName: "Cant. Productos",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "quantity_orders",
      headerName: "Cant. Pedidos",
      flex: 1,
    },
    {
      field: "location",
      headerName: "Ubicación",
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

  useEffect(()=>{
    let data = GetPackingProducts()
  })

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
        <DataGrid rows={mockDataPicked} columns={columns} />
      </Box>
    </Box>
  );
};

export default Packing;
