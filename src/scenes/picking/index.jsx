import { Box } from "@mui/material";

import Header from "../../components/Header";
import TaskPicker from "../../components/TaskPicker";

const Picking = () => {
  return (
    <Box m="20px">
      <Header title="PICKEAR" subtitle="Seleccioná qué te gustaría pickear" />
      <Box sx={{ boxShadow: 3, p: 3 }}>
        <TaskPicker />
      </Box>
    </Box>
  );
};

export default Picking;
