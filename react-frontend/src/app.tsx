import React from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { readVotes } from "./flow-utils";
import Loader from "./components/loader";
import VotingForm from "./components/voting-form";

const Container = styled.div`
  margin: auto;
  max-width: 700px;
  width: 100%;
  padding: 50px 30px;
  box-sizing: border-box;
`;

const App = () => {
  // Queries

  const {
    isLoading,
    isError,
    data: candidates,
  } = useQuery("votes", () => readVotes());

  // Rendering

  return (
    <Container>
      <h1>
        <a href="https://www.thirdbridge.ca/" target="_blank" rel="noreferrer">
          Thirdbridge
        </a>
        's MVP of the month
      </h1>
      {isLoading && <Loader />}
      {isError && <h2>Oups! Something went wrong.</h2>}
      {candidates && Object.keys(candidates).length > 0 && (
        <VotingForm candidates={candidates} />
      )}
    </Container>
  );
};

export default App;
