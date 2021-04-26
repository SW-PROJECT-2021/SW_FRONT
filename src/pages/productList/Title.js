import React from "react";

function Title({ range, category, subcategory }) {
   return (
      <section className="section-pagetop bg">
         <div className="container">
            <h2 className="title-page">{range}</h2>
            <nav>
               <ol className="breadcrumb">
                  {category && <li className="breadcrumb-item">{category}</li>}
                  {subcategory && (
                     <li className="breadcrumb-item">{subcategory}</li>
                  )}
               </ol>
            </nav>
         </div>
      </section>
   );
}
export default Title;
