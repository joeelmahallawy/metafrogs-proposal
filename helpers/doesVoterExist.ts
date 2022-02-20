const doesVoterExist = async (state, proposal) => {
  const voterExists = await state.value.contract.methods
    .doesVoterExist(state.value.wallet, proposal.id)
    .call();
  return voterExists;
};
export default doesVoterExist;
