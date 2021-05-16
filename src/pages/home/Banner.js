import axios from "axios";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
   const [bannerList, setBannerList] = useState([]);
   useEffect(() => {
      const getBanners = async () => {
         await axios
            .get(`${process.env.REACT_APP_API_BASEURL}/api/banner/available`)
            .then((res) => {
               setBannerList(res.data.data);
            });
      };
      getBanners();
   }, []);
   return (
      <section className="section-main container">
         <Carousel
            showStatus={false}
            showThumbs={false}
            dynamicHeight
            infiniteLoop
            autoPlay
            style={styles}
         >
            {bannerList.map((item, idx) => {
               return (
                  <div key={idx} style={{ backgroundColor: "#f8f9fa" }}>
                     <img
                        src={item.bannerImg}
                        style={{ maxHeight: "400px", width: "auto" }}
                        alt="error"
                     />
                  </div>
               );
            })}
         </Carousel>
      </section>
   );
};

export default Banner;
