import styled from "styled-components";

const HeaderContainer = styled.div`
  width: 100%;
  height: 3rem;
  margin-top: 5rem;
  margin-bottom: 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AppName = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  text-transform: uppercase;
  color: white;
  letter-spacing: 0.9rem;

  @media (max-width: 380px) {
    font-size: 2rem;
  }
`;

const ThemeIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background-image: url(${(props) => props.theme.themeIcon});
  background-size: cover;
  transition: all 0.3s;

  @media (max-width: 380px) {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export default function Header({ switchThemes }) {
  return (
    <HeaderContainer>
      <AppName>Todo</AppName>
      <ThemeIcon onClick={switchThemes} />
    </HeaderContainer>
  );
}
