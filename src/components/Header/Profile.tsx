import { Flex, Fade, Box, Text, Avatar, useDisclosure } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";

export function Profile() {
  const { isOpen, onToggle } = useDisclosure()

  const { user, Logout } = useAuth();

  function LogoutHeader() {
    Logout();
    window.location.reload();
  }

  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>{user?.name}</Text>
      </Box>

      <Avatar onClick={onToggle} cursor="pointer" size="md" name={user?.name} />

      <Fade in={isOpen}>
        <Box
          p="13px 20px 13px"
          color="white"
          ml="4"
          bg="gray.700"
          rounded="md"
          shadow="md"
        >
          <Box 
            cursor="pointer"
            onClick={LogoutHeader}
          >
            Sair
          </Box>
        </Box>
      </Fade>
    </Flex>
  );
}
