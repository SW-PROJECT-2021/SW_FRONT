import React from "react";
import { useLocation } from "react-router";
import qs from "qs";

function Title() {
   const location = useLocation();
   const query = qs.parse(location.search, {
      ignoreQueryPrefix: true,
   });
   return (
      <section className="section-pagetop bg">
         <div className="container">
            <h2 className="title-page">{query.range}</h2>
            <nav>
               <ol className="breadcrumb">
                  <li className="breadcrumb-item">{query.category}</li>
                  {query.category2 && (
                     <li className="breadcrumb-item">{query.category2}</li>
                  )}
               </ol>
            </nav>
         </div>
      </section>
   );
}
export default Title;
