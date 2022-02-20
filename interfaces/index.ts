export type Proposal = [
  user: string,
  status: number,
  dateCreated: number,
  dateClosed: number,
  title: string,
  proposal: string,
  id: string,
  votes: number[]
];
export type ResultProposal = {
  status: string;
  user: string;
  dateClosed: string;
  dateCreated: string;
  id: string;
  proposal: string;
  title: string;
  votes: object[];
};

export type Votes = {
  agreesWithProposal: boolean;
  user: string;
  voteWeight: string;
};

export type MainState = {
  contract: any;
  wallet: string;
};
// export { Proposal, ResultProposal, MainState };
