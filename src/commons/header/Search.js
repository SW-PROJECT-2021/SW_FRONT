import { useState } from "react";

const Search = () => {
   const [search, setSearch] = useState("");

   const onChange = (e) => {
      const {
         target: { value },
      } = e;
      setSearch(value);
   };
   const onSubmit = (e) => {
      e.preventDefault();
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
