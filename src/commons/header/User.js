import { connect } from "react-redux";
import { logout } from "../../stores/actions/actions";
import styled from "styled-components";

const LogoutButton = styled.span`
   &:hover {
      cursor: pointer;
      color: #3167eb;
   }
`;

const User = ({ isLogined, onLogout }) => {
   return (
      <div className="col-lg-4">
         <div className="widgets-wrap float-right">
            <div className="widget-header  mr-3">
               <a href="/cart" className="icon icon-sm rounded-circle border">
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
                     <div className="text-muted">님, 환영합니다.</div>
                  )}
                  <div>
                     {isLogined ? (
                        <LogoutButton onClick={() => onLogout()}>
                           로그아웃
                        </LogoutButton>
                     ) : (
                        <>
                           <a href="/">로그인</a> | <a href="/">회원가입</a>
                        </>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

const mapStateToProps = (state) => {
   return {
      isLogined: state.LoginReducer.isLogined,
   };
};
const mapDispatchToProps = (dispatch) => {
   return {
      onLogout: () => dispatch(logout()),
   };
};
export default connect(mapStateToProps, mapDispatchToProps)(User);
