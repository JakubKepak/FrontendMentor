import { useState, useEffect } from "react";
import styled from "styled-components";

import useLocalStorage from "../hooks/useLocalStorage";

import checkedIcon from "../images/icon-check.svg";
import deleteIcon from "../images/icon-cross.svg";

const TodosContainer = styled.div`
  background-color: ${(props) => props.theme.backgroundTodos};
  width: 100%;
  margin-top: 1.5rem;
  border-radius: 5px;
  box-shadow: 0px 5px 60px 5px rgba(0, 0, 0, 0.1);
`;

const TodoItem = styled.div`
  display: flex;
  align-items: center;
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

const TodoDeleteButton = styled.div`
  width: 1rem;
  height: 1rem;
  background-image: url(${deleteIcon});
  background-size: contain;
  margin-left: auto;
  display: none;

  &:hover {
    cursor: pointer;
  }

  ${TodoItem}:hover & {
    display: block;
  }

  @media (max-width: 380px) {
    display: block;
  }
`;

const TodoCheckboxLabel = styled.label`
  display: inline-block;
  position: relative;
  border: 1px solid ${(props) => props.theme.checkboxBorderColor};
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-image: linear-gradient(
      to bottom right,
      hsl(192, 100%, 67%),
      hsl(280, 87%, 65%)
    );
  }

  ${({ isDone }) =>
    isDone &&
    `   
    background-image: linear-gradient(
    to bottom right,
    hsl(192, 100%, 67%),
    hsl(280, 87%, 65%)
  );
  `}
`;

const TodoCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const TodoSpan = styled.span`
  background-image: url(${checkedIcon});
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  top: 0.4rem;
  left: 0.4rem;
  display: none;
  width: 10px;
  height: 10px;

  ${({ isDone }) =>
    isDone &&
    `
      display: block
  `}
`;

const LoadingContainer = styled.div``;

const NoTodosContainer = styled.div``;

const FilterMenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.textColorLight};
  padding: 1rem 1rem;
  font-size: 0.8rem;
`;

const FilterMenuContainerCenter = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0.5rem;
`;

const FilterOptionItem = styled.span`
  &:hover {
    cursor: pointer;
  }

  ${({ selection, localStorageData, theme }) =>
    selection === localStorageData &&
    `
    color: ${theme.brightBlueColor};
    font-weight: 700;
  `}
`;

export default function Todos({
  todosLS,
  changeStatus,
  clearCompleted,
  deleteTodoItem,
}) {
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
              <TodoCheckboxLabel isDone={todo.done}>
                <TodoCheckbox
                  id={todo.id}
                  type="checkbox"
                  defaultChecked={todo.done}
                  onChange={handleStatusChange}
                />
                <TodoSpan isDone={todo.done} />
              </TodoCheckboxLabel>
              <TodoName isDone={todo.done}>{todo.name}</TodoName>
              <TodoDeleteButton onClick={() => deleteTodoItem(todo.id)} />
            </TodoItem>
          );
        })
      )}

      <FilterMenuContainer>
        {
          todosLS.filter((item) => {
            return item.done === false;
          }).length
        }{" "}
        Items left
        <FilterMenuContainerCenter>
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
        </FilterMenuContainerCenter>
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
