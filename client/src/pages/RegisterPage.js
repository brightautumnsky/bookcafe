import React from "react";
import styled from "styled-components";
import Input from "../components/Input";
import Button from "../components/Button";
import useInputs from "../utils/useInputs";
import axios from "axios";

const RegisterWrapper = styled.div`
  margin: 0 auto;
  width: 390px;
  border: 1px solid skyblue;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const RegisterFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding: 30px;
  & > * {
    margin-bottom: 12px;
  }
`;

const initialInputs = {
  name: "",
  email: "",
  password: "",
};

const RegisterPage = () => {
  const [inputs, onChange] = useInputs(initialInputs);
  const { name, email, password } = inputs;

  const onSubmit = (e) => {
    e.preventDefault();
    const body = {
      name,
      email,
      password,
    };

    axios
      .post("/api/users/register", body)
      .then((response) => console.log(response));
  };

  return (
    <RegisterWrapper>
      <RegisterFormWrapper onSubmit={onSubmit}>
        <Input
          name="name"
          text="이름"
          size="full"
          onChange={onChange}
          value={name}
        />
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
        <Button text="회원가입" size="full" color="#FBD6D2" />
      </RegisterFormWrapper>
    </RegisterWrapper>
  );
};

export default RegisterPage;
