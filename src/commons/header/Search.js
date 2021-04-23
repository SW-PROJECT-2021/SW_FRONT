import { useState } from "react";
import { useHistory } from "react-router-dom";
import PriceRange from "./elements/PriceRange";

const Search = () => {
   const [search, setSearch] = useState("");
   const [min, setMin] = useState();
   const [max, setMax] = useState();
   const history = useHistory();

   const onChange = (e) => {
      setSearch(e.target.value);
   };
   const onChangeMin = (e) => {
      const {
         target: { value },
      } = e;
      if (!parseInt(value) || parseInt(value) >= 0) {
         setMin(value);
      }
   };
   const onChangeMax = (e) => {
      const {
         target: { value },
      } = e;
      if (!parseInt(value)) {
         setMax(value);
      }
   };
   const onSubmit = (e) => {
      e.preventDefault();
      history.push({ pathname: "/list", state: { search: search } });
   };

   return (
      <div className="col-lg-7 col-sm-12">
         <form onSubmit={onSubmit} className="search">
            <div className="input-group w-100">
               <input
                  onChange={onChange}
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  value={search}
               />
               <div className="input-group-append">
                  <button className="btn btn-primary" type="submit">
                     <i className="fa fa-search"></i>
                  </button>
               </div>
               <PriceRange
                  min={min}
                  max={max}
                  onChangeMin={onChangeMin}
                  onChangeMax={onChangeMax}
               />
            </div>
         </form>
      </div>
   );
};

export default Search;
