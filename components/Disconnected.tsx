import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Container, VStack, Heading, Button, Text } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { MouseEventHandler, useCallback } from "react";

const Disconnected: React.FC = () => {
  const modalState = useWalletModal();
  const { wallet, connect } = useWallet();

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (event.defaultPrevented) return;

      if (!wallet) {
        modalState.setVisible(true);
      } else {
        connect().catch(() => {});
      }
    },
    [wallet, connect, modalState]
  );

  return (
    <Container>
      <VStack w="xl" spacing={20}>
        <Heading color="white" as="h1" size="2xl" noOfLines={2} textAlign="center">
          Claim your buildooor. Earn $BLD. Level UP.
        </Heading>
        <Button bgColor="accent" color="white" maxW="380px" onClick={handleClick}>
          <Text mr="5px">Become a buildooor.</Text>
          <ArrowForwardIcon />
        </Button>
      </VStack>
    </Container>
  );
};

export default Disconnected;
