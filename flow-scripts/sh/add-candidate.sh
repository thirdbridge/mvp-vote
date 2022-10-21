# Simple shell script to add a candidate

# Create a new account on the blockchain for the candidate
flow accounts create
# Build the transaction with both the admin (emulator-account) and the new candidate's account as authorizer
flow transactions build ./transactions/add-candidate.cdc $1 --authorizer emulator-account,$1 --filter payload --save ./transaction.rlp -y
# Sign the transaction with both the admin account and the new candidate's account
flow transactions sign ./transaction.rlp --signer $1 --save ./transaction.rlp --filter payload -y
flow transactions sign ./transaction.rlp --signer emulator-account --save ./transaction.rlp --filter payload -y
# Send the transaction to the blockchain
flow transactions send-signed ./transaction.rlp -y
# Remove the saved transaction file locally
rm ./transaction.rlp
