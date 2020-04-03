import React from "react";
import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import Todos from "./Todos";

const Container = styled.View`
  flex: 1;

  background-color: #fff;
  align-items: center;
  justify-content: center;
  padding: 0;
`;
const Header = styled.View`
  flex: 1.2;
  width: 100%;
`;

const Title = styled.Text`
  color: #005eff;
  font-size: 30px;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0 0 15px 20px;
  position: absolute;
  bottom: 0;
`;

const TodoContainer = styled.View`
  flex: 5;

  width: 100%;
`;

const Input = styled.TextInput`
  margin: 5px 20px 10px;
  height: 45px;
  border-radius: 7px;
  padding: 5px;
  border: 1px solid #c2c2c2;
`;

export default function App() {
  return (
    <Container>
      <Header>
        <Title>Awesome todo</Title>
      </Header>
      <TodoContainer>
        <Input placeholder="write todo" />
        <Todos />
      </TodoContainer>
    </Container>
  );
}
