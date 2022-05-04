import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Input from "../components/Input";
import Button from "../components/Button";
import useInputs from "../utils/useInputs";
import { login } from "../_actions/users";
import { useDispatch } from "react-redux";

const LoginWrapper = styled.div`
  margin: 0 auto;
  width: 390px;
  border: 1px solid skyblue;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const LoginFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding: 30px;
  & > * {
    margin-bottom: 12px;
  }
`;

const initialInputs = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [inputs, onChange] = useInputs(initialInputs);
  const { email, password } = inputs;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const body = {
      email,
      password,
    };

    dispatch(login(body))
      .then((response) => {
        if (response.payload.loginSuccess) {
          window.localStorage.setItem("userId", response.payload.userId);
          navigate("/");
        } else {
          alert("오류가 발생했습니다.");
        }
      })
      .catch((e) => {
        alert("오류가 발생했습니다.");
        console.log(e);
      });
  };

  return (
    <LoginWrapper>
      <LoginFormWrapper onSubmit={onSubmit}>
        <Input
          name="email"
          text="이메일"
          size="full"
          onChange={onChange}
          value={email}
        />
        <Input
          type="password"
          name="password"
          text="비밀번호"
          size="full"
          onChange={onChange}
          value={password}
        />
        <Button text="로그인" size="full" />
      </LoginFormWrapper>
    </LoginWrapper>
  );
};

export default LoginPage;
