import { useLocation } from "react-router";
import { CategoryMappingById } from "../../utils/CategoryMapping";
import Detail from "./Detail";
import DetailHeader from "./DetailHeader";
import Review from "./Review";

function ProductDetail() {
   const location = useLocation();
   return (
      <div>
         <section className="section-content padding-y bg">
            <div className="container">
               <h3>
                  카테고리 : {CategoryMappingById[location.state.CategoryId]}
               </h3>
               <DetailHeader product={location.state} />
               <Detail detail={location.state.detail} />
               <Review />
            </div>
         </section>
      </div>
   );
}

export default ProductDetail;
