import {
   Divider,
   makeStyles,
   Step,
   StepLabel,
   Stepper,
   Typography,
} from "@material-ui/core";
import React from "react";
import { ThousandSeperator } from "../../utils/ThousandSeperator";
const useStyles = makeStyles((theme) => ({
   orderRecord: {
      width: "100%",
   },
   h6: {
      margin: "10px 10px",
      fontFamily: "NanumSquareRegular",
   },
   totalPrice: {
      float: "right",
      lineHeight: "37px",
   },
   totalPriceDiscount: {
      float: "right",
      lineHeight: "20px",
   },
}));
const getItem = (item, idx) => {
   return (
      <tr key={idx}>
         <td>
            <figure className="itemside">
               <div className="aside">
                  <img src={item.img1} className="img-sm" alt="error" />
               </div>
               <figcaption className="info">
                  <span className="title text-dark">{item.name}</span>
               </figcaption>
            </figure>
         </td>
         <td>{item.count}</td>
         <td>
            <div className="price-wrap">
               <var className="price">
                  {ThousandSeperator(item.count * item.price)}원
               </var>
               <small className="text-muted">
                  {" "}
                  개당 {ThousandSeperator(item.price)}원{" "}
               </small>
            </div>
         </td>
      </tr>
   );
};

function SingleOrderRecord({ item }) {
   const classes = useStyles();
   const steps = ["결제완료", "배송중", "배송완료", "구매확정"];
   return (
      <div className={classes.orderRecord}>
         <Divider />
         <Stepper nonLinear alternativeLabel>
            {steps.map((label, idx) => (
               <Step
                  key={label}
                  active={item.orderStatus >= idx + 1 ? true : false}
                  completed={item.orderStatus >= idx + 1 ? true : false}>
                  <StepLabel>{label}</StepLabel>
               </Step>
            ))}
         </Stepper>
         <Typography variant="h6" className={classes.h6}>
            {item.orderDate && item.orderDate.slice(0, 10)}
         </Typography>
         <Typography variant="h6" className={classes.h6}>
            배송지 이름 : {item.orderDestination}
         </Typography>
         <table className="table table-borderless table-shopping-cart">
            <thead className="text-muted">
               <tr className="small text-uppercase">
                  <th scope="col">상품</th>
                  <th scope="col" width="200">
                     수량
                  </th>
                  <th scope="col" width="200">
                     가격
                  </th>
               </tr>
            </thead>
            <tbody>{item.Ordered.map((item, idx) => getItem(item, idx))}</tbody>
         </table>
         <div className="card-body border-top">
            <div
               className={`${
                  item.discountCost
                     ? classes.totalPriceDiscount
                     : classes.totalPrice
               } col-3`}>
               {item.discountCost ? (
                  <>
                     할인 : {ThousandSeperator(item.discountCost)}원
                     <br />
                  </>
               ) : (
                  <></>
               )}
               Total : {ThousandSeperator(item.totalCost - item.discountCost)}{" "}
               원
            </div>
         </div>
      </div>
   );
}
export default SingleOrderRecord;
