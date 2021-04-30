import React from "react";

function Detail({ detail }) {
   return (
      <article className="card mt-5">
         <div className="card-body">
            <p>{detail}</p>
         </div>
      </article>
   );
}
export default Detail;
