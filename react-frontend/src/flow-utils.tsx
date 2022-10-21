import * as fcl from "@onflow/fcl";
import SHA3 from "sha3";
import { ec as EC } from "elliptic";
import { Buffer } from "buffer";

// Few functions used to sign a transaction from an account's address and key
// Pretty dense stuff with cryptography functions
//
// If you deploy your contract on the testnet, you can use wallets to authorize transactions with flc.authorize()

const hashMsg = (msg: any) => {
  const sha = new SHA3(256);
  sha.update(Buffer.from(msg, "hex"));
  return sha.digest();
};

const signWithKey = (privateKey: string) => (payload: any) => {
  const ec = new EC("p256");
  const key = ec.keyFromPrivate(Buffer.from(privateKey, "hex"));
  const sig = key.sign(hashMsg(payload));
  const n = 32;
  const r = sig.r.toArrayLike(Buffer, "be", n);
  const s = sig.s.toArrayLike(Buffer, "be", n);
  return Buffer.concat([r, s]).toString("hex");
};

const getAccount = async (addr: string) => {
  const { account } = await fcl.send([fcl.getAccount(addr)]);
  if (!account) {
    throw new Error("Account not found");
  }
  return account;
};

const authorize = (address: string, privateKey: string, keyIndex: number) => {
  return async (account = {}) => {
    const user = await getAccount(address);
    const key = user.keys[keyIndex];
    const sign = signWithKey(privateKey);

    return {
      ...account,
      tempId: `${user.address}-${key.index}`,
      addr: fcl.sansPrefix(user.address),
      keyId: Number(key.index),
      signingFunction: (signable: any) => {
        return {
          addr: fcl.withPrefix(user.address),
          keyId: Number(key.index),
          signature: sign(signable.message),
        };
      },
    };
  };
};

// Function to query the blockchain to get the candidate registry with their vote count
export const readVotes = async () => {
  const result = await fcl.query({
    cadence: `
      import MVPVote from 0xContractAddress

      pub fun main(): {String: Int} {
          return MVPVote.candidates
      }
    `,
  });
  return result;
};

// Function to mutate the blockchain to execute a transaction to cast a vote
export const vote = async (address: string, key: string, candidate: string) => {
  const authorizer = authorize(address, key, 0);

  const transactionId = await fcl.mutate({
    cadence: `
      import MVPVote from 0xContractAddress

      transaction(candidateChoice: String) {

          prepare(voter: AuthAccount) {
              let ballot <- voter.load<@MVPVote.Ballot>(from: MVPVote.BallotStoragePath) ?? panic("Voter has no valid ballot")

              // Vote on the proposal
              ballot.vote(candidateChoice: candidateChoice)

              // Cast the vote by submitting it to the smart contract
              MVPVote.cast(ballot: <-ballot)
          }

      }
    `,
    proposer: authorizer,
    payer: authorizer,
    authorizations: [authorizer],
    args: (arg: any, t: any) => [arg(candidate, t.String)],
    limit: 50,
  });

  await fcl.tx(transactionId).onceSealed();
};
