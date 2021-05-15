import {
   Button,
   CircularProgress,
   makeStyles,
   Modal,
   TextField,
   Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { changeCountCart, deleteCart } from "../../stores/actions/actions";
import { ThousandSeperator } from "../../utils/ThousandSeperator";

const useStyles = makeStyles((theme) => ({
   loading: {
      position: "absolute",
      top: "47%",
      left: "47%",
   },
   quantityInput: {
      width: "40px",
   },
   quantityChange: {
      minWidth: "40px",
      width: "40px",
      marginLeft: "1px",
      padding: "0px",
   },
   productCnt: {
      margin: "5px 0px",
   },
   tableRow: {
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
   },
   soldout: {
      zIndex: 10,
   },
}));

function Table({ cartList, setCartList }) {
   const history = useHistory();
   const [loading, setLoading] = useState(false);
   const classes = useStyles();
   const dispatch = useDispatch();

   const onChangeQuantity = async (id, count, productCnt) => {
      setLoading(true);
      if (parseInt(count) <= parseInt(productCnt)) {
         dispatch(changeCountCart(parseInt(id), parseInt(count)));
      } else {
         window.alert("재고가 부족합니다!");
         setCartList((prev) =>
            prev.map((item) => {
               if (id === item.ProductId) {
                  item.count = count;
               }
               return item;
            })
         );
      }
      setLoading(false);
   };

   const onChangeQuantityInput = (e, id) => {
      setLoading(true);
      if (/^[0-9]*$/.test(e.target.value)) {
         setCartList((prev) =>
            prev.map((item) => {
               if (item.ProductId === id) {
                  return { ...item, count: e.target.value };
               } else {
                  return item;
               }
            })
         );
      }
      setLoading(false);
   };

   const onDelete = async (id) => {
      setLoading(true);
      dispatch(deleteCart(id));
      setLoading(false);
   };

   const onClickCheckout = () => {
      history.push("/checkout", {
         orderProduct: cartList,
      });
   };
   const getItem = (item, idx) => {
      return (
         <>
            <tr key={idx} className={classes.tableRow}>
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
               <td>
                  <TextField
                     id="quantity"
                     label="수량"
                     value={item.count}
                     className={classes.quantityInput}
                     onChange={(e) => onChangeQuantityInput(e, item.ProductId)}
                  />
                  <div
                     style={{
                        lineHeight: "46px",
                        width: "40px",
                        float: "right",
                     }}
                  >
                     <Button
                        color="primary"
                        variant="contained"
                        className={classes.quantityChange}
                        onClick={() =>
                           onChangeQuantity(
                              item.ProductId,
                              item.count,
                              item.productCnt
                           )
                        }
                     >
                        변경
                     </Button>
                  </div>
                  <Typography className={classes.productCnt}>
                     재고 : {item.productCnt}
                  </Typography>
               </td>
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
               <td className="text-right">
                  <button
                     onClick={() => onDelete(item.ProductId)}
                     className="btn btn-light"
                  >
                     {" "}
                     삭제
                  </button>
               </td>
            </tr>
         </>
      );
   };
   return (
      <div className="card">
         {cartList.length === 0 ? (
            <Alert severity="info">아직 장바구니에 넣은 상품이 없습니다!</Alert>
         ) : (
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
               <tbody>{cartList.map((item, idx) => getItem(item, idx))}</tbody>
            </table>
         )}
         <div className="card-body border-top">
            <button
               onClick={onClickCheckout}
               className="btn btn-primary float-md-right"
            >
               {" "}
               구매하기 <i className="fa fa-chevron-right"></i>{" "}
            </button>
            <button onClick={() => history.goBack()} className="btn btn-light">
               {" "}
               <i className="fa fa-chevron-left"></i> 뒤로가기{" "}
            </button>
         </div>
         <Modal open={loading}>
            <CircularProgress color="secondary" className={classes.loading} />
         </Modal>
      </div>
   );
}
export default Table;
