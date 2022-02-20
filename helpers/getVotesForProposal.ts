import { Votes } from "../interfaces";

const getVotesForProposal = async (state, proposal) => {
  const votes: Votes[] = await state.value.contract.methods
    .getVotesForProposal(proposal.id)
    .call();
  const filteredVotes = votes.filter((vote) => {
    return vote.voteWeight != "0";
  });
  const finalVoteArray = filteredVotes.map((vote) => {
    return {
      agreesWithProposal: vote.agreesWithProposal,
      user: vote.user,
      voteWeight: vote.voteWeight,
    };
  });
  return finalVoteArray;
};

export default getVotesForProposal;
