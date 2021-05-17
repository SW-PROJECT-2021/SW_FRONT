import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { ThousandSeperator } from "../../utils/ThousandSeperator";
import { Avatar, ListItemAvatar } from "@material-ui/core";

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
}));

export default function Review({ list }) {
   const classes = useStyles();
   let total = 0;
   return (
      <React.Fragment>
         <Typography variant="h6" gutterBottom>
            주문 내역
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
                        className={`col-4 ${classes.price}`}
                     >
                        {ThousandSeperator(
                           (item.price || item.productPrice) * item.count
                        )}
                        원
                     </Typography>
                  </ListItem>
               );
            })}
            <ListItem className={classes.listItem}>
               <ListItemText primary="Total" />
               <Typography variant="subtitle1" className={classes.total}>
                  {ThousandSeperator(total)}원
               </Typography>
            </ListItem>
         </List>
      </React.Fragment>
   );
}
