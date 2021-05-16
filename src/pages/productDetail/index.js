import { useLocation } from "react-router";
import Detail from "./Detail";
import DetailHeader from "./DetailHeader";
import Review from "./Review";

function ProductDetail() {
   const location = useLocation();
   return (
      <div>
         <section className="section-content padding-y bg">
            <div className="container">
               <DetailHeader product={location.state} />
               <Detail detail={location.state.detail} />
               <Review />
            </div>
         </section>
      </div>
   );
}

export default ProductDetail;
