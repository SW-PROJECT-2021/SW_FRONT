import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Divider,
   Step,
   StepLabel,
   Stepper,
   TextField,
   Typography,
} from "@material-ui/core";
import { ThousandSeperator } from "../../utils/ThousandSeperator";
import CustomModal from "../../commons/CustomModal";
import ProductReview from "./ProductReview";
import Question from "./Question";
import CustomPagination from "../../commons/CustomPagination";
import { MiliToyymmdd } from "../../utils/MiliToyymmdd";
import axios from "axios";

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
   totalPriceDiscount: {
      float: "right",
      lineHeight: "20px",
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
}));

const getItem = (item, idx) => {
   return (
      <tr key={idx}>
         <td>
            <figure className="itemside">
               <div className="aside">
                  <img src={item.img1} className="img-sm" alt="error" />
               </div>
               <figcaption className="info">
                  <span className="title text-dark">{item.name}</span>
               </figcaption>
            </figure>
         </td>
         <td>{item.count}</td>
         <td>
            <div className="price-wrap">
               <var className="price">
                  {ThousandSeperator(item.count * item.price)}원
               </var>
               <small className="text-muted">
                  {" "}
                  개당 {ThousandSeperator(item.price)}원{" "}
               </small>
            </div>
         </td>
      </tr>
   );
};

function OrderRecord({ originalList, setRefresh }) {
   const classes = useStyles();
   const [open, setOpen] = useState(false);
   const [pageNum, setPageNum] = useState(0);
   const [page, setPage] = useState(1);
   const [orderRecordList, setOrderRecordList] = useState([]);
   //1부터 시작
   const [choosedItem, setChoosedItem] = useState({});
   const [startDate, setStartDate] = useState(
      MiliToyymmdd(Date.now(), 0, true)
   );
   const [endDate, setEndDate] = useState(MiliToyymmdd(Date.now()));
   const steps = ["결제완료", "배송중", "배송완료", "구매확정"];
   const [expanded, setExpanded] = React.useState(-1);
   const [OrderHistoryId, setOrderHistoryId] = useState(0);

   useEffect(() => {
      const list = originalList.filter(
         (item) =>
            item.orderDate >= startDate &&
            item.orderDate <= endDate + "T9999999"
      );
      setOrderRecordList(list);
      updatePageNum(list.length);
   }, [originalList, startDate, endDate]);

   const updatePageNum = (length) => {
      setPageNum(Math.floor(length % 10 === 0 ? length / 10 : length / 10 + 1));
   };

   const moveStatus = async (id) => {
      await axios.put("/api/orderHistory/raiseStatus", { id: id });
      setRefresh((prev) => prev + 1);
   };

   const onClickButton = (idx, orderStatus, id) => {
      setChoosedItem(idx);
      if (orderStatus === 3) {
         const ok = window.confirm("구매 확정 하시겠습니까?");
         if (ok) {
            moveStatus(id);
         }
      } else {
         setOpen(true);
         setOrderHistoryId(id);
      }
   };
   const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
   };
   const singleOrderRecordAccordian = (item, idx) => {
      return (
         <Accordion expanded={expanded === idx} onChange={handleChange(idx)}>
            <AccordionSummary
               aria-controls="panel1bh-content"
               id="panel1bh-header">
               <Typography className={classes.secondaryHeading}>
                  {MiliToyymmdd(item.createdAt)}
               </Typography>
               <Typography className={classes.heading}>
                  {item.Ordered[0].name}&nbsp;
                  {item.Ordered.length > 1 && `외 ${item.Ordered.length - 1}종`}
               </Typography>
               <Typography className={classes.secondaryHeading}>
                  {item.orderStatus !== 1
                     ? item.orderStatus !== 2
                        ? item.orderStatus !== 3
                           ? "구매확정"
                           : "배송완료"
                        : "배송중"
                     : "결제완료"}
               </Typography>
               <Typography className={classes.secondaryHeading}>
                  Total :{" "}
                  {ThousandSeperator(item.totalCost - item.discountCost)} 원
               </Typography>
            </AccordionSummary>
            <AccordionDetails>
               <div className={classes.orderRecord}>
                  <Divider />
                  <Stepper nonLinear alternativeLabel>
                     {steps.map((label, idx) => (
                        <Step
                           key={label}
                           active={item.orderStatus >= idx + 1 ? true : false}
                           completed={
                              item.orderStatus >= idx + 1 ? true : false
                           }>
                           <StepLabel>{label}</StepLabel>
                        </Step>
                     ))}
                  </Stepper>
                  <Typography variant="h6" className={classes.h6}>
                     {item.orderDate && item.orderDate.slice(0, 10)}
                  </Typography>
                  <Typography variant="h6" className={classes.h6}>
                     배송지 이름 : {item.orderDestination}
                  </Typography>
                  <table className="table table-borderless table-shopping-cart">
                     <thead className="text-muted">
                        <tr className="small text-uppercase">
                           <th scope="col">상품</th>
                           <th scope="col" width="200">
                              수량
                           </th>
                           <th scope="col" width="200">
                              가격
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {item.Ordered.map((item, idx) => getItem(item, idx))}
                     </tbody>
                  </table>
                  <div className="card-body border-top">
                     <button
                        className="btn btn-primary"
                        onClick={() =>
                           onClickButton(idx, item.orderStatus, item.id)
                        }>
                        {item.orderStatus !== 4 ? (
                           item.orderStatus !== 3 ? (
                              <>문의하기</>
                           ) : (
                              <>구매확정</>
                           )
                        ) : (
                           <>상품평</>
                        )}
                     </button>
                     <div
                        className={`${
                           item.discountCost
                              ? classes.totalPriceDiscount
                              : classes.totalPrice
                        } col-3`}>
                        {item.discountCost ? (
                           <>
                              할인 : {ThousandSeperator(item.discountCost)}원
                              <br />
                           </>
                        ) : (
                           <></>
                        )}
                        Total :{" "}
                        {ThousandSeperator(item.totalCost - item.discountCost)}{" "}
                        원
                     </div>
                  </div>
               </div>
            </AccordionDetails>
         </Accordion>
      );
   };

   const checkStatus = () => {
      if (orderRecordList[choosedItem]) {
         return orderRecordList[choosedItem].orderStatus;
      } else {
         return 0;
      }
   };

   const onStartDateHandler = (e) => {
      if (
         e.target.value <= endDate &&
         e.target.value <= MiliToyymmdd(Date.now())
      ) {
         setStartDate(e.target.value);
      }
   };
   const onEndDateHandler = (e) => {
      if (
         e.target.value >= startDate &&
         e.target.value <= MiliToyymmdd(Date.now())
      ) {
         setEndDate(e.target.value);
      }
   };
   return (
      <>
         <div className={classes.font}>
            <Typography variant="h3" className={classes.h3}>
               주문내역
            </Typography>
            <div style={{ margin: "10px auto" }}>
               <TextField
                  variant="outlined"
                  fullWidth
                  id="startdate"
                  name="startdate"
                  type="date"
                  autoComplete="startdate"
                  autoFocus
                  value={startDate}
                  onChange={onStartDateHandler}
                  className="col-3"
               />
               <TextField
                  variant="outlined"
                  fullWidth
                  id="startdate"
                  name="startdate"
                  type="date"
                  autoComplete="startdate"
                  autoFocus
                  value={endDate}
                  onChange={onEndDateHandler}
                  className="col-3"
               />
            </div>
            {orderRecordList
               .slice((page - 1) * 10, page * 10)
               .map((item, idx) => singleOrderRecordAccordian(item, idx))}
            <CustomPagination
               onChangePage={(e, page) => setPage(page)}
               pageNum={pageNum}
            />
            <CustomModal open={open} setOpen={setOpen}>
               {checkStatus() <= 2 ? (
                  <Question
                     productList={orderRecordList[choosedItem]}
                     setOpen={setOpen}
                  />
               ) : (
                  <ProductReview
                     list={orderRecordList[choosedItem]}
                     setOpen={setOpen}
                     OrderHistoryId={OrderHistoryId}
                  />
               )}
            </CustomModal>
         </div>
      </>
   );
}
export default OrderRecord;
