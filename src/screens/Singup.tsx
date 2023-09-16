import React from "react"
import { VStack, Image, Center, Text, Heading, ScrollView, useToast } from 'native-base';
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { api } from "@services/axios";
import axios from 'axios';

import LogoSvg from '../assets/logo.svg'
import BackgroundImg from '../assets/background.png'
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Alert } from "react-native";
import { AppError } from "../util/appError";


interface SignUpProps {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const schema = yup.object().shape({
    name: yup.string().required('Informe seu nome'),
    email: yup.string().required('Informe seu email').email("Informe um email válido"),
    password: yup.string().required().min(6, 'A senha deve ter no minimo 6 dígitos'),
    confirmPassword: yup.string().required().oneOf([yup.ref('password')], "as senhas precisam ser iguais")

})

export function Signup({ navigation }: any) {
    const toast = useToast();

    const { control, handleSubmit, reset, formState: { errors } } = useForm<SignUpProps>({
        resolver: yupResolver(schema)
    });

    async function handleSignupForm({ name, email, password }: SignUpProps) {


        try {
            const response = await api.post("/users", {name, email, password});
            console.log(response.data)
            
        } catch (error) {
           const isAppError = error instanceof AppError;
           
           const title = isAppError ? error.message : 'Erro no servidor, tente novamente mais tarde'
            
           toast.show({
            title,
            placement: 'top',
            bgColor: 'red.500'
    
           });
           
        }
        
        //reset();
    }
    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
            <VStack flex={1}
                px={33}
            >

                <Image
                    source={BackgroundImg}
                    defaultSource={BackgroundImg}
                    alt="Pessoas treinando"
                    resizeMode="contain"
                    position="absolute"
                    top={-20}
                />

                <Center my={24} >
                    <LogoSvg style={{ marginTop: 30 }} />
                    <Text color={'gray.100'} fontSize='sm' >
                        Treine sua mente e seu corpo
                    </Text>
                </Center>

                <Center >
                    <Heading mb={6} color='gray.100' fontFamily='heading' fontSize='xl'>
                        Criar sua conta
                    </Heading>

                    <Controller
                        name="name"
                        control={control}

                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Nome"
                                autoCapitalize="words"
                                keyboardType="default"

                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.name?.message}


                            />
                        )}
                    />


                    <Controller
                        name="email"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Email"
                                autoCapitalize="none"
                                keyboardType="email-address"

                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.email?.message}
                            />
                        )}

                    />
                    <Controller

                        name="password"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Senha"
                                secureTextEntry

                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.password?.message}
                            />
                        )}

                    />

                    <Controller

                        name="confirmPassword"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Confirme a senha"
                                secureTextEntry

                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.confirmPassword?.message}
                                returnKeyLabel="send"
                                onSubmitEditing={handleSubmit(handleSignupForm)}
                            />
                        )}

                    />

                    <Button
                        mb={16}
                        title="Criar e acessar"
                        onPress={handleSubmit(handleSignupForm)}

                    />
                </Center>

                <Center >

                    <Button
                        title="Voltar para o login"
                        variant="outline"
                        onPress={() => navigation.navigate('signln')}
                    />

                </Center>

            </VStack>
        </ScrollView>
    )
};

//default source faz com que essa imagem seja padrão assim ela irá carregar mais rapido, sem essa propriedade o react entende que essa imagem pode variar assim as vezes pode demorar mais tempo pra carregar porque ele ta procurando qual é 'imagem' que ta pra ser inserida ali