import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import CallToActionIcon from "@material-ui/icons/CallToAction";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import EventNoteIcon from "@material-ui/icons/EventNote";

import { Link } from "react-router-dom";

export const mainListItems = (
  <div>
    {" "}
    <Link to="/admin" style={{ textDecoration: "none", color: "black" }}>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="메인" />
      </ListItem>
    </Link>
    <Link to="/admin/Banner" style={{ textDecoration: "none", color: "black" }}>
      <ListItem button>
        <ListItemIcon>
          <EventNoteIcon />
        </ListItemIcon>

        <ListItemText primary="배너/이벤트 등록" />
      </ListItem>{" "}
    </Link>{" "}
    <Link
      to="/admin/ProductManage"
      style={{ textDecoration: "none", color: "black" }}
    >
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>

        <ListItemText primary="상품관리" />
      </ListItem>{" "}
    </Link>
    <Link to="/admin/Order" style={{ textDecoration: "none", color: "black" }}>
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="주문관리" />
      </ListItem>
    </Link>
    <Link to="/admin/Coupon" style={{ textDecoration: "none", color: "black" }}>
      <ListItem button>
        <ListItemIcon>
          <CallToActionIcon />
        </ListItemIcon>
        <ListItemText primary="쿠폰관리" />
      </ListItem>
    </Link>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="보고서" />
    </ListItem>
  </div>
);
/*
export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
*/
