import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { CategoryMappingById } from "../../utils/CategoryMapping";
import Detail from "./Detail";
import DetailHeader from "./DetailHeader";
import Review from "./Review";

function ProductDetail() {
   const location = useLocation();
   const [product, setProduct] = useState({ reviews: [] });
   useEffect(() => {
      const getItem = async () => {
         await axios
            .get(`/api/product/select/${location.state.id}`)
            .then((res) => {
               setProduct(res.data.data);
            });
      };
      getItem();
   }, [location]);

   return (
      <div>
         <section className="section-content padding-y bg">
            <div className="container">
               <h3>
                  카테고리 : {CategoryMappingById[location.state.CategoryId]}
               </h3>
               <DetailHeader
                  product={location.state}
                  reviews={product.reviews}
               />
               <Detail detail={location.state.detail} />
               <Review reviews={product.reviews} />
            </div>
         </section>
      </div>
   );
}

export default ProductDetail;
