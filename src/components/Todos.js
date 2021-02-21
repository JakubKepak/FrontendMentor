import { useState, useEffect } from "react";
import styled from "styled-components";

import useLocalStorage from "../hooks/useLocalStorage";

const TodosContainer = styled.div`
  background-color: ${(props) => props.theme.backgroundTodos};
  width: 100%;
  margin-top: 1.5rem;
  border-radius: 5px;
  box-shadow: 0px 5px 60px 5px rgba(0, 0, 0, 0.1);
`;

const TodoItem = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.checkboxBorderColor};
  padding: 1rem 1rem;
`;

const TodoName = styled.span`
  margin-left: 1rem;
  font-size: 1.1rem;
  color: ${(props) => props.theme.textColorDark};
  font-weight: 600;

  ${({ isDone, theme }) =>
    isDone &&
    `
    text-decoration: line-through;
    color: ${theme.textColorItemDone};
  `}
`;

const TodoCheckbox = styled.input``;

const LoadingContainer = styled.div``;

const NoTodosContainer = styled.div``;

const FilterMenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.textColorLight};
  padding: 1rem 1rem;
`;

const FilterOptionItem = styled.span`
  &:hover {
    cursor: pointer;
  }

  ${({ selection, localStorageData, theme }) =>
    selection === localStorageData &&
    `
    color: ${theme.brightBlueColor};
  `}
`;

export default function Todos({ todosLS, changeStatus, clearCompleted }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { localStorageData, setFilterOption } = useLocalStorage(
    "filterOption",
    "All"
  );

  useEffect(() => {
    if (localStorageData === "All") {
      setTodos(todosLS);
    }
    if (localStorageData === "Active") {
      setTodos(todosLS.filter((item) => item.done === false));
    }
    if (localStorageData === "Completed") {
      setTodos(todosLS.filter((item) => item.done === true));
    }
    setLoading(false);
  }, [todosLS, loading, localStorageData]);

  const handleStatusChange = (event) => {
    let foundIndexOfTodo = todos.indexOf(
      todos.find((item) => {
        return item.id === parseInt(event.target.id);
      })
    );
    changeStatus(foundIndexOfTodo);
  };

  const handleFilterOptionChange = (event) => {
    console.log(event);
    setFilterOption(event.target.innerHTML);
  };

  return (
    <TodosContainer>
      {loading ? (
        <LoadingContainer>Loading...</LoadingContainer>
      ) : todos.length === 0 ? (
        <NoTodosContainer>No todos</NoTodosContainer>
      ) : (
        todos.map((todo) => {
          return (
            <TodoItem key={todo.id}>
              <TodoCheckbox
                id={todo.id}
                type="checkbox"
                defaultChecked={todo.done}
                onChange={handleStatusChange}
              />
              <TodoName isDone={todo.done}>{todo.name}</TodoName>
            </TodoItem>
          );
        })
      )}

      <FilterMenuContainer>
        {todos.length} Items left
        <FilterOptionItem
          localStorageData={localStorageData}
          selection="All"
          onClick={handleFilterOptionChange}
        >
          All
        </FilterOptionItem>
        <FilterOptionItem
          localStorageData={localStorageData}
          selection="Active"
          onClick={handleFilterOptionChange}
        >
          Active
        </FilterOptionItem>
        <FilterOptionItem
          localStorageData={localStorageData}
          selection="Completed"
          onClick={handleFilterOptionChange}
        >
          Completed
        </FilterOptionItem>
        <FilterOptionItem
          localStorageData={localStorageData}
          selection="Clear"
          onClick={clearCompleted}
        >
          Clear Completed
        </FilterOptionItem>
      </FilterMenuContainer>
    </TodosContainer>
  );
}
