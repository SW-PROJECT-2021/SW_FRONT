import { CircularProgress, makeStyles, Modal } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import DetailSearch from "./elements/DetailSearch";

const useStyles = makeStyles(() => ({
   loading: {
      position: "absolute",
      top: "47%",
      left: "47%",
   },
}));

const Search = () => {
   const [search, setSearch] = useState("");
   const [price, setPrice] = useState({
      min: null,
      max: null,
   });
   const history = useHistory();
   const [anchorEl, setAnchorEl] = useState(null);
   const [category, setCategory] = useState(null);
   const classes = useStyles();
   const [loading, setLoading] = useState(false);

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
   const onSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      //여기서 검색하고 받아서 넘기기
      let priceRange = {
         min: price.min,
         max: price.max,
      };
      if (price.min && price.max && price.min > price.max) {
         priceRange.min = price.max;
         priceRange.max = price.min;
      }
      const searchQuery = `title=${search}&category=${
         category || ""
      }&minPrice=${priceRange.min || ""}&maxPrice=${priceRange.max || ""}`;
      await axios
         .get(`/api/product/search/detail?${searchQuery}`)
         .then((res) => {
            setLoading(false);
            history.push({
               pathname: "/list",
               state: { data: res.data.data, keyword: search },
            });
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

         <Modal open={loading}>
            <CircularProgress color="secondary" className={classes.loading} />
         </Modal>
      </div>
   );
};

export default Search;
