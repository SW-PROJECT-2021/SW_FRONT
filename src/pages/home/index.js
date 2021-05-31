import React, { useEffect } from "react";
import Banner from "./Banner";
import RecentProduct from "./RecentProduct";
import { AdminCheckClaer } from "../../stores/actions/actions";
import { useDispatch } from "react-redux";
import PopularProduct from "./PopularProduct";
function Home() {
   const dipatch = useDispatch();
   useEffect(() => {
      dipatch(AdminCheckClaer());
   }, []);
   return (
      <div>
         <Banner />
         <PopularProduct />
         <RecentProduct />
      </div>
   );
}
export default Home;
