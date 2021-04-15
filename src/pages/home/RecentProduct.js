import axios from "axios";
import { useEffect, useState } from "react";
import OrderList from "../../utils/OrderList";

const RecentProduct = () => {
   const [list, setList] = useState([]);
   useEffect(() => {
      const getList = async () => {
         await axios
            .get("http://15.164.20.183:3003/product")
            .then((res) => {
               setList(
                  OrderList(res.data.data, {
                     orderBy: "updatedAt",
                     cmp: "lower",
                  }).slice(0, 8)
               );
            })
            .catch((error) => {
               console.log(error);
            });
      };
      getList();
   }, []);

   return (
      <section className="section-name padding-y-sm">
         <div className="container">
            <header className="section-heading">
               <a href="/" className="btn btn-outline-primary float-right">
                  전체보기
               </a>
               <h3 className="section-title">최신 상품</h3>
            </header>

            <div className="row">
               {list.map((item, idx) => {
                  return (
                     <div className="col-md-3" key={idx}>
                        <div href="/" className="card card-product-grid">
                           <a href="/" className="img-wrap">
                              {" "}
                              <img src={item.img} alt="img" />{" "}
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

export default RecentProduct;
