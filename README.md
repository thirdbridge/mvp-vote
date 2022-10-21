# Thirdbridge MVP of the month blockchain voting system

Simple app developped on the flow blockchain that implements a smart contract that allows accounts on the flow blockchain to vote for a MVP from a list of candidates.

The app is divided in two modules:

- The flow scripts including the smart contract and the transactions required for users to interact with the smart contract.
- A simple web app developped in React that implement the [FCL JS SDK](https://developers.flow.com/tools/fcl-js) to interact with our smart contract through a web interface.

> If you have any questions about this code sample, feel free to [contact the **Thirdbridge team**](https://www.thirdbridge.ca/)

## The flow scripts

- **MVPVote contract**: Smart contract that allows an administrator to register candidates and issue ballots for voting.
- **Read votes script**: Script that returns the candidates registry with their number of votes.
- **Add candidate transaction**: Transaction that registers a candidate and issue a ballot to this new candidate. Must be signed by both the admin and the candidate.
- **Vote transaction**: Transaction that allows the owner of a ballot (a candidate) to vote. Must only be signed by the candidate.
- **Add candidate shell script**: The process of adding a candidate requires a few commands (create account on the blockchain, build the add candidate transaction, sign it by the admin and the candidate, execute the transaction...). Being lazy developpers, we wrote a schell script that does it all in one command.

The code of this module is pretty well documented so if you want more info, just get into it.

### Getting started

> Before you start interacting with this project, it would help if you already had some understanding of Flow's concepts and the cadence language. You can find some tutorials and information [here](https://developers.flow.com/cadence/tutorial/01-first-steps).

In order to interact with the scripts, you will need to install the [flow CLI](https://developers.flow.com/tools/flow-cli) which is a command-line interface that provides utilities for building Flow applications.

Follow the instructions [here](https://developers.flow.com/tools/flow-cli/install) to install it.

Once the CLI is installed, you will have to start a Flow emulator where you can play arround with our scripts. [Click here](https://developers.flow.com/tools/flow-cli/start-emulator) to learn more about this tool and how it works.

### Deploying the contract

```
flow accounts add-contract MVPVote ./contracts/mvp-vote.cdc
```

### Adding a candidate

```
sh ./sh/add-candidate.sh NAME_OF_THE_CANDIDATE
```

### Voting

```
flow transactions send ./transactions/vote.cdc NAME_OF_THE_CANDIDATE_YOU_VOTE_FOR --signer NAME_OF_THE_CANDIDATE_VOTING
```

### Reading the candidate registry

```
flow scripts execute ./scripts/read.cdc
```

## The React frontend

A simple React app that shows you the list of candidates and allows you to vote. To sign the voting transaction you need to input your account's address and private key. It is a very unsafe way to sign a transaction so keep in mind that this is only a small code sample meant for learning purposes.

The React frontend is not as well documented as the flow scripts because it is only meant to give an example of how to interact with the blockchain from a web app. The meat of the flow SDK integration can be found in the following files:

- ./react-frontend/src/index.tsx
- ./react-frontend/src/flow-utils.tsx

The methods implemented to interact with the blockchain are independant from React and can be used in any JS project.

### Getting started

It is a React app so you know...

```
npm install
```

```
npm start
```

> The flow emulator must be running in order for the frontend to connect to the blockchain
