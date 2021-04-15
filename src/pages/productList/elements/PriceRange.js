import React, { useState } from "react";

function PriceRange({ list, setList }) {
   const [min, setMin] = useState(0);
   const [max, setMax] = useState(5000000);

   const onChangeMin = (e) => {
      setMin(e.target.value);
   };
   const onChangeMax = (e) => {
      setMax(e.target.value);
   };
   const onClickMinMax = (e) => {
      e.preventDefault();
      setList((prev) =>
         prev.filter((item) => item.price >= min && item.price <= max)
      );
   };
   return (
      <div>
         <article className="filter-group">
            <header className="card-header">
               <a
                  href="/"
                  data-toggle="collapse"
                  data-target="#collapse_3"
                  aria-expanded="true"
                  className=""
               >
                  <i className="icon-control fa fa-chevron-down"></i>
                  <h6 className="title">가격</h6>
               </a>
            </header>
            <div className="filter-content collapse show" id="collapse_3">
               <div className="card-body">
                  <input
                     type="range"
                     className="custom-range"
                     min="0"
                     max="5000000"
                     name=""
                  />
                  <div className="form-row">
                     <div className="form-group col-md-6">
                        <label>0원</label>
                        <input
                           className="form-control"
                           placeholder="0"
                           type="number"
                           value={min}
                           onChange={onChangeMin}
                        />
                     </div>
                     <div className="form-group text-right col-md-6">
                        <label>500만원</label>
                        <input
                           className="form-control"
                           placeholder="500만원"
                           type="number"
                           value={max}
                           onChange={onChangeMax}
                        />
                     </div>
                  </div>
                  <button
                     className="btn btn-block btn-primary"
                     onClick={onClickMinMax}
                  >
                     적용
                  </button>
               </div>
            </div>
         </article>
      </div>
   );
}
export default PriceRange;
