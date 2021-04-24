import React from "react";

function Table() {
   return (
      <div className="card">
         <table className="table table-borderless table-shopping-cart">
            <thead className="text-muted">
               <tr className="small text-uppercase">
                  <th scope="col">상품</th>
                  <th scope="col" width="120">
                     수량
                  </th>
                  <th scope="col" width="120">
                     가격
                  </th>
                  <th scope="col" className="text-right" width="200">
                     {" "}
                  </th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>
                     <figure className="itemside">
                        <div className="aside">
                           <img
                              src="assets/images/items/1.jpg"
                              className="img-sm"
                              alt="error"
                           />
                        </div>
                        <figcaption className="info">
                           <a href="/" className="title text-dark">
                              Some name of item goes here nice
                           </a>
                           <p className="text-muted small">
                              Size: XL, Color: blue, <br /> Brand: Gucci
                           </p>
                        </figcaption>
                     </figure>
                  </td>
                  <td>
                     <select className="form-control">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                     </select>
                  </td>
                  <td>
                     <div className="price-wrap">
                        <var className="price">$1156.00</var>
                        <small className="text-muted"> $315.20 each </small>
                     </div>
                  </td>
                  <td className="text-right">
                     <a href="/" className="btn btn-light">
                        {" "}
                        Remove
                     </a>
                  </td>
               </tr>
               <tr>
                  <td>
                     <figure className="itemside">
                        <div className="aside">
                           <img
                              src="assets/images/items/2.jpg"
                              className="img-sm"
                              alt="error"
                           />
                        </div>
                        <figcaption className="info">
                           <a href="/" className="title text-dark">
                              Product name goes here nice
                           </a>
                           <p className="text-muted small">
                              Size: XL, Color: blue, <br /> Brand: Gucci
                           </p>
                        </figcaption>
                     </figure>
                  </td>
                  <td>
                     <select className="form-control">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                     </select>
                  </td>
                  <td>
                     <div className="price-wrap">
                        <var className="price">$149.97</var>
                        <small className="text-muted"> $75.00 each </small>
                     </div>
                  </td>
                  <td className="text-right">
                     <a href="/" className="btn btn-light btn-round">
                        {" "}
                        Remove
                     </a>
                  </td>
               </tr>
               <tr>
                  <td>
                     <figure className="itemside">
                        <div className="aside">
                           <img
                              src="assets/images/items/3.jpg"
                              className="img-sm"
                              alt="error"
                           />
                        </div>
                        <figcaption className="info">
                           <a href="/" className="title text-dark">
                              Another name of some product goes just here
                           </a>
                           <p className="small text-muted">
                              Size: XL, Color: blue, Brand: Tissot
                           </p>
                        </figcaption>
                     </figure>
                  </td>
                  <td>
                     <select className="form-control">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                     </select>
                  </td>
                  <td>
                     <div className="price-wrap">
                        <var className="price">$98.00</var>
                        <small className="text-muted"> $578.00 each</small>
                     </div>
                  </td>
                  <td className="text-right">
                     <a href="/" className="btn btn-light btn-round">
                        {" "}
                        Remove
                     </a>
                  </td>
               </tr>
            </tbody>
         </table>

         <div className="card-body border-top">
            <a href="/" className="btn btn-primary float-md-right">
               {" "}
               Make Purchase <i className="fa fa-chevron-right"></i>{" "}
            </a>
            <a href="/" className="btn btn-light">
               {" "}
               <i className="fa fa-chevron-left"></i> Continue shopping{" "}
            </a>
         </div>
      </div>
   );
}
export default Table;
