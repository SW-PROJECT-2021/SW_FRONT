import { Button, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Iamport from "react-iamport";
import { useHistory } from "react-router";

const useStyles = makeStyles(() => ({
   img: {
      "&:hover": {
         cursor: "pointer",
         width: "202px",
      },
   },
}));

// 결제 취소시 뒤로가기

// 결제 성공시 step + 1
export default function PaymentForm({ setActiveStep, productList, total }) {
   const classes = useStyles();
   const history = useHistory();

   const handleSuccess = (res) => {
      setActiveStep((prev) => prev + 1);
   };
   const handleFail = (err) => {
      console.log(err);
      window.alert(`결제가 취소되었습니다.\n
      이유 : ${err.error_msg}`);
      history.push("/");
   };
   return (
      <div>
         <Typography variant="subtitle1" style={{ textAlign: "center" }}>
            아래 카카오페이 사진을 클릭하여 결제해주세요.
            <br />
            (현재 테스트환경에선 최대 100만원까지 결제가능하여, <br />
            100만원 이상 결제시 100만원으로 결제하도록 했습니다.)
         </Typography>
         <Iamport
            identificationCode={process.env.REACT_APP_IAMPORT_CID}
            params={{
               pg: "kakaopay",
               pay_method: "card",
               merchant_uid: "merchant_" + new Date().getTime(),
               name: productList[0].name || productList[0].productName,
               amount: total,
               phone: "010-3213-3123",
            }}
            onFailed={(err) => handleFail(err)}
            onSuccess={(res) => handleSuccess(res)}
            jqueryLoaded={false}
            render={(renderProps) => (
               <img
                  src="assets/images/logos/kakaopay.png"
                  alt="error"
                  width="200px"
                  height="auto"
                  onClick={renderProps.onClick}
                  style={{
                     margin: "30px auto",
                     display: "block",
                  }}
                  className={classes.img}
               />
            )}
         />
      </div>
   );
}
