import { Box, ChakraProvider, theme } from "@chakra-ui/react";
import { AppProps } from "next/app";
import React from "react";
import bgImage from "../attachments/MetafrogMiniDaoBackground.png";
const MyApp = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider theme={theme}>
    <Box
      h="100vh"
      w="100vw"
      backgroundRepeat="repeat-y"
      backgroundPosition="center"
      backgroundSize="cover"
      bgImage={bgImage.src}
      zIndex="0"
    >
      <Component {...pageProps} />
    </Box>
  </ChakraProvider>
);

export default MyApp;
