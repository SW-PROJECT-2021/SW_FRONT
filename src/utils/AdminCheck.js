import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AdminCheckAction } from "../stores/actions/actions";

export default function Auth(SpecificComponent, option, adminRoute = null) {
  //option null -> 아무나 출입이 가능한 페이지
  // true -> 로그인 한 유저만 출입이 가능한 페이지
  // false -> 로그인한 유저는 출입이 불가능한 페이지

  function AuthenticationCheck() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { loading, data, error } = useSelector(
      (state) => state.UserReducer.admincheck
    );

    useEffect(() => {
      dispatch(AdminCheckAction());
    }, []);

    useEffect(() => {
      if (data || error) {
        if (error.data.status === 401) {
          console.log(error);
          alert("관리자만 접근 가능합니다.");
          history.push("/");
        } else {
          console.log(data);
          console.log(error);
          history.push("/admin");
        }
      }
    }, [data, error]);
    // useEffect(() => {
    //   dispatch(auth()).then((response) => {
    //     console.log(response);
    //     //로그인 하지 않은 상태
    //     if (!response.payload.isAuth) {
    //       if (option) {
    //         props.history.push("/login");
    //       }
    //     } else {
    //       //로그인 한 상태
    //       if (adminRoute && !response.payload.isAdmin) {
    //         props.history.push("/");
    //       } else {
    //         if (option === false) {
    //           props.history.push("/");
    //         }
    //       }
    //     }
    //   });
    // });
    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
