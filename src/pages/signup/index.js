import React, { useState, useCallback } from "react";
import AuthTemplate from "../template/AuthTemplate";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import axios from "axios";

import { checkEmail, checkPassword, checkId } from "../../utils/RegExpCheck";
const ReadMe = styled.p`
  font-family: NanumSquareRegular;
  padding: 20px;
  text-align: center;
  font-size: 14px;
  color: rgb(167, 167, 167);
`;

const Checklist = styled.p`
  font-family: NanumSquareRegular;
  font-size: 14px;
  color: tomato;
  margin: 0;
  margin-left: 5px;
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
function SignUp(props) {
  //입력 상태 관리
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [message, setMessage] = useState({
    idMessage: false,
    emailMessage: false,
    passwordMessage: false,
  });
  //중복확인
  const [idOverLapCheck, setIdOverLapCheck] = useState(false);
  const [emailOverLapCheck, setEmailOverLapCheck] = useState(false);
  //패스워드체크 확인
  const [warningState, setWarningState] = useState(false);

  //inputhandling
  const onIdHandler = useCallback(
    (e) => {
      setId(e.target.value);
      console.log(id);
    },
    [id]
  );
  const onEmailHandler = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [email]
  );
  const onNameHandler = useCallback(
    (e) => {
      setName(e.target.value);
    },
    [email]
  );
  const onPasswordHandler = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [password]
  );
  const onPasswordCheckHandler = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
    },
    [passwordCheck]
  );

  // 서버에 id 중복 체크
  const IdCheckHandler = useCallback(
    (e) => {
      e.preventDefault();
      //초기화
      setIdOverLapCheck(false);
      if (checkId(id)) {
        console.log("서버로 id중복 확인");
        axios
          .get(`http://15.164.20.183:3003/user/check/id/${id}`)
          .then((response) => setIdOverLapCheck(response.data.data.checkId))
          .catch((err) => {
            console.log(err);
            setIdOverLapCheck(false);
            console.log(idOverLapCheck);
          });
        setMessage({
          idMessage: false,
          emailMessage: false,
          passwordMessage: false,
        });
      } else {
        setMessage({
          idMessage: true,
          emailMessage: false,
          passwordMessage: false,
        });
      }
    },
    [message, id, idOverLapCheck]
  );
  //서버에 email 중복 체크
  const EmailCheckHanlder = useCallback(
    (e) => {
      e.preventDefault();
      setEmailOverLapCheck(false);
      if (checkEmail(email) && email) {
        console.log("서버로 Email중복 확인");
        axios
          .get(`http://15.164.20.183:3003/user/check/email/${email}`)
          .then((response) =>
            setEmailOverLapCheck(response.data.data.checkEmail)
          )
          .catch((error) => {
            console.log(error.response);
            setEmailOverLapCheck(false);
            console.log(emailOverLapCheck);
          });
        setMessage({
          idMessage: false,
          emailMessage: false,
          passwordMessage: false,
        });
        //서버에 데이터 요청
      } else {
        setMessage({
          idMessage: false,
          emailMessage: true,
          passwordMessage: false,
        });
      }
    },
    [message, email, emailOverLapCheck]
  );
  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (checkPassword(password) && password) {
        setMessage({
          idMessage: false,
          emailMessage: false,
          passwordMessage: false,
        });
        if (password !== passwordCheck) {
          setWarningState(true);
        } else {
          setWarningState(false);
          if (idOverLapCheck && emailOverLapCheck && name) {
            //서버에 회원가입요청
            console.log("회원가입 요청");
            let body = {
              loginId: id,
              email: email,
              userName: name,
              password: password,
            };
            axios
              .post("http://15.164.20.183:3003/user/signup", body)
              .then((response) => {
                if (response.data.success === true) {
                  alert("가입되셨습니다!");
                  props.history.push("/login");
                }
              })
              .catch((error) => console.log(error.response));
          } else if (!name) {
            alert("이름을 적어야 합니다");
          } else if (!idOverLapCheck) {
            alert("id 중복확인을 해야합니다 ");
          } else if (!emailOverLapCheck) {
            alert("email 중복확인을 해야합니다 ");
          }
        }
      } else {
        setMessage({
          idMessage: false,
          emailMessage: false,
          passwordMessage: true,
        });
      }
    },
    [
      message,
      password,
      passwordCheck,
      warningState,
      idOverLapCheck,
      emailOverLapCheck,
      id,
      name,
      email,
    ]
  );
  return (
    <AuthTemplate>
      {" "}
      <Form id="Submit" onSubmit={onSubmitHandler}>
        <div>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={onNameHandler}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="id"
            label="Id"
            name="id"
            autoComplete="id"
            autoFocus
            value={id}
            onChange={onIdHandler}
          />
          <Button
            id="id"
            type="submit"
            fullWidth
            variant="contained"
            className="id_button"
            onClick={IdCheckHandler}
          >
            ID중복확인
          </Button>
        </div>
        {idOverLapCheck === true ? (
          <Checklist>사용하실 수 있는 Id입니다.</Checklist>
        ) : (
          <Checklist>사용할 수 없는 Id 입니다.</Checklist>
        )}
        <Checklist>Id는 영문자, 숫자 조합 8자 이상입니다.</Checklist>
        {message.idMessage && <Checklist>Id 형식에 맞지 않습니다.</Checklist>}

        <div>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={onEmailHandler}
          />
          <Button
            id="email"
            type="submit"
            fullWidth
            variant="contained"
            className="email_button"
            onClick={EmailCheckHanlder}
          >
            Email중복확인
          </Button>
        </div>
        {emailOverLapCheck === true ? (
          <Checklist>사용할 수 있는 Email입니다.</Checklist>
        ) : (
          <Checklist>사용할 수 없는 Email입니다.</Checklist>
        )}
        {message.emailMessage && (
          <Checklist>Email 형식에 맞지 않습니다.</Checklist>
        )}
        <div>
          <TextField
            variant="outlined"
            margin="normal"
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
        </div>
        <Checklist>
          패스워드는 영문자,숫자,특수문자 조합 8자 이상입니다.
        </Checklist>
        {message.passwordMessage && (
          <Checklist>패스워드 형식이 일치하지 않습니다.</Checklist>
        )}
        <div>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="passwordCheck"
            label="PasswordCheck"
            name="passwordCheck"
            type="password"
            autoComplete="passwordCheck"
            autoFocus
            value={passwordCheck}
            onChange={onPasswordCheckHandler}
          />
        </div>
        {warningState && <Checklist>패스워드가 일치하지 않습니다.</Checklist>}
        <Button id="Submit" type="submit" fullWidth variant="contained">
          가입하기
        </Button>
        <ReadMe>
          가입하면 Sw_Project 6Team 의 약관 정책에 동의하게 됩니다.
        </ReadMe>
      </Form>
    </AuthTemplate>
  );
}

export default SignUp;
