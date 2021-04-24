import React from "react";
import Banner from "./Banner";
import RecentProduct from "./RecentProduct";

function Home() {
   const openPopup = () => {
      window.open(
         "/address",
         "shipment",
         "top=10, left=10, width=500, height=600"
      );
   };
   return (
      <div>
         <Banner />
         <button onClick={openPopup}>문열어</button>
         <RecentProduct />
      </div>
   );
}
export default Home;
