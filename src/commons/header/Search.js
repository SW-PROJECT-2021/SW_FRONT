import { useState } from "react";
import { useHistory } from "react-router-dom";

const Search = () => {
   const [search, setSearch] = useState("");
   const history = useHistory();
   const onChange = (e) => {
      setSearch(e.target.value);
   };
   const onSubmit = (e) => {
      e.preventDefault();
      history.push({ pathname: "/list", state: { search: search.split(" ") } });
   };

   return (
      <div className="col-lg-6 col-sm-12">
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
            </div>
         </form>
      </div>
   );
};

export default Search;
