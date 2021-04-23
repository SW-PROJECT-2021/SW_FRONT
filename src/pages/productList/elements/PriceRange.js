import { Slider } from "@material-ui/core";
import React, { useState } from "react";

function PriceRange({ list, setList }) {
   const [min, setMin] = useState();
   const [max, setMax] = useState();
   const [range, setRange] = React.useState([20, 37]);

   const handleChange = (event, newRange) => {
      setRange(newRange);
      setMin(newRange[0] * 10000);
      setMax(newRange[1] * 10000);
   };
   const onChangeMin = (e) => {
      const {
         target: { value },
      } = e;
      if (!parseInt(value) || parseInt(value) >= 0) {
         setMin(value);
         setRange((prev) => [value / 10000, prev[1]]);
      }
   };
   const onChangeMax = (e) => {
      const {
         target: { value },
      } = e;
      if (!parseInt(value) || parseInt(value) <= 1000000) {
         setMax(value);
         setRange((prev) => [prev[0], value / 10000]);
      }
   };
   //다시 못되돌아옴
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
                  <Slider
                     value={range}
                     onChange={handleChange}
                     aria-labelledby="range-slider"
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
                        <label>100만원</label>
                        <input
                           className="form-control"
                           placeholder="100만원"
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
