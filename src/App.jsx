import './App.css';
import {EditIcon,DeleteIcon} from "@chakra-ui/icons";
import { useEffect,useState } from 'react';
import React, { useState } from 'react';
import Model from "./components/index";
import {Flex,Box,Button,useDisclosure,Table,Thead,Tr,Th,Tbody,Td,useBreakpointValue} from "@chakra-ui/react";

const App = () => {
  const {isOpen,onOpen,onClose} = useDisclosure();
  const [data,setData] = useState([]);
  const [dataEdit,setDataEdit] = useState({});

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(() => {
    const db_costumer = localStorage.getItem("cad_cliente")
    ? JSON.parse(localStorage.getItem("cad_cliente"))
    : [];

    setData(db_costumer);
  }, [setData]);

  const handleRemove = (email) => {
    const Arraynew = data.filter((item) => item.email !== email);
    setData(Arraynew);
    localStorage.setItem("cad_cliente", JSON.stringify(Arraynew));
  }
  return (
   <FLex h="90vh" align="center" justify="center" fontSize="20px" fontFamily = "roboto-flex">
        <Box maxW={700} w="90%" h="90vh" py={8} px={2}>
          <Button colorScheme="green" onClick={() => [setDataEdit({}),onOpen()]}>
            ADD...
          </Button>
          <Box overflow="auto" height="100%">
            <Table mt="6">
              <Thead>
                <Tr>
                  <Th maxW={isMobile ? 5 : 100} fontSize="20px">Nome</Th>
                  <Th maxW={isMobile ? 5 : 100} fontSize="20px">E-Mail</Th>
                  <Th maxW={isMobile ? 5 : 100} fontSize="20px">Password</Th>
                  <Th maxW={isMobile ? 5 : 100} fontSize="20px">Telefone</Th>
                  <Th maxW={isMobile ? 5 : 100} fontSize="20px">Idade</Th>
                  <Th p={0}></Th>
                  <Th p={0}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map(({name,email,password,telefone,idade}, index) => (
                  <Tr key={index} cursor="pointer" hover={{bg:"gray.100"}}>
                      <Td maxW={isMobile ? 5 : 100}>{name}</Td>
                      <Td maxW={isMobile ? 5 : 100}>{email}</Td>
                      <Td maxW={isMobile ? 5 : 100}>{password}</Td>
                      <Td maxW={isMobile ? 5 : 100}>{telefone}</Td>
                      <Td maxW={isMobile ? 5 : 100}>{idade}</Td>
                      <Td>
                        <EditIcon
                        fontSize={25}
                        onClick={() =>[setDataEdit({name,email,password,telefone,idade,index}),
                        onOpen(),  
                        ]}
                        />
                      </Td>
                      <Td p={0}>
                          <DeleteIcon
                          fontSize={25}
                          onClick={() => handleRemove(email)}
                          />  
                      </Td>
                      <Td p={0}>
                          <DeleteIcon
                          fontSize={25}
                          onClick={() => handleRemove(password)}
                          />  
                      </Td>
                      <Td p={0}>
                          <DeleteIcon
                          fontSize={25}
                          onClick={() => handleRemove(telefone)}
                          />  
                      </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
        {isOpen &&(
          <Model
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
          />
        )}
   </FLex>
  );
};

export default App;
