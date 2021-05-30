import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { useHistory } from "react-router";
import PaymentApproved from "./PaymentApproved";
import axios from "axios";
import { ThousandSeperator } from "../../utils/ThousandSeperator";
import { CategoryMappingById } from "../../utils/CategoryMapping";

function Copyright() {
   return (
      <Typography variant="body2" color="textSecondary" align="center">
         {"Copyright © "}
         <Link color="inherit" href="https://material-ui.com/">
            Your Website
         </Link>{" "}
         {new Date().getFullYear()}
         {"."}
      </Typography>
   );
}

const useStyles = makeStyles((theme) => ({
   appBar: {
      position: "relative",
   },
   layout: {
      width: "auto",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
         width: 600,
         marginLeft: "auto",
         marginRight: "auto",
      },
   },
   paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
         marginTop: theme.spacing(6),
         marginBottom: theme.spacing(6),
         padding: theme.spacing(3),
      },
   },
   stepper: {
      padding: theme.spacing(3, 0, 5),
   },
   buttons: {
      display: "flex",
      justifyContent: "flex-end",
   },
   button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
   },
   cancelButton: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
      float: "left",
   },
}));

const steps = ["결제 상품 확인", "배송지 확인", "결제하기", "결제완료"];

export default function Checkout() {
   const classes = useStyles();
   const [activeStep, setActiveStep] = React.useState(0);
   const history = useHistory();
   const [info, setInfo] = useState({
      addressInfo: {
         name: "",
         addressName: "",
         address: "",
         detail: "",
         zonecode: "",
         message: "",
         phone: "",
      },
      productList: [],
      delivery: 0,
   });
   const [total, setTotal] = useState(0);
   const [discount, setDiscount] = useState({
      message: "",
      price: 0,
   });

   const handleNext = () => {
      if (activeStep === 1) {
         if (window.confirm("결제 금액, 배송지 정보가 정확합니까?")) {
            setActiveStep(activeStep + 1);
         }
      } else {
         setActiveStep(activeStep + 1);
      }
   };

   const handleBack = () => {
      setActiveStep(activeStep - 1);
   };

   const cancelPay = () => {
      if (window.confirm("결제를 취소하시겠습니까?")) {
         history.goBack();
      } else return;
   };

   const couponApply = async (coupon, setOpen) => {
      await axios
         .post("/api/isAvailable", {
            code: coupon,
         })
         .then((res) => {
            const data = res.data.data;
            if (data.isAllCoupon) {
               const price = total - info.delivery;
               if (price >= data.minimumPrice) {
                  setDiscount({
                     message: `${data.couponName} : ${
                        data.minimumPrice
                     } 이상 구매 시, ${ThousandSeperator(
                        data.discount
                     )}원 할인`,
                     price: data.discount,
                  });
                  setTotal((prev) => prev - data.discount);
                  setOpen(false);
               } else {
                  window.alert(
                     `최소 ${data.minimumPrice}원 이상 구매하셔야 적용 가능합니다.`
                  );
               }
            } else {
               let price = 0;
               info.productList.forEach((item) => {
                  if (item.CategoryId === data.categoryId) {
                     price += Math.floor(
                        (item.productPrice || item.price) *
                           item.count *
                           (1 - data.discount / 100)
                     );
                  } else {
                     price += (item.productPrice || item.price) * item.count;
                  }
               });
               setDiscount({
                  message: `${data.couponName} : ${
                     CategoryMappingById[data.CategoryId]
                  }을 구매하시면, ${data.discount}% 할인됩니다.`,
                  price: total - price - info.delivery,
               });
               setTotal(price);
            }
         })
         .catch((err) => {
            window.alert("유효한 쿠폰이 아닙니다.");
         });
   };

   useEffect(() => {
      setInfo((prev) => ({
         ...prev,
         productList: history.location.state.orderProduct,
         delivery: history.location.state.delivery || 0,
      }));
      //기본 배송지 정보 불러오기
   }, [history.location.state]);
   useEffect(() => {
      let price = 0;
      info.productList.forEach((item) => {
         price += (item.productPrice || item.price) * item.count;
      });
      setTotal(price + info.delivery);
      if (price > 1000000) {
         setTotal(1000000);
      }
   }, [info]);
   return (
      <React.Fragment>
         <CssBaseline />
         <main className={classes.layout}>
            <Paper className={classes.paper}>
               <Typography component="h1" variant="h4" align="center">
                  결제
               </Typography>
               <Stepper activeStep={activeStep} className={classes.stepper}>
                  {steps.map((label) => (
                     <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                     </Step>
                  ))}
               </Stepper>
               <React.Fragment>
                  {
                     <React.Fragment>
                        {activeStep !== 0 ? (
                           activeStep !== 1 ? (
                              activeStep !== 2 ? (
                                 <PaymentApproved
                                    list={info.productList}
                                    address={info.addressInfo}
                                 />
                              ) : (
                                 <PaymentForm
                                    setActiveStep={setActiveStep}
                                    productList={info.productList}
                                    total={total}
                                 />
                              )
                           ) : (
                              <AddressForm
                                 info={info.addressInfo}
                                 setInfo={setInfo}
                              />
                           )
                        ) : (
                           <Review
                              list={info.productList}
                              total={total}
                              delivery={info.delivery}
                              couponApply={couponApply}
                              discount={discount}
                           />
                        )}

                        {activeStep < 2 && (
                           <>
                              <Button
                                 variant="contained"
                                 color="secondary"
                                 className={classes.cancelButton}
                                 onClick={cancelPay}>
                                 취소
                              </Button>{" "}
                              <div className={classes.buttons}>
                                 {activeStep !== 0 && (
                                    <Button
                                       onClick={handleBack}
                                       className={classes.button}>
                                       Back
                                    </Button>
                                 )}
                                 <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}>
                                    {activeStep === steps.length - 1
                                       ? "Place order"
                                       : "Next"}
                                 </Button>
                              </div>
                           </>
                        )}
                     </React.Fragment>
                  }
               </React.Fragment>
            </Paper>
            <Copyright />
         </main>
      </React.Fragment>
   );
}
