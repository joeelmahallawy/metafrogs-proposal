import crypto from "crypto";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { MainState } from "../interfaces";
import React, { useState } from "react";
import randomHash from "../helpers/randomHash";
import getAllProposals from "../helpers/getAllProposals";
import addProposal from "../helpers/addProposal";
import Link from "next/link";

function ProposalModal({ state }: { state: MainState }) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const [proposals, setProposals] = useState({ title: "", text: "" });
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Button onClick={onOpen}>Create proposal</Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setIsLoading(true);
              addProposal(state, proposals)
                .then((val) => {
                  setIsLoading(false);
                  onClose();
                  return toast({
                    containerStyle: { fontSize: "0.75rem" },
                    title: "Proposal submitted.",
                    description: `Transaction hash: ${val.transactionHash}`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  });
                })
                .catch((err) => {
                  setIsLoading(false);
                  alert(err.message);
                });
            }}
          >
            <ModalHeader>Create a proposal</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  onChange={(e) => {
                    setProposals({
                      ...proposals,
                      title: e.currentTarget.value,
                    });
                  }}
                  ref={initialRef}
                  placeholder="Title"
                />
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>Proposal</FormLabel>
                <Textarea
                  onChange={(e) => {
                    setProposals({ ...proposals, text: e.currentTarget.value });
                  }}
                  placeholder="E.g. Allocate 10% of the community token supply to contributors"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                isLoading={isLoading}
                colorScheme="blue"
                type="submit"
                ml={3}
              >
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
export default ProposalModal;
