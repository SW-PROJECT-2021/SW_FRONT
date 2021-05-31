import {
   CircularProgress,
   Drawer,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   makeStyles,
   Modal,
   Toolbar,
   Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ViewListIcon from "@material-ui/icons/ViewList";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Route, Switch, useHistory } from "react-router";
import { useSelector } from "react-redux";
import OrderRecord from "./OrderRecord";
import axios from "axios";
import CouponList from "./CouponList";

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
      zIndex: "0",
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
   loading: {
      position: "absolute",
      top: "47%",
      left: "47%",
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
         <ListItem button onClick={() => history.push("/user/coupon")}>
            <ListItemIcon>
               <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="쿠폰" />
         </ListItem>
      </div>
   );
};
function User() {
   const classes = useStyles();
   const { userName } = useSelector((state) => state.UserReducer.users.data);
   const history = useHistory();
   const [originalList, setOriginalList] = useState([]);
   const [refresh, setRefresh] = useState(0);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      setLoading(true);
      const getOrderRecord = async () => {
         const response = await axios.get(`/api/orderHistory`);
         setOriginalList(
            response.data.data.sort(function (a, b) {
               return b.id - a.id;
            })
         );
         setLoading(false);
      };
      getOrderRecord();
   }, [refresh]);
   return (
      <div>
         <div className="container">
            <Toolbar className={classes.toolbar}>
               <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  className={classes.title}>
                  {userName} 님, 환영합니다.
               </Typography>
            </Toolbar>
            <Drawer
               variant="permanent"
               classes={{
                  paper: classes.drawerPaper,
               }}
               className={`col-3 ${classes.drawWidth}`}>
               <List>{mainListItems(history)}</List>
            </Drawer>
            <main className={`${classes.content} col-9`}>
               <Switch>
                  <Route path="/user/coupon">
                     <CouponList />
                  </Route>
                  <Route path="/user">
                     <OrderRecord
                        originalList={originalList}
                        setRefresh={setRefresh}
                     />
                  </Route>
               </Switch>
            </main>

            <Modal open={loading}>
               <CircularProgress
                  color="secondary"
                  className={classes.loading}
               />
            </Modal>
         </div>
      </div>
   );
}
export default User;
