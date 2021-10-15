import { Flex, Text, Button, Stack } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { GiPencilRuler } from "react-icons/gi";

import { Input } from "../../components/Form/Input";
import { useAuth } from '../../contexts/AuthContext';

type SignInFormData = {
  cpf: number;
  ne: number;
}

const signInFormSchema = yup.object().shape({
  cpf: yup.string().required(),
  ne: yup.string().required(),
});

export function LoginPage() {
  const { Login } = useAuth();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async ({ cpf, ne }) => {
    await Login({ cpf: Number(cpf), ne: Number(ne) });
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack>
          <Flex align="center" justify="center" flexDir="column">
            <GiPencilRuler size={50} />
            <Text mt="3" fontSize="lg">Kit Escolar - Faber-Castell</Text>
          </Flex>
          <Input 
            type="text" 
            // name="cpf" 
            error={formState.errors.cpf}
            label="CPF" 
            {...register('cpf')} 
          /> 

          <Input 
            type="password" 
            error={formState.errors.ne} 
            // name="ne" 
            label="NE" 
            {...register('ne')} 
          /> 
        </Stack>
        <Button type="submit" mt="6" colorScheme="green" size="lg" isLoading={formState.isSubmitting}>
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}