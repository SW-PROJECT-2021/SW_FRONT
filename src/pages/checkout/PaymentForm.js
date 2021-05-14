import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
// 결제 취소시 뒤로가기

// 결제 성공시 step + 1
export default function PaymentForm({ setActiveStep }) {
   const [next_redirect_pc_url, setNext_redirect_pc_url] = useState("");
   const [tid, setTid] = useState("");
   const [params, setParams] = useState({
      cid: "TC0ONETIME",
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      item_name: "초코파이",
      quantity: 1,
      total_amount: 2200,
      vat_amount: 200,
      tax_free_amount: 0,
      approval_url: "http://localhost:3000/",
      fail_url: "http://localhost:3000/",
      cancel_url: "http://localhost:3000/",
   });
   useEffect(() => {
      const getKakaoPay = async () => {
         await axios({
            url: "https://cors-anywhere.herokuapp.com/https://kapi.kakao.com/v1/payment/ready",
            method: "POST",
            headers: {
               Authorization: "KakaoAK de0e3076b485b703b1f1a40123456789",
               "Content-type":
                  "application/x-www-form-urlencoded;charset=utf-8",
            },
            // 설정한 매개변수들
            params,
         }).then((response) => {
            // 응답에서 필요한 data만 뽑는다.
            const {
               data: { next_redirect_pc_url, tid },
            } = response;

            console.log(next_redirect_pc_url);
            console.log(tid);
            // 응답 data로 state 갱신
            setNext_redirect_pc_url(next_redirect_pc_url);
            setTid(tid);
         });
      };
      getKakaoPay();
   }, [params]);
   return (
      <React.Fragment>
         <Typography variant="h6" gutterBottom>
            Payment method
         </Typography>
         <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
               <TextField
                  required
                  id="cardName"
                  label="Name on card"
                  fullWidth
                  autoComplete="cc-name"
               />
            </Grid>
            <Grid item xs={12} md={6}>
               <TextField
                  required
                  id="cardNumber"
                  label="Card number"
                  fullWidth
                  autoComplete="cc-number"
               />
            </Grid>
            <Grid item xs={12} md={6}>
               <TextField
                  required
                  id="expDate"
                  label="Expiry date"
                  fullWidth
                  autoComplete="cc-exp"
               />
            </Grid>
            <Grid item xs={12} md={6}>
               <TextField
                  required
                  id="cvv"
                  label="CVV"
                  helperText="Last three digits on signature strip"
                  fullWidth
                  autoComplete="cc-csc"
               />
            </Grid>
            <Grid item xs={12}>
               <FormControlLabel
                  control={
                     <Checkbox color="secondary" name="saveCard" value="yes" />
                  }
                  label="Remember credit card details for next time"
               />
            </Grid>
         </Grid>
      </React.Fragment>
   );
}
