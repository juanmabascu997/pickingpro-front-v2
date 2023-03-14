import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect } from "react";
import { setProductsToPack } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import DialogPrint from "../../components/DialogPrint";
import { SetIsBeingPackagedBy } from "../../data/testData";
import { toast } from "react-toastify";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

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


  const handleClickOpen = (row) => {
    SetIsBeingPackagedBy(row.row).then(res => {
      if(res !== "El producto esta asignado a otro usuario.") {
        setRow(row)
        setOpen(true);
      } else {
        toast.error("El producto esta asignado a otro usuario.", {
          position: "bottom-right",
          closeOnClick: false,
        });
      }
    }).catch((err)=>{
      console.log(err);
    })
  };


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
    // {
    //   field: "picked_by_name",
    //   headerName: "Nombre",
    //   type: "number",
    //   headerAlign: "left",
    //   align: "left",
    // },
    {
      field: "order_picked",
      headerName: "Pickeado",
      flex: 1,
    },
    {
      field: "packed",
      headerName: "Empaquetar",
      flex: 1,
      renderCell: (row) => {
        return (
          <>
            <Button
              variant="contained"
              disabled={row.order_asigned_to || null}
              color="secondary"
              onClick={(event) => handleClickOpen(row)}
            >
              <Typography color="black" sx={{ ml: "5px" }}>
                Empaquetar
              </Typography>
            </Button>
            <Button
              variant="contained"
              disabled={row.order_asigned_to}
              color="secondary"
              onClick={(event) => handleClickOpen(row)}
            >
              <ReportProblemIcon />
            </Button>   
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
