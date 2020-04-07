import React, { Component } from "react";
import { AsyncStorage, ScrollView } from "react-native";
import styled from "styled-components/native";
import Todos from "./Todos";
import { AppLoading } from "expo";
import { generateId } from "./utils";

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
  padding: 10px;
  border: 1px solid #d5d5d5;
`;

const TodoItemContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
`;

export default class App extends Component {
  state = {
    newTodo: "",
    loadTodo: false,
    todos: {},
  };

  componentDidMount = () => {
    this._loadTodos();
  };

  _loadTodos = async () => {
    try {
      const todos = await AsyncStorage.getItem("todos");
      const parsedTodos = JSON.parse(todos);
      console.log(parsedTodos);
      this.setState({
        loadTodo: true,
        todos: parsedTodos || {},
      });
    } catch (error) {
      console.log(error);
    }
  };

  _changeTodo = (text) => {
    this.setState({
      newTodo: text,
    });
  };

  _submitTodo = () => {
    const { newTodo } = this.state;

    if (newTodo !== "") {
      this.setState((prevState) => {
        const ID = generateId();
        const newTodoObj = {
          [ID]: {
            id: ID,
            todo: newTodo,
            isCompleted: false,
            createAt: Date.now(),
          },
        };

        const newState = {
          ...prevState,
          newTodo: "",
          todos: {
            ...prevState.todos,
            ...newTodoObj,
          },
        };

        this._saveTodos(newState.todos);
        return { ...newState };
      });
    }
  };

  _deleteTodo = (id) => {
    this.setState((prevState) => {
      const todos = prevState.todos;
      delete todos[id];
      const newState = {
        ...prevState,
        ...todos,
      };

      this._saveTodos(newState.todos);
      return { ...newState };
    });
  };

  _toggleCheck = (id) => {
    // this.setState((prevState) => {
    //   const todo = prevState.todos[id];
    //   const isCompleted = todo.isCompleted;

    //   const newState = {
    //     ...prevState,
    //     todos: {
    //       ...prevState.todos,
    //       [id]: {
    //         ...prevState.todos[id],
    //         isCompleted: !isCompleted,
    //       },
    //     },
    //   };

    //   this._saveTodos(newState.todos);
    //   return { ...newState };
    // });
    const { todos } = this.state;
    const checkedItem = todos[id];
    const newTodos = { ...todos };
    newTodos[id] = { ...checkedItem, isCompleted: !checkedItem.isCompleted };

    this._saveTodos(newTodos);
    this.setState({
      todos: newTodos,
    });
  };

  _updateTodo = (id, text) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            todo: text,
          },
        },
      };

      this._saveTodos(newState.todos);
      return { ...newState };
    });
  };

  _saveTodos = (newTodos) => {
    console.log(JSON.stringify(newTodos));
    const saveTodos = AsyncStorage.setItem("todos", JSON.stringify(newTodos));
  };

  render() {
    const { newTodo, loadTodo, todos } = this.state;
    const {
      _changeTodo,
      _submitTodo,
      _deleteTodo,
      _toggleCheck,
      _updateTodo,
    } = this;

    const completedItem = Object.values(todos).filter(
      (item) => item.isCompleted === true
    );
    const uncompletedItem = Object.values(todos).filter(
      (item) => item.isCompleted === false
    );

    console.log(todos);

    if (!loadTodo) {
      return <AppLoading />;
    }
    return (
      <Container>
        <Header>
          <Title>So simple to do</Title>
        </Header>

        <TodoContainer>
          <Input
            placeholder="write todo"
            value={newTodo}
            onChangeText={_changeTodo}
            returnKeyType="done"
            autoCorrect={false}
            onSubmitEditing={() => _submitTodo()}
          />
          <ScrollView>
            <TodoItemContainer>
              {completedItem.map((todo) => (
                <Todos
                  key={todo.id}
                  {...todo}
                  deleteItem={_deleteTodo}
                  checkItem={_toggleCheck}
                  updateTodo={_updateTodo}
                />
              ))}
              {uncompletedItem.map((todo) => (
                <Todos
                  key={todo.id}
                  {...todo}
                  deleteItem={_deleteTodo}
                  checkItem={_toggleCheck}
                  updateTodo={_updateTodo}
                />
              ))}
            </TodoItemContainer>
          </ScrollView>
        </TodoContainer>
      </Container>
    );
  }
}
