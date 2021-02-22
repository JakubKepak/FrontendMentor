import { useState } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

import "./App.css";

// assets
import backgroundLightImage from "../src/images/bg-desktop-light.jpg";
import backgroundDarkImage from "../src/images/bg-desktop-dark.jpg";
import lightThemeIcon from "./images/icon-sun.svg";
import darkThemeIcon from "./images/icon-moon.svg";

// components
import Header from "./components/Header";
import CreateTodo from "./components/CreateTodo";
import Todos from "./components/Todos";

// hooks
import useLocalStorage from "./hooks/useLocalStorage";

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 100%;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    font-family: 'Josefin Sans', sans-serif;
    background-color: ${(props) => props.theme.backgroundColor};
    transition: all .3s;
  }
`;

// themes

const light = {
  bodyBackgroundColor: "white",
  backgroundImage: backgroundLightImage,
  backgroundColor: "white",
  backgroundTodos: "white",
  themeIcon: darkThemeIcon,
  fontColor: "hsl(235, 19%, 35%)",
  checkboxBorderColor: "hsl(236, 33%, 92%)",
  textColorLight: "hsl(236, 9%, 61%)",
  textColorDark: "hsl(235, 19%, 35%)",
  textColorItemDone: "hsl(233, 11%, 84%)",
  brightBlueColor: "hsl(220, 98%, 61%)",
};

const dark = {
  bodyBackgroundColor: "black",
  backgroundImage: backgroundDarkImage,
  backgroundColor: "hsl(235, 21%, 11%)",
  backgroundTodos: "hsl(235, 24%, 19%)",
  themeIcon: lightThemeIcon,
  fontColor: "hsl(0, 0%, 98%)",
  checkboxBorderColor: "hsl(234, 11%, 52%)",
  textColorLight: "hsl(236, 9%, 61%)",
  textColorDark: "hsl(235, 19%, 35%)",
  textColorItemDone: "hsl(233, 11%, 84%)",
  brightBlueColor: "hsl(220, 98%, 61%)",
};

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 1440px;
  background-image: url(${(props) => props.theme.backgroundImage});
  background-repeat: no-repeat;
  background-color: ${(props) => props.theme.backgroundColor};

  display: flex;
  justify-content: center;

  transition: all 0.3s;
`;

const AppContainer = styled.div`
  width: 95%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
`;

function App() {
  const [theme, setTheme] = useState(light);

  const {
    localStorageData,
    addTodoItem,
    changeStatusInTodo,
    clearAllCompletedTodos,
    deleteTodoItem,
  } = useLocalStorage("todos", []);

  // TODO: store theme to local storage
  const switchThemes = () => {
    theme === light ? setTheme(dark) : setTheme(light);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <MainContainer>
          <AppContainer>
            <Header switchThemes={switchThemes} />
            <CreateTodo addTodo={addTodoItem} />
            <Todos
              deleteTodoItem={deleteTodoItem}
              changeStatus={changeStatusInTodo}
              clearCompleted={clearAllCompletedTodos}
              todosLS={localStorageData}
            />
          </AppContainer>
        </MainContainer>
      </ThemeProvider>
    </>
  );
}

export default App;
