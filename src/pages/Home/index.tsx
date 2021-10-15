import { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5"

import { Header } from "../../components/Header";
import { PDFViewer } from "../../components/PDFViewer";
// import { Requistition } from "../../components/Requisition";

export function Home() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Header />
      <Text
      mt="10"
       fontSize="3xl"
       textAlign="center"
      >
        Termos para solicitação do Kit Escolar
      </Text>
      <Text
        fontSize="lg"
        color="gray.500"
        textAlign="center"
        transition="10"
        _hover={{
          color: "green.300"
        }}
        onClick={openModal}
        cursor="pointer"
      >
        Acesse o termo clicando aqui
      </Text>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Termos"
      >
        <Flex
          align="center"
          justify="center"
          flexDir="column"
        >
          <Flex 
            align="center"
            justify="space-between"
          >
            <IoClose cursor="pointer" color="000" size={25} onClick={closeModal} />
          </Flex>
          <PDFViewer />
        </Flex>
      </Modal>
    
      <Flex 
        align="center"
        justify="center"
        margin="0 auto"
        maxW={600}
        mt="20"
      >
        <Box
          p={["6", "8"]}
          bg="gray.800"
          borderRadius={8}
          pb="4"
          w="100%"
        >
          <Text fontSize="lg" mb="4" textAlign="center">Solicitar Kit Escolar</Text>

          {/* <Requistition /> */}
        </Box>
      </Flex>  
      
    </>
  );
}
