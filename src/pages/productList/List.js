import { makeStyles } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import React from "react";
import { useState } from "react";
import OrderList from "../../utils/OrderList";

const changeValue = (value) => {
   if (value === "younger") {
      return { orderBy: "updatedAt", cmp: "lower" };
   } else if (value === "older") {
      return { orderBy: "updatedAt", cmp: "greater" };
   } else if (value === "priceHigher") {
      return { orderBy: "price", cmp: "lower" };
   } else if (value === "priveLower") {
      return { orderBy: "price", cmp: "greater" };
   }
};

const useStyles = makeStyles((theme) => ({
   root: {
      "& > *": {
         marginTop: theme.spacing(2),
      },
   },
   align: {
      maxWidth: `${38 * 9}px`,
      margin: "0px auto",
   },
}));
function List({ list, setList }) {
   const classes = useStyles();
   const pageNum = Math.floor(list.length / 12 + 1);
   const [page, setPage] = useState(1);
   const onChange = (e) => {
      const {
         target: { value },
      } = e;
      if (value === "dummy") return;
      setList((prev) => OrderList(prev, changeValue(value)));
   };
   const onChangePage = (e, page) => {
      setPage(page);
   };
   return (
      <main className="col-md-12">
         <header className="border-bottom mb-4 pb-3">
            <div className="form-inline">
               <span className="mr-md-auto">
                  {list.length} 항목이 있습니다.
               </span>
               <select onChange={onChange} className="mr-2 form-control">
                  <option value="dummy">정렬</option>
                  <option value="younger">최신 순</option>
                  <option value="older">오래된 순</option>
                  <option value="priceHigher">가격 높은 순</option>
                  <option value="priveLower">가격 낮은 순</option>
               </select>
            </div>
         </header>
         <div className="row">
            {list.slice((page - 1) * 12, page * 12).map((item, idx) => {
               return (
                  <div key={idx} className="col-md-3">
                     <figure className="card card-product-grid">
                        <div className="img-wrap">
                           <img src={item.img} alt="error" />
                           <a className="btn-overlay" href="/">
                              <i className="fa fa-search-plus"></i> Quick view
                           </a>
                        </div>
                        <figcaption className="info-wrap">
                           <div className="fix-height">
                              <a href="/" className="title">
                                 {item.name}
                              </a>
                              <div className="price-wrap mt-2">
                                 <span className="price">{item.price}</span>
                              </div>
                           </div>
                        </figcaption>
                     </figure>
                  </div>
               );
            })}
         </div>
         <div className={classes.root}>
            <div
               className={classes.align}
               style={{ width: `${38 * (pageNum + 2)}px` }}
            >
               <Pagination
                  count={pageNum}
                  shape="rounded"
                  className={classes.ul}
                  onChange={onChangePage}
               />
            </div>
         </div>
      </main>
   );
}
export default List;

/*할인 된 거 일때

가격 밑에 이거 추가

   <del className="price-old">$1980</del>


   
   새로운 아이템일 경우  
    <div className="img-wrap"> 밑에

   <span className="badge badge-danger"> NEW </span>
   이거 추가
*/
