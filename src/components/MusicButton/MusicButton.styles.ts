import styled from "styled-components";

export const MuteButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  z-index: 9999;

  @media only screen and (max-width: 1024px) {
    h2 {
      display: none;
    }
  }

  &:focus {
    outline: none;
  }
`;
