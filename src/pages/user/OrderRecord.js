import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import { ThousandSeperator } from "../../utils/ThousandSeperator";
import CustomModal from "../../commons/CustomModal";
import ProductReview from "./ProductReview";
import Question from "./Question";
import CustomPagination from "../../commons/CustomPagination";

const useStyles = makeStyles((theme) => ({
   font: { fontFamily: "NanumSquareRegular !important" },
   seeMore: {
      marginTop: theme.spacing(3),
   },
   orderRecord: {
      border: "1px solid rgba(0, 0, 0, 0.12)",
      marginBottom: "20px",
      borderRadius: "10px",
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

function OrderRecord({ orderRecordList, setOrderRecordList }) {
   const classes = useStyles();
   const [open, setOpen] = useState(false);
   const [pageNum, setPageNum] = useState(0);
   const [page, setPage] = useState(1);
   //1부터 시작
   const [choosedItem, setChoosedItem] = useState({});
   const steps = ["결제완료", "배송중", "배송완료", "구매확정"];

   useEffect(() => {
      setPageNum(
         Math.floor(
            orderRecordList.length % 3 === 0
               ? orderRecordList.length / 3
               : orderRecordList.length / 3 + 1
         )
      );
   }, [orderRecordList]);

   const moveStatus = (idx, status) => {
      setOrderRecordList((prev) =>
         prev.map((item, index) => {
            if (idx === index) {
               return { ...item, orderStatus: item.orderStatus + status };
            }
            return item;
         })
      );
   };

   const onClickButton = (idx, orderStatus) => {
      setChoosedItem(idx);
      if (orderStatus === 3) {
         const ok = window.confirm("구매 확정 하시겠습니까?");
         if (ok) {
            moveStatus(idx, 1);
         }
      } else {
         setOpen(true);
      }
   };

   const singleOrderRecord = (item, idx) => {
      let totalPrice = 0;
      return (
         <>
            <div className={classes.orderRecord}>
               <Stepper nonLinear alternativeLabel>
                  {steps.map((label, idx) => (
                     <Step
                        key={label}
                        active={item.orderStatus >= idx + 1 ? true : false}
                        completed={item.orderStatus >= idx + 1 ? true : false}>
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
                     {item.Ordered.map((item, idx) => {
                        totalPrice += item.count * item.price;
                        return getItem(item, idx);
                     })}
                  </tbody>
               </table>
               <div className="card-body border-top">
                  <button
                     className="btn btn-primary"
                     onClick={() => onClickButton(idx)}>
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
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <button
                     className="btn btn-secondary"
                     onClick={() => moveStatus(idx, -1)}>
                     테스트 버튼 상태 - 1
                  </button>
                  <button
                     className="btn btn-secondary"
                     onClick={() => moveStatus(idx, 1)}>
                     테스트 버튼 상태 + 1
                  </button>
                  <div className={`${classes.totalPrice} col-3`}>
                     Total : {ThousandSeperator(totalPrice)} 원
                  </div>
               </div>
            </div>
         </>
      );
   };

   const checkStatus = () => {
      if (orderRecordList[choosedItem]) {
         return orderRecordList[choosedItem].orderStatus;
      } else {
         return 0;
      }
   };
   return (
      <>
         <div className={classes.font}>
            <Typography variant="h3" className={classes.h3}>
               주문내역
            </Typography>
            {orderRecordList
               .slice((page - 1) * 3, page * 3)
               .map((item, idx) => singleOrderRecord(item, idx))}
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
                  />
               )}
            </CustomModal>
         </div>
      </>
   );
}
export default OrderRecord;
