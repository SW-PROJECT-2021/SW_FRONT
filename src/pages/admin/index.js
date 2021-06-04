import React, { useCallback, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems } from "./listItems";
import styled from "styled-components";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../stores/actions/actions";
import { useHistory } from "react-router-dom";
import AdminMain from "./AdminMain";
import Banner from "./BannerEvent/Banner";
import BannerDetail from "./BannerEvent/BannerDetail";
import PostBanner from "./BannerEvent/PostBanner";
import ProductManage from "./ProductManage/ProductManage";
import PostProduct from "./ProductManage/PostProduct";
import ProductDetail from "./ProductManage/ProductDetail";
import UpdateProduct from "./ProductManage/UpdateProduct";
import UpdateBanner from "./BannerEvent/UpdateBanner";
import OrderList from "./Order/OrderList";
import CouponList from "./Coupon/CouponList";
import PostCoupon from "./Coupon/PostCoupon";
import InquireList from "./Inquire/InquireList";
const drawerWidth = 240;
const LogoutButton = styled.button`
  border: 1px solid rgb(86, 100, 134);
  border-radius: 5px;
  background-color: #fff;
  margin: 0;
  &:hover {
    cursor: pointer;
    color: #3167eb;
  }
`;
export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    marginTop: "50px",
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(4),
    height: "100vh",
  },
  paper: {
    padding: theme.spacing(2),
    height: "100%",
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Admin() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.UserReducer.users);
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const LogoutButtonHandler = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(logout());
    },
    [dispatch]
  );
  useEffect(() => {
    if (!data) {
      history.push("/");
    }
  }, [data]);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Sw 6팀 관리페이지{" "}
          </Typography>
          <LogoutButton onClick={LogoutButtonHandler}>로그아웃</LogoutButton>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
      </Drawer>{" "}
      <Route path="/admin" exact component={AdminMain} />
      <Route path="/admin/Banner" exact component={Banner} />
      <Route
        path="/admin/Banner/BannerDetail/:id"
        exact
        component={BannerDetail}
      />
      <Route path="/admin/Banner/PostBanner" exact component={PostBanner} />
      <Route
        path="/admin/Banner/UpdateBanner/:id"
        exact
        component={UpdateBanner}
      />
      <Route path="/admin/ProductManage" exact component={ProductManage} />
      <Route path="/admin/ProductManage/PostProduct" component={PostProduct} />
      <Route
        path="/admin/ProductManage/ProductDetail/:id"
        component={ProductDetail}
      />
      <Route
        path="/admin/ProductManage/UpdateProduct/:id"
        component={UpdateProduct}
      />
      <Route path="/admin/Order" exact component={OrderList} />
      <Route path="/admin/Coupon" exact component={CouponList} />
      <Route path="/admin/Coupon/PostCoupon" exact component={PostCoupon} />
      <Route path="/admin/Inquire" exact component={InquireList} />
    </div>
  );
}
