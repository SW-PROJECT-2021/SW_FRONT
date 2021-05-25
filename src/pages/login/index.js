import React, { useCallback, useState, useEffect } from "react";
import AuthTemplate from "../template/AuthTemplate";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logined } from "../../stores/actions/actions";

const NewAccountBlcok = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 15px;
  p {
    display: inline-block;
    margin: 0;
    font-size: 16px;
    font-family: NanumSquareBold;
  }
  a {
    color: rgb(65, 190, 239);
  }
  @media screen and (max-width: 450px) {
    p {
      font-size: 14px;
    }
  }
`;
const Form = styled.form`
  button {
    background-color: rgb(62, 149, 239);
    color: white;
    margin-top: 10px;
  }
  button:hover {
    background-color: rgb(20, 149, 239);
  }
  div {
    display: flex;
    justify-content: space-between;
  }
  div input {
    width: 100%;
  }
  div button {
    width: 200px;
    margin: 20px 0px 20px 10px;
    padding: 0;
  }
  img {
    width: 50%;
    margin-bottom: 10px;
    cursor: pointer;
  }
`;
function Login(props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  //const { Kakao } = window;

  const { data, error } = useSelector((state) => state.UserReducer.users);

  const onIdHandler = useCallback(
    (e) => {
      setId(e.target.value);
    },
    [id]
  );
  const onPasswordHandler = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [password]
  );

  const onSubmitHandler = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        //dispatch.
        let body = {
          id: id,
          password: password,
        };
        //
        dispatch(logined(body));
      } catch (e) {
        console.error(e);
      }
    },
    [password, id]
  );

  useEffect(() => {
    console.log(data);
    if (error === undefined) {
      alert("패스워드가 틀렸습니다.");
    } else {
      if (data) {
        if (data.isAdmin) {
          console.log(data.isAdmin);
          alert("관리자님 환영합니다.");
          history.push("/admin");
        } else {
          console.log(data.isAdmin);
          alert(`${data.loginId}님 환영합니다.`);
          history.push("/");
        }
      }
    }
  }, [data, error]);

  /* 카카오 Oauth
  const KakaoLogin = useCallback((e) => {
    Kakao.Auth.login({
      success: (response) => {
        console.log(response);

        axios({
          method: "get",
          url: "/oauth/kakao",
          headers: {
            "Content-Type": "application/json",
            Authorization: response.access_token,
          },
        }).then((res) => {
          console.log(res);
          //localStorage.setItem("Set-Cookie", res.data.token);
          alert("로그인 되었습니다.");
          props.history.push("/");
        });
      },
      fail: (error) => {
        alert(JSON.stringify(error));
      },
    });
  });
 */

  return (
    <AuthTemplate>
      <Form onSubmit={onSubmitHandler}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="id"
          label="Id"
          name="id"
          autoComplete="id"
          autoFocus
          value={id}
          onChange={onIdHandler}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          autoComplete="password"
          autoFocus
          value={password}
          onChange={onPasswordHandler}
        />
        <Button type="submit" fullWidth variant="contained">
          로그인
        </Button>
        <NewAccountBlcok>
          <p>계정이 없으신가요? </p>
          <p>
            <Link to="/signup">가입하기</Link>
          </p>
        </NewAccountBlcok>
        <img src="assets/images/logos/kakao_login.png" onClick={""} />
      </Form>
    </AuthTemplate>
  );
}
export default Login;
