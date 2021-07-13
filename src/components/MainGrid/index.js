import styled from "styled-components";
const MainGrid = styled.main`
  width: 100%;
  height: 100%;
  grid-gap: 10px;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  padding: 16px;
  position: relative;
  .photoArea {
    display: none;
    @media(min-width: 860px) {
      display: block;
      height: auto;
    }
  }
  .profileArea {
    header {
      height: 160px;
    }
  }
  @media(min-width: 860px) {
    max-width: 1110px;
    display: grid;
    grid-template-areas: 
      "photoArea profileArea profileArea"
      "menuArea welcomeArea profileRelationsArea";
    grid-template-columns: 160px 1fr 312px;
    grid-template-rows: 160px 1fr;
  }
`;
export default MainGrid;