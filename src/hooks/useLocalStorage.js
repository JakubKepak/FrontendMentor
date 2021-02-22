import { useEffect, useReducer } from "react";

const ADD_TODO = "ADD_TODO";
const CHANGE_TODO_STATUS = "CHANGE_TODO_STATUS";
const CLEAR_ALL_COMPLETED = "CLEAR_ALL_COMPLETED";
const SET_FILTER_OPTION = "SET_FILTER_OPTION";
const DELETE_TODO_ITEM = "DELETE_TODO_ITEM";

// TODO: rewrite to switch
const reducer = (state, action) => {
  if (action.type === ADD_TODO) {
    return [action.payload, ...state];
  }
  if (action.type === CHANGE_TODO_STATUS) {
    state[action.payload.index].done = !state[action.payload.index].done;
    return [...state];
  }
  if (action.type === CLEAR_ALL_COMPLETED) {
    return state.filter((item) => item.done === false);
  }
  if (action.type === SET_FILTER_OPTION) {
    return action.payload;
  }
  if (action.type === DELETE_TODO_ITEM) {
    return state.filter((item) => item.id !== action.payload);
  }
};

export default function useLocalStorage(key, defaultValue) {
  const stored = localStorage.getItem(key);
  const initialValue = stored ? JSON.parse(stored) : defaultValue;
  const [localStorageData, dispatch] = useReducer(reducer, initialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(localStorageData));
  }, [key, localStorageData]);

  const addTodoItem = (item) => {
    dispatch({
      type: ADD_TODO,
      payload: {
        id: Math.round(Math.random() * 10000000000000),
        done: false,
        name: item,
        createTime: Date.now(),
      },
    });
  };

  const changeStatusInTodo = (indexOfTodo) => {
    dispatch({
      type: CHANGE_TODO_STATUS,
      payload: {
        index: indexOfTodo,
      },
    });
  };

  const clearAllCompletedTodos = () => {
    dispatch({
      type: CLEAR_ALL_COMPLETED,
    });
  };

  const setFilterOption = (filterOption) => {
    dispatch({
      type: SET_FILTER_OPTION,
      payload: filterOption,
    });
  };

  const deleteTodoItem = (itemId) => {
    dispatch({
      type: DELETE_TODO_ITEM,
      payload: itemId,
    });
  };

  return {
    localStorageData,
    addTodoItem,
    changeStatusInTodo,
    clearAllCompletedTodos,
    setFilterOption,
    deleteTodoItem,
  };
}
