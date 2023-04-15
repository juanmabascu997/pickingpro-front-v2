import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { storeRoute } from "../../utils/APIRoutes";
import axios from "axios";
import ScrollDialogSettings from "./DialogSettings";
import DeleteDialog from "./DeleteDialog";

const Settings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [connectedStores, setConnectedStores] = useState([]);
  const [reload, reloadPage] = useState(false);
  const [open, setOpen] = useState(false);

  const getStores = async () => {
    const { data } = await axios.get(storeRoute);
    if (data) {
      let res = data.map((e, index) => {
        return {
          ...e,
          id: index,
        };
      });
      setConnectedStores(res);
    }
  };

  useEffect(() => {
    getStores();
  }, []);

  useEffect(() => {
    getStores();
  }, [reload]);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "access_token",
      headerName: "Access token:",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "nombre",
      headerName: "Tienda",
      flex: 1,
    },
    {
      field: "delete",
      headerName: "Eliminar conexión",
      flex: 1,
      renderCell: (row) => {
        return (
          <>
            <DeleteDialog row={row.row} reloadPage={reloadPage} reload={reload}/>
          </>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Box sx={{ display: "flex", flexDirection: 'row', justifyContent:'space-between'}}>
        <Header
          title="CONFIGURACIONES"
          subtitle="Ver conecciones. Conectar nueva tienda."
        />
        <ScrollDialogSettings setOpen={setOpen} open={open} />
      </Box>
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
        <DataGrid rows={connectedStores} columns={columns} />
      </Box>
    </Box>
  );
};

export default Settings;
