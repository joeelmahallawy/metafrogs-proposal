import { Box, Center, Text, Heading, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ProposalModal from "../components/proposalModal";
import loadWeb3 from "../helpers/loadContract";
import { web3 } from "../utils";
import { useAsyncFn } from "react-use";
import getAllProposals from "../helpers/getAllProposals";
import RenderProposal from "../components/renderProposal";

const IndexPage = () => {
  // type State = {
  //   wallet: string;
  //   contract: object;
  //   proposals: [];
  // };

  const [state, doFetch] = useAsyncFn(async () => {
    const wallet = await web3.eth.requestAccounts();
    const contract = await loadWeb3();
    const proposals = await getAllProposals(contract);
    return { wallet: wallet[0], contract, proposals };
  }, []);
  useEffect(() => {
    doFetch();
  }, []);

  return (
    <Center overflowY="scroll" flexDir="column" p="2.5%">
      {state.value?.proposals.map((pro, i) => (
        <RenderProposal state={state} proposal={pro} key={i} />
      ))}
      <Box mt={5}>
        <ProposalModal state={state.value} />
      </Box>
    </Center>
  );
};
export default IndexPage;
