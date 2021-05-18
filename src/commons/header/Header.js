import { useEffect, useState } from "react";
import Navigator from "./Navigator";
import Search from "./Search";
import User from "./User";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../../stores/actions/actions";

const UserDiv = styled.div`
   flex: auto;
`;

const Header = () => {
   const [lessThan992, setLessThan992] = useState(false);
   const dispatch = useDispatch();

   const { data } = useSelector((state) => state.UserReducer.users);
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
   }, [dispatch]);

   useEffect(() => {
      if (data) {
         dispatch(updateCart());
      }
   }, [dispatch, data]);

   return (
      <header className="section-header">
         <section className="header-main border-bottom">
            <div className="container">
               <div className="row align-items-center">
                  <div className="col-lg-2 col-3">
                     <a href="/">
                        <img
                           src="assets/images/logos/logo.jpg"
                           className="w-100 rounded"
                           alt="img"
                        />
                     </a>
                  </div>
                  {lessThan992 ? (
                     <>
                        <UserDiv>
                           <User />
                        </UserDiv>
                        <Search />
                     </>
                  ) : (
                     <>
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
