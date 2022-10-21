import MVPVote from 0xf8d6e0586b0a20c7

// Simple script that returns the candidate registry with the vote count
pub fun main(): {String: Int} {
    return MVPVote.candidates
}