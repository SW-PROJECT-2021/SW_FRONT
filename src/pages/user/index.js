import {
   Container,
   Drawer,
   Grid,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   makeStyles,
   NativeSelect,
   Paper,
   Toolbar,
   Typography,
} from "@material-ui/core";
import React from "react";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import ViewListIcon from "@material-ui/icons/ViewList";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import { Route, useHistory } from "react-router";
import { useSelector } from "react-redux";
import OrderRecord from "./OrderRecord";
import { ThousandSeperator } from "../../utils/ThousandSeperator";

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
   orderRecord: {
      border: "1px solid rgba(0, 0, 0, 0.12)",
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
const list = [
   {
      id: 0,
      productImg: "assets/images/items/1.jpg",
      productName: "Some name of item goes here nice",
      count: 3,
      productPrice: 30000,
   },
   {
      id: 1,
      productImg: "assets/images/items/2.jpg",
      productName: "Product name goes here nice",
      count: 1,
      productPrice: 10000,
   },
   {
      id: 2,
      productImg: "assets/images/items/3.jpg",
      productName: " Another name of some product goes just here",
      count: 2,
      productPrice: 20000,
   },
];
function User() {
   const classes = useStyles();
   const history = useHistory();
   const { userName } = useSelector((state) => state.LoginReducer.users);

   const getItem = (item, idx) => {
      return (
         <tr key={idx}>
            <td>
               <figure className="itemside">
                  <div className="aside">
                     <img
                        src={item.productImg}
                        className="img-sm"
                        alt="error"
                     />
                  </div>
                  <figcaption className="info">
                     <a href="/" className="title text-dark">
                        {item.productName}
                     </a>
                  </figcaption>
               </figure>
            </td>
            <td>{item.count}</td>
            <td>
               <div className="price-wrap">
                  <var className="price">
                     {ThousandSeperator(item.count * item.productPrice)}원
                  </var>
                  <small className="text-muted">
                     {" "}
                     개당 {ThousandSeperator(item.productPrice)}원{" "}
                  </small>
               </div>
            </td>
         </tr>
      );
   };
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
               <div className={classes.orderRecord}>
                  <table className="table table-borderless table-shopping-cart">
                     <thead className="text-muted">
                        <tr className="small text-uppercase">
                           <th scope="col">상품</th>
                           <th scope="col" width="120">
                              수량
                           </th>
                           <th scope="col" width="120">
                              가격
                           </th>
                           <th scope="col" className="text-right" width="200">
                              {" "}
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {list.map((item, idx) => getItem(item, idx))}
                     </tbody>
                  </table>
                  <div className="card-body border-top">
                     <a href="/" className="btn btn-primary float-md-right">
                        {" "}
                        구매하기 <i className="fa fa-chevron-right"></i>{" "}
                     </a>
                     <button
                        onClick={() => history.goBack()}
                        className="btn btn-light"
                     >
                        {" "}
                        <i className="fa fa-chevron-left"></i> 뒤로가기{" "}
                     </button>
                  </div>
               </div>
            </main>
         </div>
      </div>
   );
}
export default User;
