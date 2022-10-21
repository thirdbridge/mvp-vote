import MVPVote from 0xf8d6e0586b0a20c7

// Transaction that castd a vote ballot 
transaction(candidateChoice: String) {

    prepare(voter: AuthAccount) {
        // Retrieve the ballot from the voter's account
        // Throw an error if no ballot is available in the voter's account
        let ballot <- voter.load<@MVPVote.Ballot>(from: MVPVote.BallotStoragePath) ?? panic("Voter has no valid ballot")

        // Set the candidate vote choice on the ballot and cast it
        ballot.vote(candidateChoice: candidateChoice)
        MVPVote.cast(ballot: <-ballot)
    }   

}
 