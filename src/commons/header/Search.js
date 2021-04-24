import { useState } from "react";
import { useHistory } from "react-router-dom";
import DetailSearch from "./elements/DetailSearch";

const Search = () => {
   const [search, setSearch] = useState("");
   const [price, setPrice] = useState({
      min: null,
      max: null,
   });
   const history = useHistory();
   const [anchorEl, setAnchorEl] = useState(null);
   const [category, setCategory] = useState(null);

   const onChange = (e) => {
      setSearch(e.target.value);
   };
   const onChangePrice = (e) => {
      if (e.type === "init") {
         setPrice({ min: null, max: null });
         return;
      }
      const {
         target: { value, name },
      } = e;
      if (!parseInt(value) || parseInt(value) >= 0) {
         if (name === "min") {
            setPrice((prev) => ({ ...prev, min: value }));
         } else {
            setPrice((prev) => ({ ...prev, max: value }));
         }
      }
   };
   const onSubmit = (e) => {
      e.preventDefault();
      const priceRange = {
         min: price.min ? price.min : 0,
         max: price.max ? price.max : 999999999,
      };
      history.push({
         pathname: "/list",
         state: { search: search, price: priceRange, category: category },
      });
      setSearch("");
      setPrice({ min: null, max: null });
      setAnchorEl(null);
      setCategory(null);
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
               <DetailSearch
                  price={price}
                  onChange={onChangePrice}
                  anchorEl={anchorEl}
                  setAnchorEl={setAnchorEl}
                  category={category}
                  setCategory={setCategory}
               />
            </div>
         </form>
      </div>
   );
};

export default Search;
