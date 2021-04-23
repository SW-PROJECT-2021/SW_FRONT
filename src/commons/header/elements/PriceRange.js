import {
   ListItemText,
   Menu,
   MenuItem,
   withStyles,
   Button,
} from "@material-ui/core";
import React, { useState } from "react";

const StyledMenu = withStyles({
   paper: {
      border: "1px solid #d3d4d5",
   },
})((props) => (
   <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
         vertical: "bottom",
         horizontal: "right",
      }}
      transformOrigin={{
         vertical: "top",
         horizontal: "right",
      }}
      {...props}
   />
));

const StyledMenuItem = withStyles((theme) => ({
   root: {
      "&:focus": {
         backgroundColor: theme.palette.primary.main,
         "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
            color: theme.palette.common.white,
         },
      },
   },
}))(MenuItem);

function PriceRange({ min, max, onChangeMin, onChangeMax }) {
   const [anchorEl, setAnchorEl] = useState(null);
   const [width, setWidth] = useState(0);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
      const elem = document.querySelector(
         "#root > header > section > div > div > div.col-lg-7.col-sm-12 > form"
      );
      setWidth(elem.offsetWidth);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };
   const onClickApply = (e) => {
      e.preventDefault();
      console.log("ok");
      //등록됐다는 이미지 한번
   };
   return (
      <div>
         <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            color="primary"
            onClick={handleClick}
            style={{
               backgroundColor: "#ffffff",
               color: "black",
               height: "38px",
            }}
         >
            상세검색
         </Button>
         <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            width={width}
         >
            <MenuItem>
               <input
                  className="form-control"
                  placeholder="최소 가격"
                  type="number"
                  value={min}
                  onChange={onChangeMin}
               />
            </MenuItem>
            <StyledMenuItem>
               <ListItemText primary="Drafts" />
            </StyledMenuItem>
            <StyledMenuItem>
               <ListItemText primary="Inbox" />
            </StyledMenuItem>
         </StyledMenu>
      </div>
   );
}
export default PriceRange;

/*
      <Container>
         <article className="filter-group">
            <header className="card-header">
               <a
                  href="/"
                  data-toggle="collapse"
                  data-target="#collapse_3"
                  aria-expanded="false"
                  className=""
               >
                  <i className="icon-control fa fa-chevron-down"></i>
                  <h6 className="title">가격</h6>
               </a>
            </header>
            <div className="filter-content collapse " id="collapse_3">
               <div className="card-body">
                  <div className="form-row">
                     <div className="form-group col-md-6">
                        <label>최소</label>
                        <input
                           className="form-control"
                           placeholder="최소 가격"
                           type="number"
                           value={min}
                           onChange={onChangeMin}
                        />
                     </div>
                     <div className="form-group text-right col-md-6">
                        <label>최대</label>
                        <input
                           className="form-control"
                           placeholder="최대 가격"
                           type="number"
                           value={max}
                           onChange={onChangeMax}
                        />
                     </div>
                  </div>
                  <button
                     className="btn btn-block btn-primary"
                     onClick={onClickApply}
                  >
                     적용
                  </button>
               </div>
            </div>
         </article>
      </Container> */
