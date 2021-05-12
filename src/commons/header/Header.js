import { useEffect, useState } from "react";
import Navigator from "./Navigator";
import Search from "./Search";
import User from "./User";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { updateCart } from "../../stores/actions/actions";

const UserDiv = styled.div`
  flex: auto;
`;

const Header = () => {
  const [lessThan992, setLessThan992] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const mediase = window.matchMedia("(max-width: 992px)");

    const handle = () => {
      if (mediase.matches) {
        setLessThan992(true);
      } else {
        setLessThan992(false);
      }
    };

    dispatch(updateCart());

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
