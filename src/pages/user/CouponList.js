import {
   makeStyles,
   Paper,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableRow,
   Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CustomPagination from "../../commons/CustomPagination";

const useStyles = makeStyles((theme) => ({
   font: { fontFamily: "NanumSquareRegular !important" },
   seeMore: {
      marginTop: theme.spacing(3),
   },
   orderRecord: {
      width: "100%",
   },
   heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "40%",
      flexShrink: 0,
   },
   secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      flexBasis: "20%",
   },
   h3: {
      margin: "20px 0px",
   },
   h6: {
      margin: "10px 10px",
      fontFamily: "NanumSquareRegular",
   },
   totalPrice: {
      float: "right",
      lineHeight: "37px",
   },
   root: {
      margin: "20px 0px",
      "& > *": {
         marginTop: theme.spacing(2),
      },
   },
   align: {
      maxWidth: `${38 * 9}px`,
      margin: "0px auto",
   },
   table: {
      minWidth: 500,
   },
}));

const temp = [
   {
      detail: "할인 됩니다.할인 됩니다2.할인 됩니다2",
   },
   {
      detail: "할인 됩니다2.",
   },
   {
      detail: "할인 됩니다3.",
   },
   {
      detail: "할인 됩니다4.",
   },
];
function CouponList() {
   const classes = useStyles();
   const [couponList, setCouponList] = useState([]);
   const [pageNum, setPageNum] = useState(0);
   const [page, setPage] = useState(1);
   useEffect(() => {
      setCouponList(temp);
      setPageNum(
         Math.floor(
            temp.length % 10 === 0 ? temp.length / 10 : temp.length / 10 + 1
         )
      );
   }, []);
   const getSingleCouponItem = (item, idx) => {
      return (
         <TableRow key={idx} style={{ width: "100%" }}>
            <TableCell component="th" scope="row">
               {item.detail}
            </TableCell>
         </TableRow>
      );
   };

   return (
      <div className={classes.font}>
         <Typography variant="h3" className={classes.h3}>
            쿠폰 목록
         </Typography>
         <TableContainer component={Paper}>
            <Table
               className={classes.table}
               aria-label="custom pagination table">
               <TableBody>
                  {couponList
                     .slice((page - 1) * 10, page * 10)
                     .map((item, idx) => getSingleCouponItem(item, idx))}
               </TableBody>
            </Table>
         </TableContainer>
         <CustomPagination
            onChangePage={(e, page) => setPage(page)}
            pageNum={pageNum}
         />
      </div>
   );
}
export default CouponList;
