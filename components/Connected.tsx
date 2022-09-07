import { Container, VStack, Heading, Image, Button, Text, HStack } from "@chakra-ui/react";

const Connected: React.FC = () => {
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

      <Button bgColor="accent" color="white" maxW="380px">
        <Text>Mint your buildooor.</Text>
      </Button>
    </VStack>
  );
};

export default Connected;
