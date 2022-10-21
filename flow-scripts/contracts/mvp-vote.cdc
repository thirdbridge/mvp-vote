// Smart contract that tallies up votes for mvp candidates
// In this contract, every candidate gets to vote and can be elected
pub contract MVPVote {

    // Paths to resources storage on user accounts
    pub let AdminStoragePath: StoragePath
    pub let BallotStoragePath: StoragePath

    // Punlic candidate registry that tracks vote counts
    pub var candidates: {String: Int}

    // Ballot resource that is required to cast a vote
    pub resource Ballot {
        pub var candidateChoice: String?

        init() {
            self.candidateChoice = nil
        }

        // The vote method allows the owner of the ballot resource to select their candidate
        // The choice can always be changed up until the ballot is casted
        pub fun vote(candidateChoice: String) {
            pre {
                // Pre method validation that the candidate exists
                MVPVote.candidates[candidateChoice] != nil: "Cannot vote for a candidate that doesn't exist"
            }

            self.candidateChoice = candidateChoice
        }
    }

    // Administration resource that is required to register a candidate and issue a ballot 
    pub resource Administrator {
        pub fun registerCandidate(name: String): @Ballot {
            pre {
                // Pre method validation that the candidate is not already in our registry
                MVPVote.candidates[name] == nil: "Candidate already registered"
            }

            // Initialize the candidate in our registry and generate a ballot for the candidate
            MVPVote.candidates[name] = 0
            return <-create Ballot()
        }
    }

    // Public method to vote for a candidate by casting a ballot (ballot gets destroyed in the process)
    pub fun cast(ballot: @Ballot) {
        pre {
            // Validation pre method that the candidate is in our registry or that the vote is voided (nil)
            ballot.candidateChoice == nil || MVPVote.candidates[ballot.candidateChoice!] != nil: "Cannot vote for a candidate that doesn't exist"
        }

        if (ballot.candidateChoice != nil) {
            // Increment the candidate's vote count
            self.candidates[ballot.candidateChoice!] = self.candidates[ballot.candidateChoice!]! + 1 
        }

        // Destroy the ballot because it has been tallied
        destroy ballot
    }

    init() {
        self.AdminStoragePath = /storage/admin
        self.BallotStoragePath = /storage/ballot
        self.candidates = {}

        // The account on which this contract is deployed is the admin of the voting process
        self.account.save<@Administrator>(<-create Administrator(), to: self.AdminStoragePath)
    }
}
 