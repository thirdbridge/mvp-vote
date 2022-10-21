import React from "react";
import styled from "styled-components";
import { AvatarGenerator } from "random-avatar-generator";

const generator = new AvatarGenerator();

interface CandidateCellProps extends React.HTMLAttributes<HTMLButtonElement> {
  name: string;
  votes: number;
  selected?: boolean;
}

const CandidateCell = (props: CandidateCellProps) => {
  const { name, votes } = props;

  return (
    <button {...props}>
      <img src={generator.generateRandomAvatar(name)} alt={name} />
      <p>
        {name} ({votes})
      </p>
    </button>
  );
};

export default styled(CandidateCell)`
  background: ${(props) =>
    props.selected ? "rgba(255, 255, 255, 0.9)" : "none"};
  border: 1px solid rgba(255, 255, 255, 0.9);
  padding: 20px 30px;
  height: auto;
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 20px;

  & img {
    max-width: 50px;
    margin-right: 20px;
  }

  & p {
    color: ${(props) => (props.selected ? "#111" : "white")};
    margin: 0;
    text-transform: capitalize;
    font-weight: normal;
  }

  &:hover {
    background: ${(props) =>
      props.selected ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.1)"};
  }
`;
