import MVPVote from 0xf8d6e0586b0a20c7

// Transaction that registers an account to be a MVP candidate
transaction(name: String) {

  // Must be authorized by the admin and the candidate
  prepare(admin: AuthAccount, candidate: AuthAccount) {
    // Borrow a reference to the admin Resource
    let adminRef = admin.borrow<&MVPVote.Administrator>(from: MVPVote.AdminStoragePath)!

    // Register candidate and issue the candidate a ballot
    let ballot <- adminRef.registerCandidate(name: name)
    candidate.save<@MVPVote.Ballot>(<-ballot, to: MVPVote.BallotStoragePath)
  }

}