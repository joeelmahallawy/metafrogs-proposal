import { MainState, Proposal } from "../interfaces";
import randomHash from "./randomHash";

const addProposal = async (state: MainState, proposals) => {
  const weekInMilliseconds = 24 * 7 * 60 * 60 * 1000;
  const proposal: Proposal = [
    state.wallet,
    0,
    Date.now(),
    Date.now() + weekInMilliseconds,
    proposals.title,
    proposals.text,
    randomHash(),
    [],
  ];
  const sendProposal = await state.contract.methods
    .createProposal(proposal)
    .send({ from: state.wallet });
  return sendProposal;
};
export default addProposal;
