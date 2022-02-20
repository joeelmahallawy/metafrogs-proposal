import { web3 } from "../utils";
const contractAddress = "0x21df24DEF7cbB762172a1cf114597ebC59e38Ce4";

const loadWeb3 = async () => {
  const contract = new web3.eth.Contract(
    [
      {
        inputs: [
          {
            internalType: "address",
            name: "_governanceTokenAddress",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "bytes32",
            name: "Currentproposal",
            type: "bytes32",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "result",
            type: "bool",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "agrees",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "disagrees",
            type: "uint256",
          },
        ],
        name: "ShowProposalResults",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        name: "AllProposals",
        outputs: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint8",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "dateCreated",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "dateClosed",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "proposal",
            type: "string",
          },
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint16",
            name: "",
            type: "uint16",
          },
        ],
        name: "Votes",
        outputs: [
          {
            internalType: "bool",
            name: "agreesWithProposal",
            type: "bool",
          },
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "voteWeight",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: "address",
                name: "user",
                type: "address",
              },
              {
                internalType: "uint8",
                name: "status",
                type: "uint8",
              },
              {
                internalType: "uint256",
                name: "dateCreated",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "dateClosed",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "title",
                type: "string",
              },
              {
                internalType: "string",
                name: "proposal",
                type: "string",
              },
              {
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
              },
              {
                internalType: "uint16[]",
                name: "votes",
                type: "uint16[]",
              },
            ],
            internalType: "struct MetaFrogProposal.Proposal",
            name: "_proposal",
            type: "tuple",
          },
        ],
        name: "createProposal",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "proposalID",
            type: "bytes32",
          },
        ],
        name: "createSomeData",
        outputs: [
          {
            components: [
              {
                internalType: "bool",
                name: "agreesWithProposal",
                type: "bool",
              },
              {
                internalType: "address",
                name: "user",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "voteWeight",
                type: "uint256",
              },
            ],
            internalType: "struct MetaFrogProposal.Vote",
            name: "",
            type: "tuple",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: "bool",
                name: "agreesWithProposal",
                type: "bool",
              },
              {
                internalType: "address",
                name: "user",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "voteWeight",
                type: "uint256",
              },
            ],
            internalType: "struct MetaFrogProposal.Vote",
            name: "_vote",
            type: "tuple",
          },
          {
            internalType: "uint16",
            name: "voteID",
            type: "uint16",
          },
          {
            internalType: "bytes32",
            name: "proposalID",
            type: "bytes32",
          },
        ],
        name: "createVote",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "proposalID",
            type: "bytes32",
          },
        ],
        name: "doesVoterExist",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getAllProposals",
        outputs: [
          {
            components: [
              {
                internalType: "address",
                name: "user",
                type: "address",
              },
              {
                internalType: "uint8",
                name: "status",
                type: "uint8",
              },
              {
                internalType: "uint256",
                name: "dateCreated",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "dateClosed",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "title",
                type: "string",
              },
              {
                internalType: "string",
                name: "proposal",
                type: "string",
              },
              {
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
              },
              {
                internalType: "uint16[]",
                name: "votes",
                type: "uint16[]",
              },
            ],
            internalType: "struct MetaFrogProposal.Proposal[25]",
            name: "",
            type: "tuple[25]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "proposalID",
            type: "bytes32",
          },
        ],
        name: "getResults",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "getTimestamp",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "proposalID",
            type: "bytes32",
          },
        ],
        name: "getVotesForProposal",
        outputs: [
          {
            components: [
              {
                internalType: "bool",
                name: "agreesWithProposal",
                type: "bool",
              },
              {
                internalType: "address",
                name: "user",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "voteWeight",
                type: "uint256",
              },
            ],
            internalType: "struct MetaFrogProposal.Vote[100]",
            name: "",
            type: "tuple[100]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "proposalIDs",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint8",
            name: "num",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "proposalID",
            type: "bytes32",
          },
        ],
        name: "setProposalStatus",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_user",
            type: "address",
          },
        ],
        name: "userHasActiveProposal",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    contractAddress
  );
  return contract;
};
export default loadWeb3;
