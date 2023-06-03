import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { SetPickedProducts } from "../data/testData";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Avatar, Box, Chip, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { useState } from "react";

export default function DialogPicking({
  setPickingScreen,
  pickingProducts,
  setOpen,
  open,
}) {
  let user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 500,
    },
  });

  const handleClose = async () => {
    setOpen(false);
  };

  const pickedHandler = async () => {
    setLoading(true)
    const data = await SetPickedProducts(pickingProducts, user.token);
    if (data) {
      toast.success("Productos pickeados con exito", {
        position: "bottom-right",
        closeOnClick: false,
      });
      setPickingScreen(false);
    }
    setLoading(false)
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmar"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box>
              <Typography sx={{ mb: 1 }}>
                Si solicita continuar, van a darse por pickeados los siguientes
                articulos:
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <i>Productos que incluye la compra:</i>
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 1, pb: 1 }}>
                {pickingProducts ? (
                  pickingProducts.map((info, index) => {
                    return (<>
                      <Stack direction="row" spacing={1} key={index}>
                        <CustomWidthTooltip
                          title={
                            info.name +
                            ", SKU: " +
                            info.sku +
                            ", Cantidad: " +
                            info.quantity +
                            ", Variante: " +
                            info.variant_id
                          }
                        >
                          <Chip
                            avatar={
                              <Avatar alt={info.name} src={info.image_link} />
                            }
                            label={info.name}
                            variant="outlined"
                          />
                        </CustomWidthTooltip>
                      </Stack>
                    </>
                    );
                  })
                ) : (
                  <></>
                )}
              </Box>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={pickedHandler} disabled={loading} autoFocus>{loading ? 'Cargando...' : 'Continuar'}</Button>
          <Button onClick={handleClose} disabled={loading} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
