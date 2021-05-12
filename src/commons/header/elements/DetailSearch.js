import {
   Button,
   Popper,
   Fade,
   Paper,
   List,
   ListItem,
   makeStyles,
   TextField,
   FormControl,
   InputLabel,
   Select,
} from "@material-ui/core";
import React, { useState } from "react";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import styled from "styled-components";

const useStyles = makeStyles({
   button: {
      backgroundColor: (props) => (props.on ? "#f8f9fa" : "#ffffff"),
      color: "black",
      height: "38px",
      padding: "0px",
   },
   paper: {
      backgroundColor: "#f8f9fa",
      borderRadius: "0px",
      boxShadow: "0px 0px",
      width: (props) => props.width,
   },
   formControl: {
      minWidth: 120,
   },
   buttonMargin: {
      margin: "0px auto",
   },
   removePadding: {
      padding: "0px 0px",
   },
});

const StyledHr = styled.hr`
   margin: 1px;
`;

function NumberFormatCustom(props) {
   const { inputRef, onChange, ...other } = props;
   return (
      <NumberFormat
         {...other}
         getInputRef={inputRef}
         onValueChange={(values) => {
            onChange({
               target: {
                  name: props.name,
                  value: values.value,
               },
            });
         }}
         thousandSeparator
         isNumericString
         allowNegative={false}
         prefix="₩"
      />
   );
}

NumberFormatCustom.propTypes = {
   inputRef: PropTypes.func.isRequired,
   name: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired,
};

function DetailSearch({
   price,
   onChange,
   anchorEl,
   setAnchorEl,
   category,
   setCategory,
}) {
   const [width, setWidth] = useState(0);
   const classes = useStyles({ width: width, on: Boolean(anchorEl) });

   const handleClick = (event) => {
      if (Boolean(anchorEl)) {
         setAnchorEl(null);
      } else {
         setAnchorEl(event.currentTarget);
         const elem = document.querySelector(
            "#root > header > section > div > div > div.col-lg-7.col-sm-12 > form"
         );
         setWidth(elem.offsetWidth);
      }
   };
   const init = () => {
      setCategory(0);
      onChange({ type: "init" });
      setAnchorEl(null);
   };
   return (
      <div>
         <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            color="primary"
            onClick={handleClick}
            className={classes.button}
         >
            상세검색
         </Button>
         <Popper
            open={Boolean(anchorEl)}
            anchorEl={anchorEl || null}
            transition
            placement="bottom-end"
         >
            <Fade in={true} timeout={350}>
               <Paper className={classes.paper}>
                  <List
                     aria-label="main mailbox folders"
                     className={classes.removePadding}
                  >
                     <ListItem>
                        <span className="col-2">목록 :</span>
                        <FormControl className={`${classes.formControl} col-4`}>
                           <InputLabel htmlFor="grouped-select">
                              선택
                           </InputLabel>
                           <Select
                              native
                              id="grouped-native-select"
                              onChange={(e) => setCategory(e.target.value)}
                              value={category ? category : 9999}
                           >
                              <option aria-label="none" value="" />
                              <optgroup label="유산소">
                                 <option value="running">런닝머신</option>
                                 <option value="cycle">사이클</option>
                              </optgroup>
                              <optgroup label="웨이트">
                                 <option value="babel">바벨</option>
                                 <option value="dumbbell">덤벨</option>
                                 <option value="plate">원판</option>
                                 <option value="macine">기구</option>
                              </optgroup>
                              <optgroup label="보조">
                                 <option value="band">밴드</option>
                                 <option value="strap">스트랩</option>
                                 <option value="belt">벨트</option>
                                 <option value="roller">폼롤러</option>
                                 <option value="mat">요가매트</option>
                              </optgroup>
                           </Select>
                        </FormControl>
                        &nbsp;&nbsp;
                     </ListItem>
                     <StyledHr />
                     <ListItem className={classes.item}>
                        <span className="col-2">가격 : </span>
                        <TextField
                           id="search-filter-pricemin"
                           label="최소 가격"
                           value={price.min}
                           name="numberformat"
                           margin="none"
                           InputProps={{
                              inputComponent: NumberFormatCustom,
                              onChange: onChange,
                              name: "min",
                           }}
                           className={`col-4`}
                        />
                        &nbsp; ~ &nbsp;
                        <TextField
                           id="search-filter-pricemax"
                           label="최대 가격"
                           value={price.max}
                           name="numberformat"
                           margin="none"
                           InputProps={{
                              inputComponent: NumberFormatCustom,
                              onChange: onChange,
                              name: "max",
                           }}
                           className={`col-4`}
                        />
                     </ListItem>
                     <StyledHr />
                     <ListItem className={classes.removePadding}>
                        <Button
                           color="secondary"
                           className={classes.buttonMargin}
                           onClick={init}
                        >
                           취소
                        </Button>
                     </ListItem>
                  </List>
               </Paper>
            </Fade>
         </Popper>
      </div>
   );
}
export default DetailSearch;
