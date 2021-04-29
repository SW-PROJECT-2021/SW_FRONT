import React from "react";

function Detail({ detail }) {
   return (
      <article class="card mt-5">
         <div class="card-body">
            <p>{detail}</p>
         </div>
      </article>
   );
}
export default Detail;
