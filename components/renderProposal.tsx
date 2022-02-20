import {
  Button,
  Center,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Image,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  useColorMode,
  Flex,
  Box,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ResultProposal, Votes } from "../interfaces";
import dateFormat, { masks } from "dateformat";
import createVote from "../helpers/createVote";
import { verify } from "crypto";
import getVotesForProposal from "../helpers/getVotesForProposal";
import doesVoterExist from "../helpers/doesVoterExist";
import anuraImg from "../attachments/anura_pic.png";
import RenderVotes from "./renderVotes";

const RenderProposal = ({
  state,
  proposal,
}: {
  state: any;
  proposal: ResultProposal;
}) => {
  const toast = useToast();
  const { toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [votes, setVotes] = useState([]);
  const [voterExist, setVoterExist] = useState<boolean>();

  return proposal.status != "1" ? (
    <>
      <Flex
        fontFamily="Arial"
        w="35%"
        // justifyContent="space-between"
        flexDir="column"
        p={5}
        border="1px solid yellow"
        borderRadius={5}
        _hover={{ bg: "gray.700", cursor: "pointer" }}
        mt={3}
        onClick={async () => {
          const userAlreadyVoted: boolean = await doesVoterExist(
            state,
            proposal
          );
          setVoterExist(userAlreadyVoted);
          const votesResult = await getVotesForProposal(state, proposal);
          setVotes([...votesResult]);
          onOpen();
        }}
      >
        <Heading fontWeight="extrabold" maxW="90%" color="white" fontSize="xl">
          {proposal.title}
        </Heading>
        <Center>
          <Text w="100%" mt={3} color="gray.400" noOfLines={2}>
            {proposal.proposal}
          </Text>
          {proposal.status == "0" ? (
            <Center
              borderRadius={10}
              w="10%"
              bg="green.500"
              color="white"
              p={1}
            >
              Active
            </Center>
          ) : (
            <Center borderRadius={10} w="10%" bg="red.500" p={2}>
              Closed
            </Center>
          )}
        </Center>
      </Flex>

      <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg="#24135c"
          border="2px solid green"
          borderRadius={10}
          color="white"
        >
          <ModalHeader pt={2} pb={2} color="gray.200">
            <Flex justifyContent="flex-end">
              <Box textAlign="right">
                <Text fontSize="sm">
                  Start date:{" "}
                  {dateFormat(+proposal.dateCreated, "mmm d, yyyy, h:MM TT ")}
                </Text>
                <Text fontSize="sm">
                  End date:{" "}
                  {dateFormat(+proposal.dateClosed, "mmm d, yyyy, h:MM TT ")}
                </Text>
              </Box>
            </Flex>{" "}
          </ModalHeader>

          <ModalBody>
            <Heading fontSize="1.75rem">{proposal.title}</Heading>
            <Text fontWeight="light" color="gray.300" mb={3} mt={3}>
              {proposal.proposal}
            </Text>
            <Center
              flexDir="column"
              w="100%"
              maxH="400px"
              overflowY="scroll"
              p={1}
            >
              <RenderVotes votes={votes} />
            </Center>
          </ModalBody>

          <ModalFooter>
            <Center mt={3} gap={3}>
              <Button
                onClick={async () => {
                  if (!voterExist) {
                    createVote(state, proposal, false, toast);
                  } else alert("You've already voted!");
                }}
                fontSize="1.5rem"
                p={"1.5rem"}
                _focus={{}}
                colorScheme="red"
              >
                No
              </Button>
              <Button
                onClick={async () => {
                  if (!voterExist) {
                    createVote(state, proposal, true, toast);
                  } else alert("You've already voted!");
                }}
                fontSize="1.5rem"
                p={"1.5rem"}
                _focus={{}}
                colorScheme="blue"
              >
                Yes
              </Button>
            </Center>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  ) : null;
};
export default RenderProposal;
