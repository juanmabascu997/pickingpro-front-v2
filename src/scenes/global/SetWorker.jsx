import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { setProductsToPack, getOrdersProblem } from '../../redux/actions/actions';
import { useDispatch } from "react-redux";

export default function SetWorker() {
  const timeout = 15000;
  const [finish, setFinish] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Worker on");
    setWorker();
    return () => setFinish({finish: true});
  }, []);

  async function setWorker() {
    setTimeout(() => {
      setProductsToPack().then((resp) => {
        dispatch(resp);
      })
      getOrdersProblem().then((resp) => {
        dispatch(resp);
      })
      if(finish) return
      setWorker();
    }, timeout);
  }
  return <></>;
}
