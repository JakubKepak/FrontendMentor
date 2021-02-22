import { useState } from "react";
import styled from "styled-components";

const NewTodoContainer = styled.div`
  width: 100%;
  height: 4rem;
  background-color: ${(props) => props.theme.backgroundTodos};
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  box-shadow: 0px 5px 15px 5px rgba(0, 0, 0, 0.1);
`;

const NewTodoInput = styled.input`
  width: 100%;
  height: 60%;
  border: none;
  font-family: inherit;
  font-size: 1.3rem;
  color: ${(props) => props.theme.main};
  background: none;

  &:placeholder {
    font-family: inherit;
    color: ${(props) => props.theme.textColorLight};
  }

  &:focus {
    outline: none;
  }
`;

const CustomCheckboxUnchecked = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 1rem;
  border: 1px solid ${(props) => props.theme.checkboxBorderColor};
  border-radius: 50%;
  position: relative;
`;

export default function CreateTodo({ addTodo }) {
  const [value, setValue] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (value !== "") {
        addTodo(value);
      }
      setValue("");
    }
  };

  return (
    <NewTodoContainer>
      <CustomCheckboxUnchecked />
      <NewTodoInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyPress={handleKeyPress}
        placeholder="Create a new todo..."
      />
    </NewTodoContainer>
  );
}
