import * as React from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { DowloadData } from "../../data/testData";
import { toast } from "react-toastify";

export default function Dowload({row}) {
  
  const handleClickOpen = () => {
    DowloadData(row.nombre);
  };

  return (
    <>
      <Box>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={() => {
            handleClickOpen();
          }}
        >
            Dowload
        </Button>
      </Box>
    </>
  );
}
