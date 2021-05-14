import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import { useHistory } from "react-router";
import { ThousandSeperator } from "../../utils/ThousandSeperator";

const useStyles = makeStyles((theme) => ({
   font: { fontFamily: "NanumSquareRegular !important" },
   seeMore: {
      marginTop: theme.spacing(3),
   },
   orderRecord: {
      border: "1px solid rgba(0, 0, 0, 0.12)",
   },
   h3: {
      margin: "20px 0px",
   },
   h6: {
      margin: "10px 10px",
   },
   totalPrice: {
      float: "right",
   },
}));

const list = [
   {
      id: 0,
      productImg: "assets/images/items/1.jpg",
      productName: "Some name of item goes here nice",
      count: 3,
      productPrice: 30000,
   },
   {
      id: 1,
      productImg: "assets/images/items/2.jpg",
      productName: "Product name goes here nice",
      count: 1,
      productPrice: 10000,
   },
   {
      id: 2,
      productImg: "assets/images/items/3.jpg",
      productName: " Another name of some product goes just here",
      count: 2,
      productPrice: 20000,
   },
];

const getItem = (item, idx) => {
   return (
      <tr key={idx}>
         <td>
            <figure className="itemside">
               <div className="aside">
                  <img src={item.productImg} className="img-sm" alt="error" />
               </div>
               <figcaption className="info">
                  <a href="/" className="title text-dark">
                     {item.productName}
                  </a>
               </figcaption>
            </figure>
         </td>
         <td>{item.count}</td>
         <td>
            <div className="price-wrap">
               <var className="price">
                  {ThousandSeperator(item.count * item.productPrice)}원
               </var>
               <small className="text-muted">
                  {" "}
                  개당 {ThousandSeperator(item.productPrice)}원{" "}
               </small>
            </div>
         </td>
      </tr>
   );
};

function OrderRecord({ orderRecordList, setOrderRecordList }) {
   const classes = useStyles();
   const [activeStep, setActiveStep] = useState(3);
   const steps = ["결제완료", "배송중", "배송완료", "구매확정"];

   const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
   };

   const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
   };

   const confirmOrder = () => {
      const ok = window.confirm("구매 확정 하시겠습니까?");
      if (ok) {
         setActiveStep((prev) => prev + 1);
      }
   };

   const singleOrderRecord = (list) => {
      let totalPrice = 0;
      return (
         <>
            <div className={classes.orderRecord}>
               <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                     <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                     </Step>
                  ))}
               </Stepper>
               <Typography variant="h6" className={classes.h6}>
                  2021.05.12 주문
               </Typography>
               <Typography variant="h6" className={classes.h6}>
                  배송지 :
               </Typography>
               <table className="table table-borderless table-shopping-cart">
                  <thead className="text-muted">
                     <tr className="small text-uppercase">
                        <th scope="col">상품</th>
                        <th scope="col" width="120">
                           수량
                        </th>
                        <th scope="col" width="120">
                           가격
                        </th>
                        <th scope="col" className="text-right" width="200">
                           {" "}
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {list.map((item, idx) => {
                        totalPrice += item.count * item.productPrice;
                        return getItem(item, idx);
                     })}
                  </tbody>
               </table>
               <div className="card-body border-top">
                  <button
                     className="btn btn-primary"
                     onClick={
                        activeStep === 3
                           ? confirmOrder
                           : () => console.log("not implemented")
                     }
                  >
                     {activeStep !== 4 ? (
                        activeStep !== 3 ? (
                           <>문의하기</>
                        ) : (
                           <>구매확정</>
                        )
                     ) : (
                        <>상품평</>
                     )}
                  </button>
                  <div className={`${classes.totalPrice} col-3`}>
                     Total : {ThousandSeperator(totalPrice)} 원
                  </div>
               </div>
            </div>
         </>
      );
   };

   return (
      <>
         <div className={classes.font}>
            <Typography variant="h3" className={classes.h3}>
               주문내역
            </Typography>
            {singleOrderRecord(list)}
         </div>
      </>
   );
}
export default OrderRecord;
