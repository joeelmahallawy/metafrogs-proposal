pragma solidity 0.8.12;
// SPDX-License-Identifier: UNLICENSED

import "../.deps/npm/@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MetaFrogProposal  {
    address owner;
    address governanceTokenAddress;
    address governanceTokenSupply;
    event ShowProposalResults(bytes32 Currentproposal, bool result, uint256 agrees, uint256 disagrees);

    mapping(uint16=>Vote) public Votes;
    bytes32[] public proposalIDs;
    mapping(bytes32=>Proposal) public AllProposals;

    constructor(address _governanceTokenAddress){
        owner=msg.sender;
        governanceTokenAddress=_governanceTokenAddress;
    }

    struct Vote {
        bool agreesWithProposal;
        address user;
        uint256 voteWeight;
    }

    struct Proposal {
        uint256 dateCreated;
        uint256 dateClosed;
        string title;
        string proposal;
        bytes32 id;
        uint16[] votes;
    }

    function createSomeData(bytes32 proposalID)public view returns(Vote memory){
        return Votes[AllProposals[proposalID].votes[0]];
    }

    // ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // HELPERS
    function getTimestamp()public view returns(uint256){
        return block.timestamp;
    }

    function randomHash(string memory _text)internal pure returns (bytes32){
        return keccak256(abi.encodePacked(_text));
    
    }
    function doesVoterExist(address user,bytes32 proposalID)public view returns(bool){
        for(uint256 i=0; i<AllProposals[proposalID].votes.length;i++){ // get proposal and loop thru it's votes
            if(Votes[AllProposals[proposalID].votes[i]].user==user){ //if user in in array, return true
                return true; 
            }
        }
        return false;
    }

    // ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // MUTATIONS
    function createProposal(Proposal memory _proposal) public {
        require(IERC20(governanceTokenAddress).balanceOf(msg.sender)>0);
        bytes32 hash=randomHash(_proposal.proposal); // get hash from proposal text
        uint16[] memory votes;
        AllProposals[hash] = Proposal(_proposal.dateCreated, _proposal.dateClosed, _proposal.title, _proposal.proposal, hash, votes); // put proposal in mapping by hash
        proposalIDs.push(hash); // push hash (id) into proposals array
    }

    function createVote(Vote memory _vote, uint16 voteID, bytes32 proposalID)public {
        require(IERC20(governanceTokenAddress).balanceOf(msg.sender)>0); // make sure user has tokens in wallet
        require(AllProposals[proposalID].dateClosed>block.timestamp); // make sure that we're not after the deadline
        require(!doesVoterExist(msg.sender,proposalID)); // make sure voter hasn't voted before

        uint256 voteWeight=IERC20(governanceTokenAddress).balanceOf(msg.sender);
        AllProposals[proposalID].votes.push(voteID); // get proposal and add the vote ID
        // voteIDs.push(voteID); // push vote id onto voteID array
        Votes[voteID]=Vote(_vote.agreesWithProposal, _vote.user, voteWeight); // add vote to mapping
    }


    // ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // Queries
    function getResults(bytes32 proposalID)public {
        require(owner==msg.sender); // only deployer can call
        require(AllProposals[proposalID].dateClosed<block.timestamp); // make sure that we are past the closing date
        uint256 agrees=0;
        uint256 disagrees=0;
        for(uint16 i=0; i<AllProposals[proposalID].votes.length;i++){ // loop thru current proposals votes
            if(Votes[AllProposals[proposalID].votes[i]].agreesWithProposal){ // if current vote agrees
                agrees+=Votes[AllProposals[proposalID].votes[i]].voteWeight; // increment agree counter
            }
            else{
                disagrees+=Votes[AllProposals[proposalID].votes[i]].voteWeight;
            }
        }

        if(agrees>=disagrees){ // if more votes agree, emit proposal ID with the result
            emit ShowProposalResults(proposalID, true,agrees,disagrees); 
        }
        else {
            emit ShowProposalResults(proposalID, false,agrees,disagrees);
        }
    }
    function getAllProposals()public view returns(Proposal[500] memory) {
        Proposal[500] memory proposals;
        for(uint256 i=0;i<proposalIDs.length;i++){
            proposals[i]=AllProposals[proposalIDs[i]];
        }
        return proposals;
    }
}
// [12312,1745313641, "My title", "my proposal", "0xe0e30bd0f4102022d490ffd0b3a2eceba8e0c06ae47209ec1293cf44a8156c1a", []]

