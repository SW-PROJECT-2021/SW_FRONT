import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import { DateChange } from "../../utils/DateChange";
const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits({ data, startDate, endDate }) {
  const classes = useStyles();

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  if (!data) return null;
  return (
    <React.Fragment>
      <Title>판매 금액 통계</Title>
      <Typography component="p" variant="h4">
        {numberWithCommas(data.totalCost)} 원
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        <p>{DateChange(startDate)} </p> ~{DateChange(endDate)}
      </Typography>
    </React.Fragment>
  );
}
