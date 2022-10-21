import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { vote } from "../flow-utils";
import Loader from "./loader";
import CandidateCell from "./candidate-cell";
import FlexContainer from "./flex-container";

interface VotingFormProps {
  candidates: { [k in string]: number };
}

const VotingForm = ({ candidates }: VotingFormProps) => {
  // States

  const [selectedCandidate, setSelectedCandidate] = useState<
    undefined | string
  >();
  const [address, setAddress] = useState("");
  const [key, setKey] = useState("");

  // Queries

  const queryClient = useQueryClient();

  const {
    mutateAsync: onClickVote,
    isLoading,
    isError,
  } = useMutation(async () => await vote(address, key, selectedCandidate!), {
    onSuccess: () => {
      setSelectedCandidate(undefined);
      setAddress("");
      setKey("");
      queryClient.invalidateQueries(["votes"]);
    },
  });

  // Rendering

  return (
    <>
      <h2>Vote for a candidate</h2>
      <div>
        {Object.keys(candidates).map((candidate) => (
          <CandidateCell
            key={candidate}
            name={candidate}
            votes={candidates[candidate]}
            selected={selectedCandidate === candidate}
            onClick={() => setSelectedCandidate(candidate)}
          />
        ))}
      </div>

      <FlexContainer>
        <input
          placeholder="Voter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          placeholder="Voter key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <button
          disabled={
            !selectedCandidate || address === "" || key === "" || isLoading
          }
          onClick={() => onClickVote()}
        >
          {isLoading ? <Loader /> : "Vote"}
        </button>
      </FlexContainer>
      {isError && <p>Oups! Something went wrong while voting.</p>}
    </>
  );
};

export default VotingForm;
