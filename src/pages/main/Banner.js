const Banner = () => {
   return (
      <section class="section-main bg padding-y">
         <div class="container">
            <div class="row">
               <aside class="col-md-3">
                  <nav class="card">
                     <ul class="menu-category">
                        <li>
                           <a href="/">앗, 바벨! 신발보다 싸다</a>
                        </li>
                        <li>
                           <a href="/">어서와, 나사 헬스용품은 처음이지?</a>
                        </li>
                        <li>
                           <a href="/">김진대 교수님 사랑합니다.</a>
                        </li>
                        <li>
                           <a href="/">소프트웨어 공학 너무 좋아</a>
                        </li>
                        <li>
                           <a href="/">이 맛은 A+을 받는 맛이구나</a>
                        </li>
                        <li>
                           <a href="/">전부 무사전역 축하드립니다.</a>
                        </li>
                        <li>
                           <a href="/">더이상 자세한 설명은 생략한다</a>
                        </li>
                     </ul>
                  </nav>
               </aside>
               <div class="col-md-9">
                  <article class="banner-wrap">
                     <img
                        src="assets/images/2.jpg"
                        class="w-100 rounded"
                        alt="img"
                     />
                  </article>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Banner;
