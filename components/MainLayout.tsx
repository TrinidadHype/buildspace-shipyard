import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Box, Center, Spacer, Stack } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { useWallet } from "@solana/wallet-adapter-react";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { connected } = useWallet();

  return (
    <div className={styles.container}>
      <Head>
        <title>Plank Owners</title>
        <meta name="The NFT collection for Shipyard Crew" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        w="full"
        h="calc(100vh)"
        bgImage={connected ? "" : "url(/home-background.svg)"}
        backgroundPosition="center"
      >
        <Stack w="full" h="calc(100vh)" justify="center">
          <Navbar />

          <Spacer />

          <Center>{children}</Center>

          <Spacer />

          <Center>
            <Box marginBottom={4} color="white">
              <a href="https://twitter.com/trinidadhype" target="_blank" rel="noopener noreferrer">
                built by @TrinidadHype{" "}
              </a>
            </Box>
          </Center>
        </Stack>
      </Box>
    </div>
  );
};

export default MainLayout;
