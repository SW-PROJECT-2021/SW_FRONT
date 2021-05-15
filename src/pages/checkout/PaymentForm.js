import { Button, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
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
export default function PaymentForm({ setActiveStep, productList }) {
   const [total, setTotal] = useState(0);
   const [fail, setFail] = useState(null);
   const classes = useStyles();
   const history = useHistory();
   useEffect(() => {
      let price = 0;
      productList.forEach((item) => {
         price += (item.productPrice || item.price) * item.count;
      });
      if (price > 1000000) {
         setTotal(1000000);
      }
   }, [productList]);

   const handleSuccess = (res) => {
      setActiveStep((prev) => prev + 1);
   };
   const handleFail = (err) => {
      console.log(err);
      setFail(err.error_msg);
   };

   return (
      <div>
         <Typography variant="subtitle1" style={{ textAlign: "center" }}>
            아래 카카오페이 사진을 클릭하여 결제해주세요.
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
         {fail && (
            <>
               <Typography variant="subtitle1">
                  결제가 취소되었습니다.
                  <br />
                  이유 : {fail}
               </Typography>
               <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => history.push("/")}
                  style={{ margin: "30px auto", display: "block" }}
               >
                  홈으로 가기
               </Button>
            </>
         )}
      </div>
   );
}
