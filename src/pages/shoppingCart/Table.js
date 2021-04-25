import {
   CircularProgress,
   makeStyles,
   Modal,
   NativeSelect,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { ThousandSeperator } from "../../utils/ThousandSeperator";

const useStyles = makeStyles(() => ({
   loading: {
      position: "absolute",
      top: "47%",
      left: "47%",
   },
}));

function Table({ cartList, setCartList }) {
   const history = useHistory();
   const [loading, setLoading] = useState(false);
   const classes = useStyles();
   //만약 양 더 필요해지면, lab -> autocomplte -> Controllable states 사용하기
   const onChangeQuantity = (e, id) => {
      //여기서 로딩 넣기
      setLoading(true);
      setCartList((prev) =>
         prev.map((item) => {
            if (item.id === id) {
               return { ...item, quantity: e.target.value };
            } else {
               return item;
            }
         })
      );
      setTimeout(() => setLoading(false), 2000);
   };
   const onDelete = (id) => {
      // 삭제 구현
   };

   const getItem = (item, idx) => {
      return (
         <tr key={idx}>
            <td>
               <figure className="itemside">
                  <div className="aside">
                     <img src={item.src} className="img-sm" alt="error" />
                  </div>
                  <figcaption className="info">
                     <a href="/" className="title text-dark">
                        {item.name}
                     </a>
                     <p className="text-muted small">{item.info}</p>
                  </figcaption>
               </figure>
            </td>
            <td>
               <NativeSelect
                  onChange={(e) => onChangeQuantity(e, item.id)}
                  value={item.quantity}
               >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
               </NativeSelect>
            </td>
            <td>
               <div className="price-wrap">
                  <var className="price">
                     {ThousandSeperator(item.quantity * item.price)}원
                  </var>
                  <small className="text-muted">
                     {" "}
                     개당 {ThousandSeperator(item.price)}원{" "}
                  </small>
               </div>
            </td>
            <td className="text-right">
               <button
                  onClick={() => onDelete(item.id)}
                  className="btn btn-light"
               >
                  {" "}
                  삭제
               </button>
            </td>
         </tr>
      );
   };
   return (
      <div className="card">
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

         <div className="card-body border-top">
            <a href="/" className="btn btn-primary float-md-right">
               {" "}
               Make Purchase <i className="fa fa-chevron-right"></i>{" "}
            </a>
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
