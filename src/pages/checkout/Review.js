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
   ListItemAvatar,
   NativeSelect,
   TextField,
} from "@material-ui/core";
import CustomModal from "../../commons/CustomModal";

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
      top: "30px",
   },
   couponButton: {
      position: "relative",
      top: "30px",
   },
}));
const temp = [
   {
      detail: "할인 됩니다.할인 됩니다2.할인 됩니다2",
   },
   {
      detail: "할인 됩니다2.",
   },
   {
      detail: "할인 됩니다3.",
   },
   {
      detail: "할인 됩니다4.",
   },
];
export default function Review({ list }) {
   const classes = useStyles();
   const [open, setOpen] = useState(false);
   const [coupon, setCoupon] = useState("");
   const shipmentFee = 3000;
   let total = 0 + shipmentFee;

   const onCheckCoupon = () => {
      //확인
      setOpen(false);
      if (coupon === "") {
         return;
      }

      console.log(coupon);
   };

   return (
      <React.Fragment>
         <Typography variant="h6" gutterBottom>
            주문 내역
            <Button
               variant="outlined"
               color="primary"
               onClick={() => setOpen(true)}
               className={classes.button}>
               쿠폰등록
            </Button>
         </Typography>
         <List disablePadding>
            {list.map((item) => {
               total += item.count * (item.price || item.productPrice);
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
                  {ThousandSeperator(shipmentFee)}원
               </Typography>
            </ListItem>
            <ListItem className={classes.listItem}>
               <ListItemText primary="Total" />
               <Typography variant="subtitle1" className={classes.total}>
                  {ThousandSeperator(total)}원
               </Typography>
            </ListItem>
         </List>
         <CustomModal open={open} setOpen={setOpen} styles={classes.modelPaper}>
            <NativeSelect
               value={coupon}
               onChange={(e) => setCoupon(e.target.value)}
               name="name"
               inputProps={{
                  id: "name-native-error",
               }}
               className={classes.couponSelect}>
               <option value=""></option>
               {temp.map((item) => (
                  <option value={item.detail}>{item.detail}</option>
               ))}
            </NativeSelect>
            <br />
            <Button
               variant="outlined"
               color="primary"
               onClick={onCheckCoupon}
               className={classes.couponButton}>
               적용
            </Button>
         </CustomModal>
      </React.Fragment>
   );
}
