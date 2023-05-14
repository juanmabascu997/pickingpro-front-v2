import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import { usersRoute } from "../../utils/APIRoutes";
import axios from "axios";
import Acciones from "./Acciones";

const Usuarios = ({ backToMain }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [activeUsers, setUsers] = useState([]);
  const [reload, reloadPage] = useState(false);
  const [open, setOpen] = useState(false);

  const getUsers = async () => {
    const { data } = await axios.get(usersRoute);
    if (data) {
      let res = data.map((e, index) => {
        return {
          ...e,
          id: index,
        };
      });
      setUsers(res);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getUsers();
  }, [reload]);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
    },
    {
      field: "admin",
      headerName: "Admin",
      flex: 1,
      cellClassName:'buttons--cell',
      renderCell: (row) => {
        return (
          <>
            <Acciones data={row.row} action="admin" getUsers={getUsers}/>
          </>
        );
      },
    },
    {
      field: "userValid",
      headerName: "Validar",
      flex: 1,
      cellClassName:'buttons--cell',
      renderCell: (row) => {
        return (
          <>
            <Acciones data={row.row} action="validar" getUsers={getUsers}/>
          </>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Box>
        <Button
          onClick={backToMain}
          variant="contained"
          color="secondary"
          sx={{ m: "20px 0 0 0" }}
        >
          Back
        </Button>
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
          "& .buttons--cell": {
            alignItems: 'center',
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
        <DataGrid rows={activeUsers} columns={columns} />
      </Box>
    </Box>
  );
};

export default Usuarios;
