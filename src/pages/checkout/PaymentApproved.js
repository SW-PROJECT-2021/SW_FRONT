import { Button, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";

function PaymentApproved() {
   const history = useHistory();
   return (
      <div>
         {" "}
         <Typography variant="h5" gutterBottom>
            주문해주셔서 감사합니다.
         </Typography>
         <br />
         <Typography variant="subtitle1">
            주문내역에서 주문 상태를 확인해보실 수 있습니다.
         </Typography>
         <div
            style={{
               margin: "30px auto",
               display: "block",
               textAlign: "center",
            }}
         >
            <Button
               color="primary"
               variant="outlined"
               onClick={() => history.push("/")}
            >
               홈으로 가기
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button
               color="primary"
               variant="outlined"
               onClick={() => history.push("/user")}
            >
               주문내역으로 가기
            </Button>
         </div>
      </div>
   );
}
export default PaymentApproved;
