import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

export default function Chips({ info, index }) {
  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 500,
    },
  });
  return (
    <Stack direction="row" spacing={1} key={index + info.sku}>
      <CustomWidthTooltip title={info.name + ", SKU: " + info.sku + ', Variante: ' + info.variant_values[0]}>
        <Chip
          avatar={<Avatar alt={info.name} src={info.image.src} />}
          label={info.name + ' | x' + info.quantity}
          color="primary"
          variant="outlined"
        />
      </CustomWidthTooltip>
    </Stack>
  );
}
