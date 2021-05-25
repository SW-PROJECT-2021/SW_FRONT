import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import OrderList from "../../utils/OrderList";

const RecentProduct = () => {
   const [list, setList] = useState([]);
   const history = useHistory();
   useEffect(() => {
      const getList = async () => {
         await axios
            .get(`/api/product/`)
            .then((res) => {
               setList(
                  OrderList(
                     res.data.data.filter(
                        (item) => !item.isDeleted && item.count !== 0
                     ),
                     { orderBy: "updatedAt", cmp: "less" }
                  ).slice(0, 4)
               );
            })
            .catch((error) => {
               console.log(error);
            });
      };
      getList();
   }, []);

   const goDetail = (item) => {
      history.push({ pathname: "/detail", state: item });
   };
   return (
      <section className="section-name padding-y-sm">
         <div className="container">
            <header className="section-heading">
               <a
                  href="/list?range=전체보기"
                  className="btn btn-outline-primary float-right">
                  전체보기
               </a>
               <h3 className="section-title">최신 상품</h3>
            </header>

            <div className="row">
               {list.map((item, idx) => {
                  return (
                     <div
                        className="col-md-3"
                        key={idx}
                        onClick={() => goDetail(item)}>
                        <div className="card card-product-grid">
                           <span className="img-wrap">
                              <img src={item.img1} alt="img" />{" "}
                           </span>
                           <figcaption className="info-wrap">
                              {item.name}
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
