const createVote = async (state: any, proposal: any, vote: boolean, toast) => {
  const voteSend = [vote, state.value.wallet, 0];
  await state.value.contract.methods
    .createVote(voteSend, Math.ceil(Math.random() * 60000), proposal.id)
    .send({ from: state.value.wallet })
    .then((val) =>
      toast({
        title: "Vote submitted.",
        containerStyle: { fontSize: "0.75rem" },
        description: `Transaction hash: ${val.transactionHash}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    );
};
export default createVote;
