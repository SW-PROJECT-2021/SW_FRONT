import styled from "styled-components";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import { useState } from "react";
import { Paper } from "@material-ui/core";
import { menuList } from "./NavContent";

const StyledNav = styled.div`
   width: 100%;
   ul {
      width: 90%;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
   }
   ul > li {
      width: 33%;
   }
`;

function liStyle(bgColor) {
   return {
      backgroundColor: `${bgColor}`,
      padding: "7px 0",
   };
}

const liList = [
   {
      name: "유산소",
      href: "/",
   },
   {
      name: "웨이트",
      href: "/",
   },
   {
      name: "보조",
      href: "/",
   },
];

const Navigator = () => {
   const [anchorEl, setAnchorEl] = useState(null);
   const [width, setWidth] = useState();
   const [curOpen, setCurOpen] = useState(9999);

   const handlePopoverOpen = (event) => {
      setCurOpen(parseInt(event._targetInst.key));
      setAnchorEl(event.currentTarget);
      setWidth(event.target.clientWidth);
   };
   const handlePopoverClose = () => {
      setCurOpen(9999);
      setAnchorEl(null);
   };
   const open = Boolean(anchorEl);

   return (
      <nav
         class="navbar navbar-main navbar-expand navbar-light border-bottom"
         style={{ paddingTop: "0px", paddingBottom: "0px" }}
      >
         <div class="container">
            <div class="collapse navbar-collapse" id="main_nav">
               <StyledNav onMouseLeave={handlePopoverClose}>
                  <ul class="navbar-nav">
                     {liList.map((li, idx) => {
                        return (
                           <li
                              key={idx}
                              class="nav-item"
                              onMouseEnter={handlePopoverOpen}
                              style={liStyle(curOpen === idx ? "#f1f3f5" : "")}
                           >
                              <a key={idx} class="nav-link" href={li.href}>
                                 {li.name}
                              </a>
                           </li>
                        );
                     })}
                  </ul>
                  <Popper
                     id={open ? "transitions-popper" : undefined}
                     open={open}
                     anchorEl={anchorEl || null}
                     transition
                  >
                     <Fade in={true} timeout={350}>
                        <Paper
                           style={
                              open
                                 ? {
                                      backgroundColor: "#f1f3f5",
                                      width: width,
                                   }
                                 : {}
                           }
                        >
                           {menuList[curOpen]}
                        </Paper>
                     </Fade>
                  </Popper>
               </StyledNav>
            </div>
         </div>
      </nav>
   );
};

export default Navigator;
