import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { ThousandSeperator } from "../../utils/ThousandSeperator";
import {
   Avatar,
   Button,
   Divider,
   ListItemAvatar,
   TextField,
} from "@material-ui/core";
import CustomModal from "../../commons/CustomModal";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
   listItem: {
      padding: theme.spacing(1, 0),
   },
   total: {
      fontWeight: 700,
   },
   title: {
      marginTop: theme.spacing(2),
   },
   price: {
      textAlign: "right",
   },
   button: {
      position: "relative",
      left: "380px",
      margin: "0px auto",
   },
   modelPaper: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: "10px",
      width: "500px",
      height: "150px",
      boxShadow: theme.shadows[2],
      padding: theme.spacing(2, 4, 3),
      textAlign: "center",
      "& button": {
         margin: "10px 0px",
      },
   },
   couponSelect: {
      position: "relative",
      top: "25px",
      width: "300px",
   },
   couponButton: {
      position: "relative",
      top: "30px",
   },
}));
export default function Review({
   list,
   delivery,
   total,
   couponApply,
   discount,
   couponApplied,
}) {
   const classes = useStyles();
   const [open, setOpen] = useState(false);
   const [coupon, setCoupon] = useState("");
   const checkCoupon = async () => {
      await axios.get("/api/coupon/all").then((data) => {
         console.log(data.data.data);
      });
   };
   return (
      <React.Fragment>
         <Typography variant="h6" gutterBottom>
            주문 내역
            {!couponApplied && (
               <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setOpen(true)}
                  className={classes.button}>
                  쿠폰등록
               </Button>
            )}
         </Typography>
         <List disablePadding>
            {list.map((item) => {
               return (
                  <ListItem key={item.name} className={classes.listItem}>
                     <ListItemAvatar className="col-2">
                        <Avatar src={item.img || item.productImg} alt="error" />
                     </ListItemAvatar>
                     <ListItemText
                        primary={item.name || item.productName}
                        className="col-5"
                     />
                     <Typography className="col-2">
                        수량 : {item.count}
                     </Typography>
                     <Typography
                        variant="body2"
                        className={`col-4 ${classes.price}`}>
                        {ThousandSeperator(
                           (item.price || item.productPrice) * item.count
                        )}
                        원
                     </Typography>
                  </ListItem>
               );
            })}
            <ListItem className={classes.listItem}>
               <ListItemText primary="배송비" />
               <Typography variant="subtitle1">
                  {ThousandSeperator(delivery)}원
               </Typography>
            </ListItem>
            {discount.message && (
               <>
                  <ListItem className={classes.listItem}>
                     <ListItemText primary="쿠폰 적용 : " />
                     <Typography variant="subtitle1">
                        {ThousandSeperator(discount.price)}원
                     </Typography>
                  </ListItem>
               </>
            )}{" "}
            <Divider />
            <ListItem className={classes.listItem}>
               <ListItemText primary="Total" />
               <Typography variant="subtitle1" className={classes.total}>
                  {ThousandSeperator(total)}원
               </Typography>
            </ListItem>
         </List>
         <CustomModal open={open} setOpen={setOpen} styles={classes.modelPaper}>
            <TextField
               value={coupon}
               label="쿠폰코드"
               onChange={(e) => setCoupon(e.target.value)}
               name="name"
               inputProps={{
                  id: "name-native-error",
               }}
               className={classes.couponSelect}
            />
            <br />
            <Button
               variant="outlined"
               color="primary"
               onClick={() => couponApply(coupon, setOpen)}
               className={classes.couponButton}>
               적용
            </Button>
         </CustomModal>
      </React.Fragment>
   );
}
/*

            <Button onClick={checkCoupon}>쿠폰확인</Button>
*/
