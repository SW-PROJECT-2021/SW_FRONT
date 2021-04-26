import React from "react";
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

function List({ list, setList }) {
   const onChange = (e) => {
      const {
         target: { value },
      } = e;
      if (value === "dummy") return;
      setList((prev) => OrderList(prev, changeValue(value)));
   };
   return (
      <main className="col-md-9">
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
               <div className="btn-group">
                  <a
                     href="/"
                     className="btn btn-outline-secondary"
                     data-toggle="tooltip"
                     title="List view"
                  >
                     <i className="fa fa-bars"></i>
                  </a>
                  <a
                     href="/"
                     className="btn  btn-outline-secondary active"
                     data-toggle="tooltip"
                     title="Grid view"
                  >
                     <i className="fa fa-th"></i>
                  </a>
               </div>
            </div>
         </header>
         <div className="row">
            {list.map((item, idx) => {
               return (
                  <div key={idx} className="col-md-4">
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
                           <a href="/" className="btn btn-block btn-primary">
                              장바구니 추가{" "}
                           </a>
                        </figcaption>
                     </figure>
                  </div>
               );
            })}
         </div>
         <nav className="mt-4" aria-label="Page navigation sample">
            <ul className="pagination">
               <li className="page-item disabled">
                  <a className="page-link" href="/">
                     Previous
                  </a>
               </li>
               <li className="page-item active">
                  <a className="page-link" href="/">
                     1
                  </a>
               </li>
               <li className="page-item">
                  <a className="page-link" href="/">
                     2
                  </a>
               </li>
               <li className="page-item">
                  <a className="page-link" href="/">
                     3
                  </a>
               </li>
               <li className="page-item">
                  <a className="page-link" href="/">
                     Next
                  </a>
               </li>
            </ul>
         </nav>
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
