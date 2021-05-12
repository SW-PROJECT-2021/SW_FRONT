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
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.UserReducer.users);
  const { cartLength } = useSelector((state) => state.CartReducer.length);

  const onLogOutHandler = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(logout());
    },
    [dispatch]
  );
  return (
    <div className="col-lg-3">
      <div className="widgets-wrap float-right">
        {data && (
          <>
           <div className="widget-header  mr-3">
          <a href="/cart" className="icon icon-sm rounded-circle border">
            <i className="fa fa-shopping-cart"></i>
          </a>
          <span className="badge badge-pill badge-danger notify">
            {" "}
            {cartLength || 0}
          </span>
          </div>
            <div className="widget-header  mr-3">
              <a href="/user" className="icon icon-sm rounded-circle border">
                <i className="fa fa-user"></i>
              </a>
            </div>
          </>
        )}
        <div className="widget-header icontext">
          <div className="text">
            {" "}
            {data && (
              <div className="text-muted">{data.loginId}님, 환영합니다.</div>
            )}
            {data ? (
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
  );
};

export default User;
