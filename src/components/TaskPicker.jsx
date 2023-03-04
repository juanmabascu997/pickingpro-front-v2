import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FormScreen from "../scenes/picking/FormScreen";
import PickingScreen from "../scenes/picking/PickingScreen";

const TaskPicker = () => {
  const [isPicking, setPickingScreen] = useState(false);

  const dispatch = useDispatch();
  
  // const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <div>
      {
        isPicking ? 
        <PickingScreen /> :
        <FormScreen setPickingScreen={setPickingScreen}/>
      }
    </div>
  );
};

export default TaskPicker;
