import { Center, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Votes } from "../interfaces";
import anuraImg from "../attachments/anura_pic.png";
const RenderVotes = ({ votes }) => {
  return votes.map((vote: Votes, i: number) => {
    return (
      <Center
        mt={3}
        key={i}
        justifyContent="space-between"
        p={3}
        // bg="gray.700"
        bg="#0b0b37"
        w="100%"
      >
        <Center>
          <Center w="40px" h="40px" bg="gray.700" borderRadius="50%" mr={3}>
            <Image w="85%" src={anuraImg.src} />
          </Center>

          <Text mr={3}>{`${vote.user.slice(0, 6)}...${vote.user.slice(
            -4
          )}`}</Text>
        </Center>
        <Text>{vote.agreesWithProposal ? "Yes" : "No"}</Text>
        {`${+vote.voteWeight / 1000}K RIBT`}
      </Center>
    );
  });
};
export default RenderVotes;
