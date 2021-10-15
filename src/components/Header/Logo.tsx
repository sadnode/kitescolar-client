import { Text } from "@chakra-ui/react";

export function Logo() {
  return (
    <Text
      fontSize={["2xl", "3xl"]}
      fontWeight="bold"
      letterSpacing="tight"
      w="100"
    >
      Kits Faber-Castell
      <Text as="span" ml="1" color="green.500">;</Text>
    </Text>
  );
}
