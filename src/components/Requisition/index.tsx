import { useCallback, useEffect, useState } from "react";
import { Button, Flex, Select, Stack, Spinner } from "@chakra-ui/react";

import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";

import { api } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import { Input } from "../Form/Input";
import { DropFiles } from "../Form/Dropzone";

interface IKit {
  id: string;
  code: string;
  description: string;
  start_year: string;
  end_year: string;
  created_at: Date;
}

interface IUserReq {
  numemp: string;
  nomfun: string;
  numcad: string;
  numcpf: string;
}

interface IDepReq {
  cpf_tit: string;
  cpfdep: string;
  dtbase: string;
  dtnascdep: string;
  empresa: string;
  ne: string;
  nome: string;
  nomedependente: string;
}

interface RequistionData {
  nomfun: string;
  user_cpf: string;
  kit_id: string;
}

export function Requistition() {
  const { user } = useAuth();

  const { register, handleSubmit, formState } = useForm();

  const handleRequisition: SubmitHandler<RequistionData> = async (values) => {
    console.log(values);
  }

  const [loading, setLoading] = useState(false);
  const [userReq, setUserReq] = useState<IUserReq>();
  const [depReq, setDepReq] = useState<IDepReq[]>([]);
  const [kit, setKit] = useState<IKit[]>([]);

  const loadKits = useCallback(async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await api.get(`registrationkit`);
    setKit(response.data);
  }, []);

  const loadDependents = useCallback(async () => {
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await api.get("users/dependents", {
      params: {
        cpf_tit: user?.cpf
      }
    });
    setUserReq(response.data.user);
    setDepReq(response.data.dependents);

    setLoading(false);
  }, [user]);

  useEffect(() => {
    
    loadDependents();
    loadKits();
    
  }, [loadDependents, loadKits]);

  const style = {
    backgroundColor: "#181B23"
  }

  return (
    <>
      {loading ? 
        (
          <Flex align="center" justify="center" mt="5">
            <Spinner color="green" />
          </Flex>
        ) 
          : 
        (
          <Flex as="form" flexDir="column" maxW={500} margin="0 auto" onSubmit={handleSubmit(handleRequisition)}>
            <Stack spacing="4">
              
              <Input type="text" value={userReq?.nomfun} {...register('nomfun')} />
              <Input type="text" value={userReq?.numcpf} {...register('user_cpf')} />
              <Select color="#FFF" colorScheme="gray.900" {...register('kit_id')}  focusBorderColor="green.500">
                <option style={style}>Selecione uma opção</option>
                {kit.map(k => (
                  <option key={k.id} value={k.id} style={style}>{k.description}</option>
                ))}
              </Select>

              {/* {depReq.map(d => (
                <>
                  <Input disabled={true} value={d.nomedependente} />
                  <Select color="#FFF" colorScheme="gray.900" focusBorderColor="green.500">
                    <option style={style}>Selecione uma opção</option>
                    {kit.map(k => (
                      <option key={k.id} value={k.id} style={style}>{k.description}</option>
                    ))}
                  </Select>
              </>
              ))} */}

              <DropFiles />

              <Button type="submit" mt="6" colorScheme="green" size="lg" w="100%" isLoading={formState.isSubmitting}>
                Solicitar
              </Button>
            </Stack>        
          </Flex>
        )
      }
    </>
  );
}
