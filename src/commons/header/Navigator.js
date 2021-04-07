import styled from "styled-components";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import { useState } from "react";
import { Paper } from "@material-ui/core";
import { menuList } from "./NavContent";
import { ExpandMore } from "@material-ui/icons";

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
const StyledLi = styled.li`
   padding: 7px 0;
   position: relative;
   cursor: pointer;
   &.open {
      background-color: #f8f9fa;
   }
   @media screen and (max-width: 420px) {
      height: 50px;
   }
`;
const StyledA = styled.a`
   display: inline-block;
   color: #1c1c1c;
   width: 50%;
   &.disabled {
      pointer-events: none;
   }
   @media screen and (max-width: 420px) {
      position: absolute;
      width: 60%;
      left: 0px;
   }
`;

const liList = [
   {
      name: "유산소",
      href: "/#/list?range=유산소",
   },
   {
      name: "웨이트",
      href: "/#/list?range=웨이트",
   },
   {
      name: "보조",
      href: "",
   },
];

const Navigator = () => {
   const [anchorEl, setAnchorEl] = useState(null);
   const [width, setWidth] = useState();
   const [curOpen, setCurOpen] = useState(9999);

   const handlePopoverOpen = (event) => {
      if (event.type === "click" && Boolean(anchorEl)) {
         handlePopoverClose();
         return;
      }
      setCurOpen(parseInt(event.target.id));
      setAnchorEl(event.currentTarget);
      setWidth(event.target.clientWidth > 218 ? event.target.clientWidth : 218);
   };
   const handlePopoverClose = () => {
      setCurOpen(9999);
      setAnchorEl(null);
   };

   const ExpandButton = (key) => (
      <ExpandMore
         id={key}
         style={{
            position: "absolute",
            right: "10px",
            cursor: "pointer",
            zIndex: "-100",
         }}
      />
   );
   const open = Boolean(anchorEl);

   return (
      <nav
         className="navbar navbar-main navbar-expand navbar-light border-bottom"
         style={{ paddingTop: "0px", paddingBottom: "0px" }}
      >
         <div className="container">
            <div className="collapse navbar-collapse" id="main_nav">
               <StyledNav onMouseLeave={handlePopoverClose}>
                  <ul className="navbar-nav">
                     {liList.map((li, idx) => {
                        return (
                           <StyledLi
                              id={idx}
                              key={idx}
                              className={`nav-item ${
                                 curOpen === idx && "open"
                              }`}
                              onMouseEnter={handlePopoverOpen}
                              onClick={handlePopoverOpen}
                           >
                              <span id={idx} className="nav-link">
                                 <StyledA
                                    href={li.href}
                                    className={!li.href && "disabled"}
                                 >
                                    {li.name}
                                 </StyledA>
                                 {ExpandButton(idx)}
                              </span>
                           </StyledLi>
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
                           style={{
                              backgroundColor: "#f8f9fa",
                              width: width,
                           }}
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
