import { useEffect, useState } from "react";
import Navigator from "./Navigator";
import Search from "./Search";
import User from "./User";
import styled from "styled-components";

const UserDiv = styled.div`
   flex: auto;
`;

const Header = () => {
   const [lessThan992, setLessThan992] = useState(false);
   useEffect(() => {
      const mediase = window.matchMedia("(max-width: 992px)");

      const handle = () => {
         if (mediase.matches) {
            setLessThan992(true);
         } else {
            setLessThan992(false);
         }
      };

      mediase.addEventListener("change", handle);

      handle();
      return () => {
         mediase.removeEventListener("change", handle);
      };
   }, []);
   return (
      <header className="section-header">
         <section className="header-main border-bottom">
            <div className="container">
               <div className="row align-items-center">
                  {lessThan992 ? (
                     <>
                        <div className="col-lg-2 col-4">
                           <a href="/">
                              <img
                                 src="assets/images/logos/logo5.png"
                                 className="w-100 rounded"
                                 alt="img"
                              />
                           </a>
                        </div>
                        <UserDiv>
                           <User />
                        </UserDiv>
                        <Search />
                     </>
                  ) : (
                     <>
                        <div className="col-lg-2 col-4">
                           <a href="/">
                              <img
                                 src="assets/images/logos/logo5.png"
                                 className="w-100 rounded"
                                 alt="img"
                              />
                           </a>
                        </div>
                        <Search /> <User />
                     </>
                  )}
               </div>
            </div>
         </section>
         <Navigator />
      </header>
   );
};

export default Header;
