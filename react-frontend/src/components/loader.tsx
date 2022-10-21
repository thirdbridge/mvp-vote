import styled, { keyframes } from "styled-components";

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

export default styled.div`
  border: 3px solid transparent;
  border-top: 3px solid gray;
  border-left: 3px solid gray;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 1s linear infinite;
  margin: auto;
`;
