import axios from "axios";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  const [bannerList, setBannerList] = useState([]);
  useEffect(async () => {
    await axios.get("/banner/available").then((res) => {
      setBannerList(res.data.data);
    });
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
