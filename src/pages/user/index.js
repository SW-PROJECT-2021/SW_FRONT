import {
   Drawer,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   makeStyles,
   Toolbar,
   Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import ViewListIcon from "@material-ui/icons/ViewList";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import OrderRecord from "./OrderRecord";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
   drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: 240,
      borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
      height: "100%",
   },
   drawWidth: {
      float: "left",
   },
   toolbar: {
      backgroundColor: "#637bfe",
      color: "white",
   },
   content: {
      flexGrow: 1,
      padding: "0px",
      overflow: "auto",
   },
   container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
   },
   paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
   },
}));
const mainListItems = (history) => {
   return (
      <div>
         <ListItem button onClick={() => history.push("/user")}>
            <ListItemIcon>
               <ViewListIcon />
            </ListItemIcon>
            <ListItemText primary="주문 내역" />
         </ListItem>
         <ListItem button onClick={() => history.push("/user")}>
            <ListItemIcon>
               <HelpOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="문의 내역" />
         </ListItem>
         <ListItem button>
            <ListItemIcon>
               <PermIdentityIcon />
            </ListItemIcon>
            <ListItemText primary="고객정보" />
         </ListItem>
      </div>
   );
};
function User() {
   const classes = useStyles();
   const { userName } = useSelector((state) => state.UserReducer.users.data);
   const history = useHistory();
   const [orderRecordList, setOrderRecordList] = useState();

   useEffect(() => {
      const getOrderRecord = async () => {
         const response = await axios.get(
            `${process.env.REACT_APP_API_BASEURL}/api/orderHistory`
         );
         setOrderRecordList(response.data.data);
      };
      getOrderRecord();
   }, []);

   return (
      <div>
         <div className="container">
            <Toolbar className={classes.toolbar}>
               <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  className={classes.title}
               >
                  {userName} 님, 환영합니다.
               </Typography>
            </Toolbar>
            <Drawer
               variant="permanent"
               classes={{
                  paper: classes.drawerPaper,
               }}
               className={`col-3 ${classes.drawWidth}`}
            >
               <List>{mainListItems(history)}</List>
            </Drawer>
            <main className={`${classes.content} col-9`}>
               <OrderRecord
                  orderRecordList={orderRecordList}
                  setOrderRecordList={setOrderRecordList}
               />
            </main>
         </div>
      </div>
   );
}
export default User;
