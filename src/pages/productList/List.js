import React from "react";

function List() {
   return (
      <main className="col-md-9">
         <header className="border-bottom mb-4 pb-3">
            <div className="form-inline">
               <span className="mr-md-auto">32 Items found </span>
               <select className="mr-2 form-control">
                  <option>Latest items</option>
                  <option>Trending</option>
                  <option>Most Popular</option>
                  <option>Cheapest</option>
               </select>
               <div className="btn-group">
                  <a
                     href="/"
                     className="btn btn-outline-secondary"
                     data-toggle="tooltip"
                     title="List view"
                  >
                     <i className="fa fa-bars"></i>
                  </a>
                  <a
                     href="/"
                     className="btn  btn-outline-secondary active"
                     data-toggle="tooltip"
                     title="Grid view"
                  >
                     <i className="fa fa-th"></i>
                  </a>
               </div>
            </div>
         </header>
         <div className="row">
            <div className="col-md-4">
               <figure className="card card-product-grid">
                  <div className="img-wrap">
                     <span className="badge badge-danger"> NEW </span>
                     <img src="assets/images/items/1.jpg" alt="error" />
                     <a className="btn-overlay" href="/">
                        <i className="fa fa-search-plus"></i> Quick view
                     </a>
                  </div>
                  <figcaption className="info-wrap">
                     <div className="fix-height">
                        <a href="/" className="title">
                           Great item name goes here
                        </a>
                        <div className="price-wrap mt-2">
                           <span className="price">$1280</span>
                           <del className="price-old">$1980</del>
                        </div>
                     </div>
                     <a href="/" className="btn btn-block btn-primary">
                        Add to cart{" "}
                     </a>
                  </figcaption>
               </figure>
            </div>
            <div className="col-md-4">
               <figure className="card card-product-grid">
                  <div className="img-wrap">
                     <img src="assets/images/items/2.jpg" alt="error" />
                     <a className="btn-overlay" href="/">
                        <i className="fa fa-search-plus"></i> Quick view
                     </a>
                  </div>
                  <figcaption className="info-wrap">
                     <div className="fix-height">
                        <a href="/" className="title">
                           Product name goes here just for demo item
                        </a>
                        <div className="price-wrap mt-2">
                           <span className="price">$1280</span>
                        </div>
                     </div>
                     <a href="/" className="btn btn-block btn-primary">
                        Add to cart{" "}
                     </a>
                  </figcaption>
               </figure>
            </div>
            <div className="col-md-4">
               <figure className="card card-product-grid">
                  <div className="img-wrap">
                     <img src="assets/images/items/3.jpg" alt="error" />
                     <a className="btn-overlay" href="/">
                        <i className="fa fa-search-plus"></i> Quick view
                     </a>
                  </div>
                  <figcaption className="info-wrap">
                     <div className="fix-height">
                        <a href="/" className="title">
                           Product name goes here just for demo item
                        </a>
                        <div className="price-wrap mt-2">
                           <span className="price">$1280</span>
                        </div>
                     </div>
                     <a href="/" className="btn btn-block btn-primary">
                        Add to cart{" "}
                     </a>
                  </figcaption>
               </figure>
            </div>
            <div className="col-md-4">
               <figure className="card card-product-grid">
                  <div className="img-wrap">
                     <img src="assets/images/items/4.jpg" alt="error" />
                     <a className="btn-overlay" href="/">
                        <i className="fa fa-search-plus"></i> Quick view
                     </a>
                  </div>
                  <figcaption className="info-wrap">
                     <div className="fix-height">
                        <a href="/" className="title">
                           Product name goes here just for demo item
                        </a>
                        <div className="price-wrap mt-2">
                           <span className="price">$1280</span>
                        </div>
                     </div>
                     <a href="/" className="btn btn-block btn-primary">
                        Add to cart{" "}
                     </a>
                  </figcaption>
               </figure>
            </div>
            <div className="col-md-4">
               <figure className="card card-product-grid">
                  <div className="img-wrap">
                     <img src="assets/images/items/5.jpg" alt="error" />
                     <a className="btn-overlay" href="/">
                        <i className="fa fa-search-plus"></i> Quick view
                     </a>
                  </div>
                  <figcaption className="info-wrap">
                     <div className="fix-height">
                        <a href="/" className="title">
                           Product name goes here just for demo item
                        </a>
                        <div className="price-wrap mt-2">
                           <span className="price">$1280</span>
                        </div>
                     </div>
                     <a href="/" className="btn btn-block btn-primary">
                        Add to cart{" "}
                     </a>
                  </figcaption>
               </figure>
            </div>
            <div className="col-md-4">
               <figure className="card card-product-grid">
                  <div className="img-wrap">
                     <img src="assets/images/items/6.jpg" alt="error" />
                     <a className="btn-overlay" href="/">
                        <i className="fa fa-search-plus"></i> Quick view
                     </a>
                  </div>
                  <figcaption className="info-wrap">
                     <div className="fix-height">
                        <a href="/" className="title">
                           Product name goes here just for demo item
                        </a>
                        <div className="price-wrap mt-2">
                           <span className="price">$1280</span>
                        </div>
                     </div>
                     <a href="/" className="btn btn-block btn-primary">
                        Add to cart{" "}
                     </a>
                  </figcaption>
               </figure>
            </div>
            <div className="col-md-4">
               <figure className="card card-product-grid">
                  <div className="img-wrap">
                     <img src="assets/images/items/7.jpg" alt="error" />
                     <a className="btn-overlay" href="/">
                        <i className="fa fa-search-plus"></i> Quick view
                     </a>
                  </div>
                  <figcaption className="info-wrap">
                     <div className="fix-height">
                        <a href="/" className="title">
                           Product name goes here just for demo item
                        </a>
                        <div className="price-wrap mt-2">
                           <span className="price">$1280</span>
                        </div>
                     </div>
                     <a href="/" className="btn btn-block btn-primary">
                        Add to cart{" "}
                     </a>
                  </figcaption>
               </figure>
            </div>
            <div className="col-md-4">
               <figure className="card card-product-grid">
                  <div className="img-wrap">
                     <img src="assets/images/items/1.jpg" alt="error" />
                     <a className="btn-overlay" href="/">
                        <i className="fa fa-search-plus"></i> Quick view
                     </a>
                  </div>
                  <figcaption className="info-wrap">
                     <div className="fix-height">
                        <a href="/" className="title">
                           Product name goes here just for demo item
                        </a>
                        <div className="price-wrap mt-2">
                           <span className="price">$1280</span>
                        </div>
                     </div>
                     <a href="/" className="btn btn-block btn-primary">
                        Add to cart{" "}
                     </a>
                  </figcaption>
               </figure>
            </div>
         </div>
         <nav className="mt-4" aria-label="Page navigation sample">
            <ul className="pagination">
               <li className="page-item disabled">
                  <a className="page-link" href="/">
                     Previous
                  </a>
               </li>
               <li className="page-item active">
                  <a className="page-link" href="/">
                     1
                  </a>
               </li>
               <li className="page-item">
                  <a className="page-link" href="/">
                     2
                  </a>
               </li>
               <li className="page-item">
                  <a className="page-link" href="/">
                     3
                  </a>
               </li>
               <li className="page-item">
                  <a className="page-link" href="/">
                     Next
                  </a>
               </li>
            </ul>
         </nav>
      </main>
   );
}
export default List;
