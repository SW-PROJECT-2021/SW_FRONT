import React, { useCallback, useState } from "react";
import AuthTemplate from "../template/AuthTemplate";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { Link } from "react-router-dom";
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
`;
function Login(props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { isLogined, isAdmin } = useSelector(
    (state) => state.LoginReducer.users
  );
  console.log(isLogined);
  console.log(isAdmin);
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
    (e) => {
      e.preventDefault();
      if (password && id) {
        //dispatch.
        let body = {
          id: id,
          password: password,
        };
        dispatch(logined(body))
          .then((response) => {
            if (response.data.isAdmin === true) {
              props.history.push("/admin");
            } else props.history.push("/");
          })
          .catch((err) => {
            console.log(err);
            alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
          });
      }
    },
    [password, id]
  );
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
      </Form>
    </AuthTemplate>
  );
}
export default Login;
