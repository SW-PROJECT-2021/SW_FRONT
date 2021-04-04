import { Carousel } from "react-responsive-carousel";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
   return (
      <section class="section-main container">
         <Carousel
            showStatus={false}
            showThumbs={false}
            dynamicHeight
            infiniteLoop
            autoPlay
         >
            <div>
               <img src="assets/images/banners/1.png" alt="error" />
            </div>
            <div>
               <img src="assets/images/banners/2.png" alt="error" />
            </div>
            <div>
               <img src="assets/images/banners/3.png" alt="error" />
            </div>
            <div>
               <img src="assets/images/banners/4.png" alt="error" />
            </div>
         </Carousel>
      </section>
   );
};

export default Banner;
