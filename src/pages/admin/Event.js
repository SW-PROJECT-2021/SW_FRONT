import React from "react";
import { useStyles } from "./index";

function Event() {
  const classes = useStyles();
  return <main className={classes.content}></main>;
}

export default Event;
