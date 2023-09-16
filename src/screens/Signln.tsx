import React from "react"
import { VStack, Image, Center, Text, Heading, ScrollView, Flex } from 'native-base';
import { Controller, useForm } from 'react-hook-form'

import LogoSvg from '../assets/logo.svg'
import BackgroundImg from '../assets/background.png'
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useAuth } from "@contexts/AuthContext";

export function Signln({ navigation }) {

    const { control, handleSubmit, reset } = useForm();

    const { signln } = useAuth()

     function handleSignln({ email, password } : {email: string, password: string}){
      signln(email,password);
    };

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
                />

                <Center my={24} >
                    <LogoSvg style={{ marginTop: 30 }} />
                    <Text color={'gray.100'} fontSize='sm' >
                        Treine sua mente e seu corpo
                    </Text>
                </Center>

                <Center >
                    <Heading mt={20} mb={6} color='gray.100' fontFamily='heading' fontSize='xl'>
                        Acesse sua conta
                    </Heading>


                    <Controller
                        name="email"
                        control={control}
                        render={({ field: { onChange, value } }) => (

                            <Input placeholder="Email"
                                autoCapitalize="none"
                                keyboardType="email-address"

                                onChangeText={onChange}
                                value={value}
                            />
                        )}

                    />

                    <Controller
                        name='password'
                        control={control}
                        render={({ field: { onChange, value } }) => (

                            <Input placeholder="Senha"
                                secureTextEntry

                                onChangeText={onChange}
                                value={value}
                            />
                        )}

                    />

                    <Button
                     title="Acessar"
                     onPress={handleSubmit(handleSignln)}
                     />
                </Center>

                <Center mt={24}>
                    <Text color='white' mb={6}>
                        Ainda não tem acesso?
                    </Text>

                    <Button title="Criar conta" variant="outline" onPress={() => navigation.navigate('signup')} />

                </Center>

            </VStack>
        </ScrollView>
    )
};

//default source faz com que essa imagem seja padrão assim ela irá carregar mais rapido, sem essa propriedade o react entende que essa imagem pode variar assim as vezes pode demorar mais tempo pra carregar porque ele ta procurando qual é 'imagem' que ta pra ser inserida ali