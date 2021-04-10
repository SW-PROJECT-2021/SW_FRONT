import { useCallback } from "react";
import { logout } from "../../stores/actions/actions";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const LogoutButton = styled.button`
  border: 0;
  background-color: white;
  margin: 0;
  &:hover {
    cursor: pointer;
    color: #3167eb;
  }
`;

const User = () => {
  console.log(useSelector((state) => state.LoginReducer.users));
  const dispatch = useDispatch();
  const { userName, isLogined } = useSelector(
    (state) => state.LoginReducer.users
  );

  const onLogOutHandler = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(logout());
    },
    [isLogined]
  );
  return (
    <div className="col-lg-4">
      <div className="widgets-wrap float-right">
        <div className="widget-header  mr-3">
          <a href="/#/cart" className="icon icon-sm rounded-circle border">
            <i className="fa fa-shopping-cart"></i>
          </a>
          <span className="badge badge-pill badge-danger notify">0</span>
        </div>
        {isLogined && (
          <>
            <div className="widget-header  mr-3">
              <a href="/" className="icon icon-sm rounded-circle border">
                <i className="fa fa-user"></i>
              </a>
            </div>
          </>
        )}
        <div className="widget-header icontext">
          <div className="text">
            {" "}
            {isLogined && (
              <div className="text-muted">{userName}님, 환영합니다.</div>
            )}
            <div>
              {isLogined ? (
                <LogoutButton type="submit" onClick={onLogOutHandler}>
                  로그아웃
                </LogoutButton>
              ) : (
                <>
                  <Link to="/login">로그인</Link> |{" "}
                  <Link to="/signup">회원가입</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
