import { useLocation } from "react-router";
import Detail from "./Detail";
import DetailHeader from "./DetailHeader";

function ProductDetail() {
   const location = useLocation();
   return (
      <div>
         <section class="section-content padding-y bg">
            <div class="container">
               <DetailHeader product={location.state} />
               <Detail detail={location.state.detail} />
            </div>
         </section>
      </div>
   );
}

export default ProductDetail;
