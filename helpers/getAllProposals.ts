import { ResultProposal } from "../interfaces";
const getAllProposals = async (contract): Promise<ResultProposal[]> => {
  const proposals: ResultProposal[] = await contract.methods
    .getAllProposals()
    .call();
  const filteredProposals = proposals.filter((pro) => {
    return pro.title !== "";
  });
  return filteredProposals;
};
export default getAllProposals;
