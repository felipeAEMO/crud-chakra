import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,Button,
FormControl,FormLabel,Input,Box} from "@chakra-ui/react";
import React, { useState } from 'react';
const model = ({data,setData,dataEdit,isOpen,onClose}) => {
const [name,setName] = useState(dataEdit.name || "");
const [email,setEmail] = useState(dataEdit.email || "");
const [password,setPassword] = useState(dataEdit.password || "");
const [telefone,setTelefone] = useState(dataEdit.telefone || "");
const [idade,setIdade] = useState(dataEdit.idade || "");    

const emailExist = () => {
    if(dataEdit.email !== email && data?.length) {
        return data.find((item) => item.email === email);
    }
    return false;
}

const passwordExist = () => {
    if(dataEdit.password !== password && data?.length) {
        return data.find((item) => item.password === password);
    }
    return false;
}

const telefoneExist = () => {
    if(dataEdit.telefone !== telefone && data?.length) {
        return data.find((item) => item.telefone === telefone);
    }
    return false;
}

const handleSave = () => {
    if(!name || !email || !password || !telefone || !idade) return;

    if(emailExist()) {
        return alert("E-mail já foi adicionado")
    }

    if(passwordExist()) {
        return alert("Senha já  adicionado")
    }

    if(telefoneExist()) {
        return alert("Esse telefone já foi cadastradi")
    }

    if(Object.keys(dataEdit).length) {
        data[dataEdit.index] = {name,email,password,telefone,idade};
    }

    const newArray = !Object.keys(dataEdit).length
    ? [...(data ? data : []),{name,email,password,telefone,idade}]
    : [...(data ? data : [])];

    localStorage.setItem("cad_cliente",JSON.stringify(newArray));
    setData(newArray);
    onClose();
};

return(
   
<>
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay/>
    <ModalContent>
        <ModalHeader>CRUD in React Js</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
            <FormControl display="flex" flexDir="column" gap={4}>
                <Box>
                    <FormLabel>Nome</FormLabel>
                    <Input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                    <FormLabel>E-mail</FormLabel>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <FormLabel>Senha</FormLabel>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <FormLabel>Telefone</FormLabel>
                    <Input type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)}/>
                    <FormLabel>Idade</FormLabel>
                    <Input type="number" value={idade} onChange={(e) => setIdade(e.target.value)}/>
                </Box>
            </FormControl>
        </ModalBody>
        <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
                ADICIONAR
            </Button>
            <Button colorScheme="red" onClick={onClose}>
                CANCELAR
            </Button>
        </ModalFooter>
    </ModalContent>
    </Modal>
</>
);
};

export default model;