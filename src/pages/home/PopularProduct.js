const list = [
   {
      src: "assets/images/items/1.jpg",
      name: "상품이름",
      price: "1,700,000",
   },
   {
      src: "assets/images/items/2.jpg",
      name: "상품이름",
      price: "1,700,000",
   },
   {
      src: "assets/images/items/3.jpg",
      name: "상품이름",
      price: "1,700,000",
   },
   {
      src: "assets/images/items/4.jpg",
      name: "상품이름",
      price: "1,700,000",
   },
   {
      src: "assets/images/items/5.jpg",
      name: "상품이름",
      price: "1,700,000",
   },
   {
      src: "assets/images/items/6.jpg",
      name: "상품이름",
      price: "1,700,000",
   },
   {
      src: "assets/images/items/7.jpg",
      name: "상품이름",
      price: "1,700,000",
   },
   {
      src: "assets/images/items/9.jpg",
      name: "상품이름",
      price: "1,700,000",
   },
];

const PopularProduct = () => {
   return (
      <section className="section-name padding-y-sm">
         <div className="container">
            <header className="section-heading">
               <a href="/" className="btn btn-outline-primary float-right">
                  전체보기
               </a>
               <h3 className="section-title">인기 상품</h3>
            </header>

            <div className="row">
               {list.map((item, idx) => {
                  return (
                     <div className="col-md-3" key={idx}>
                        <div href="/" className="card card-product-grid">
                           <a href="/" className="img-wrap">
                              {" "}
                              <img src={item.src} alt="img" />{" "}
                           </a>
                           <figcaption className="info-wrap">
                              <a href="/" className="title">
                                 {item.name}
                              </a>
                              <div className="price mt-1">{item.price}</div>
                           </figcaption>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </section>
   );
};

export default PopularProduct;
