import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../userSlice";
import styled from "styled-components";

const LogoTitle = styled.h1`
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 60px;
  margin-bottom: 30px;
  font-size: 45px;
  color: #253858;
`;
const Section = styled.section`
  width: 100%;
  padding: 0px;
  overflow: visible;
  margin-bottom: 30px;
`;
const LoginBlock = styled.div`
  max-width: 400px;
  margin: auto;
`;
const LoginBlockContainer = styled.div`
  background-color: #ffffff;
  border-radius: 3px;
  padding: 25px 40px;
  box-shadow: rgb(0 0 0 / 10%) 0 0 10px;
  height: 320px;
`;
const LoginToHeader = styled.h1`
  text-align: center;
  color: #5e6c84;
  font-size: 16px;
  letter-spacing: -0.01em;
  line-height: 28px;
  margin-top: 10px;
  margin-bottom: 25px;
`;
const Input = styled.input`
  width: 100%;
  font-size: 12px;
  background-color: #fafbfc;
  border: 2px solid #dfe1e6;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 3px;
  height: 44px;
  margin-bottom: 15px;
  padding: 0.5rem;
`;
const SubmitButton = styled.button`
  width: 100%;
  height: 43px;
  background-color: #5aac44;
  border: 1px solid transparent;
  border-radius: 3px;
  color: white;
  font-size: 14px;
  font-weight: 600;
`;

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      login({
        name,
        email,
        password,
        loggedIn: true,
      })
    );

    setName("");
    setPassword("");
    setEmail("");
  };

  return (
    <div>
      <LogoTitle>Trello</LogoTitle>
      <Section>
        <LoginBlock>
          <LoginBlockContainer>
            <LoginToHeader>Вход в Трелло</LoginToHeader>
            <div>
              <form onSubmit={(e) => handleSubmit(e)}>
                <Input 
                    type="name"
                    placeholder="Укажите адрес электронной почты"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input 
                    type="email"
                    placeholder="Укажите адрес электронной почты"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input 
                    type="password"
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <SubmitButton type="submit">Войти</SubmitButton>
              </form>
            </div>
          </LoginBlockContainer>
        </LoginBlock>
      </Section>
    </div>
  );
};

export default Login;
