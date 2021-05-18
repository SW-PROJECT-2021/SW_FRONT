import {
   Button,
   CircularProgress,
   makeStyles,
   Modal,
   Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { deleteCart } from "../../stores/actions/actions";
const useStyles = makeStyles(() => ({
   loading: {
      position: "absolute",
      top: "47%",
      left: "47%",
   },
}));
function PaymentApproved({ list }) {
   const history = useHistory();
   const [loading, setLoading] = useState(false);
   const classes = useStyles();
   const dispatch = useDispatch();

   useEffect(() => {
      if (list[0].ProductId) {
         setLoading(true);
         list.forEach((item) => {
            dispatch(deleteCart(item.ProductId));
         });
         setLoading(false);
      }
   }, [list, dispatch]);

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
         <Modal open={loading}>
            <CircularProgress color="secondary" className={classes.loading} />
         </Modal>
      </div>
   );
}
export default PaymentApproved;
