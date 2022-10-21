import styled from "styled-components";

export default styled.div`
  display: flex;
  margin-top: 40px;

  & input {
    flex: 1;
    margin-right: 20px;
  }

  @media (max-width: 700px) {
    flex-direction: column;

    & input {
      flex: none;
      margin-right: 0px;
      margin-bottom: 10px;
    }
  }
`;
