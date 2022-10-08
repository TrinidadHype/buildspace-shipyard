import { Container, VStack, Heading, Image, Button, Text, HStack } from "@chakra-ui/react";
import { MouseEventHandler, useCallback, useEffect, useMemo, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Metaplex, walletAdapterIdentity, CandyMachine } from "@metaplex-foundation/js";
import { useRouter } from "next/router";

const Connected: React.FC = () => {
  const { connection } = useConnection();
  const walletAdapter = useWallet();
  const [candyMachine, setCandyMachine] = useState<CandyMachine>();
  const [isMinting, setIsMinting] = useState(false);
  const router = useRouter();

  const metaplex = useMemo(() => {
    return Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter));
  }, [connection, walletAdapter]);

  useEffect(() => {
    if (!metaplex) return;

    metaplex
      .candyMachines()
      .findByAddress({
        address: new PublicKey("4J44PoDuYkYHh84Ppj4g9vc1JMTtiXbKqytbfrUCHdoP"),
      })
      .run()
      .then((candyMachine) => {
        console.log(candyMachine);
        setCandyMachine(candyMachine);
      })
      .catch((error) => {
        alert(error);
      });
  }, [metaplex]);

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {
      console.log("button clicked");
      if (event.defaultPrevented) return;

      if (!walletAdapter.connected || !candyMachine) {
        console.log("returning");
        return;
      }

      try {
        setIsMinting(true);
        const nft = await metaplex.candyMachines().mint({ candyMachine }).run();
        console.log(nft);
        router.push(`/newMint?mint=${nft.nft.address.toBase58()}`);
      } catch (error) {
        alert(error);
      } finally {
        setIsMinting(false);
      }
    },
    [metaplex, walletAdapter, candyMachine]
  );

  return (
    <VStack spacing={20}>
      <Container>
        <VStack spacing={8}>
          <Heading color="white" as="h1" size="2xl" noOfLines={1} textAlign="center">
            Welcome Buildooor.
          </Heading>

          <Text color="bodyText" fontSize="xl" textAlign="center">
            Each buildooor is randomly generated and can be staked to recieve{" "}
            <Text as="b">$BLD</Text>. Use your <Text as="b">$BLD</Text> to upgrade your buildooor
            and recieve perks within the community.
          </Text>
        </VStack>
      </Container>
      <HStack spacing={10}>
        <Image src="avatar1.png" alt="buildooor one" />
        <Image src="avatar2.png" alt="buildooor two" />
        <Image src="avatar3.png" alt="buildooor three" />
        <Image src="avatar4.png" alt="buildooor four" />
        <Image src="avatar5.png" alt="buildooor five" />
      </HStack>

      <Button
        bgColor="accent"
        color="white"
        maxW="380px"
        onClick={handleClick}
        isLoading={isMinting}
      >
        <Text>Mint your buildooor.</Text>
      </Button>
    </VStack>
  );
};

export default Connected;
