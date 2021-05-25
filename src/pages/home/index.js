import React, { useEffect } from "react";
import Banner from "./Banner";
import RecentProduct from "./RecentProduct";
import { AdminCheckClaer } from "../../stores/actions/actions";
import { useDispatch } from "react-redux";
function Home() {
  const dipatch = useDispatch();
  useEffect(() => {
    dipatch(AdminCheckClaer());
  }, []);
  return (
    <div>
      <Banner />
      <RecentProduct />
    </div>
  );
}
export default Home;
