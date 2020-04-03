import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

const ItemContainer = styled.View`
  margin: 0 20px;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Btn = styled.TouchableOpacity`
  flex: 1;
  height: 100%;
  display: flex;

  /* align-items: center; */
  justify-content: center;
`;
const Util = styled.View`
  flex: 2;
  height: 100%;
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  justify-content: center;
`;
const TodoText = styled.Text`
  flex: 4;
  font-size: 16px;
  text-align: left;
  color: ${props => props.color};
  text-decoration: ${props => props.strike};
`;

export default class Todos extends Component {
  state = {
    isCompleted: false,
    isEditing: false
  };

  _toggleCheck = () => {
    const { isCompleted } = this.state;
    this.setState({
      isCompleted: !isCompleted
    });
  };

  _toggleEdit = () => {
    const { isEditing } = this.state;
    this.setState({
      isEditing: !isEditing
    });
  };

  _toggelSave = () => {
    const { isEditing } = this.state;
    this.setState({
      isEditing: !isEditing
    });
  };

  render() {
    const { isCompleted, isEditing } = this.state;
    const { _toggleCheck, _toggleEdit, _toggelSave } = this;
    return (
      <ItemContainer>
        {isEditing ? null : (
          <Btn onPressOut={() => _toggleCheck()}>
            {isCompleted ? (
              <Feather name="check-square" size={25} color="#005eff" />
            ) : (
              <Feather name="square" size={25} color="#585858" />
            )}
          </Btn>
        )}

        <TodoText
          color={isCompleted ? "#c2c2c2" : "black"}
          strike={isCompleted ? "line-through" : null}
        >
          blblblal
        </TodoText>
        <Util>
          {isEditing ? (
            <Btn onPressOut={() => _toggelSave()}>
              <Feather
                name="save"
                size={22}
                color="#005eff"
                style={{ position: "absolute", right: 0 }}
              />
            </Btn>
          ) : (
            <>
              <Btn onPressOut={() => _toggleEdit()}>
                <Feather
                  name="edit-2"
                  size={22}
                  color="#585858"
                  style={{ position: "absolute", right: 0 }}
                />
              </Btn>
              <Btn>
                <Feather
                  name="x"
                  size={25}
                  color="#585858"
                  style={{ position: "absolute", right: 0 }}
                />
              </Btn>
            </>
          )}
        </Util>
      </ItemContainer>
    );
  }
}
