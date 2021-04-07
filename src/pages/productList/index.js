import React from "react";
import List from "./List";
import Filter from "./Filter";
import Title from "./Title";
function ProductList() {
   return (
      <div>
         <Title />

         <section className="section-content padding-y">
            <div className="container">
               <div className="row">
                  <Filter />
                  <List />
               </div>
            </div>
         </section>
      </div>
   );
}
export default ProductList;
