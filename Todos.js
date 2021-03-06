import React, { Component } from "react";
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
  flex: 4.5;
  font-size: 16px;
  text-align: left;
  color: ${(props) => props.color};
  text-decoration: ${(props) => props.strike};
`;
const EditingInput = styled.TextInput`
  font-size: 16px;
`;

export default class Todos extends Component {
  state = {
    isEditing: false,
    todoValue: "",
  };

  //   _toggleCheck = () => {
  //     const { isCompleted } = this.state;
  //     this.setState({
  //       isCompleted: !isCompleted
  //     });
  //   };

  _toggleEdit = () => {
    const { isEditing } = this.state;
    const { todo } = this.props;
    this.setState({
      isEditing: !isEditing,
      todoValue: todo,
    });
  };

  _editTodo = (text) => {
    this.setState({
      todoValue: text,
    });
  };

  _toggelSave = () => {
    const { isEditing, todoValue } = this.state;
    const { id, updateTodo } = this.props;
    updateTodo(id, todoValue);
    this.setState({
      isEditing: !isEditing,
    });
  };

  render() {
    const { isEditing, todoValue } = this.state;
    const {
      todo,
      deleteItem,
      id,
      checkItem,
      isCompleted,
      updateTodo,
    } = this.props;
    const { _toggleCheck, _toggleEdit, _toggelSave, _editTodo } = this;
    return (
      <ItemContainer>
        {isEditing ? null : (
          <Btn onPressOut={() => checkItem(id)}>
            {isCompleted ? (
              <Feather name="check-square" size={25} color="#005eff" />
            ) : (
              <Feather name="square" size={25} color="#585858" />
            )}
          </Btn>
        )}

        {isEditing ? (
          <EditingInput value={todoValue} autoFocus onChangeText={_editTodo} />
        ) : (
          <TodoText
            color={isCompleted ? "#c2c2c2" : "black"}
            strike={isCompleted ? "line-through" : null}
          >
            {todo}
          </TodoText>
        )}

        <Util>
          {isEditing ? (
            <Btn
              onPressOut={(e) => {
                e.stopPropagation;
                _toggelSave();
              }}
            >
              <Feather
                name="save"
                size={22}
                color="#005eff"
                style={{ position: "absolute", right: 0 }}
              />
            </Btn>
          ) : (
            <>
              <Btn
                onPressOut={(e) => {
                  e.stopPropagation;
                  _toggleEdit();
                }}
              >
                <Feather
                  name="edit-2"
                  size={22}
                  color="#585858"
                  style={{ position: "absolute", right: 0 }}
                />
              </Btn>
              <Btn
                onPressOut={(e) => {
                  e.stopPropagation;
                  deleteItem(id);
                }}
              >
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
