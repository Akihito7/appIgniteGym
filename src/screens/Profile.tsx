import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Center, ScrollView, Text, VStack, Skeleton, useToast } from "native-base";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAuth } from "@contexts/AuthContext";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { AppError } from "../util/appError";
import { api } from "@services/axios";



const schema = yup.object().shape({
    oldPassword: yup.string().required('Informe a senha antiga'),
    newPassword: yup.string().required('Informe a nova senha').min(6, 'A senha deve conter no mínimo 6 dígitos'),
    confirmNewPassword: yup.string().required('Confirme a nova senha').oneOf([yup.ref('newPassword')], 'As senhas devem ser iguais')
});

type InfoLoginProps = {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export function Profile() {

    const toast = useToast();
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const [photoIsLoading, setPhotoIsLoading] = useState(false);
    const { user } = useAuth();
    const nameStorage = '@akihitogym:user';


    async function handleNewPhoto() {
        const newPhoto = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: false,
            aspect: [4, 4]

        });

        if (newPhoto.canceled) return;

        if (newPhoto?.assets && newPhoto.assets[0]?.uri) {

            const { uri } = newPhoto.assets[0];

            const photoInfo = await FileSystem.getInfoAsync(uri);

            if (photoInfo.size && (photoInfo.size / 1024) / 1024 > 5) {
                return toast.show({
                    title: "Imagem muito grande, escolha uma imagem até 5MB",
                    placement: 'top',
                    bgColor: 'red.500',
                })
            }

            const fileExtension = uri.split('.').pop();

            const photoFile = {
                name: `${user!.name}.${fileExtension}`.toLocaleLowerCase(),
                uri,
                type: `${newPhoto.assets[0].type}/${fileExtension}`
            } as any;

            console.log(user?.token);

            const userPhotoFormUpload = new FormData();
            userPhotoFormUpload.append('avatar', photoFile);

            console.log(userPhotoFormUpload)

            await api.patch('/users/avatar', userPhotoFormUpload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${user?.token}`
                }
            });

            toast.show({
                title: 'Foto atualizada com sucesso',
                placement: 'top',
                bgColor: 'green.500'
            });
        }
    }

    async function handleSignupForm(infoLogin: InfoLoginProps) {

        try {

            await api.put('/users', {
                name: user.user.name,
                password: infoLogin.newPassword,
                old_password: infoLogin.oldPassword

            });

            toast.show({
                title: 'Senha alterada com sucesso',
                placement: 'top',
                bgColor: 'green.500'
            });

            await AsyncStorage.removeItem(nameStorage);

            const informationsLogin = {
                email: user.user.email,
                password: infoLogin.newPassword,
            }

            await AsyncStorage.setItem(nameStorage, JSON.stringify(informationsLogin));

            reset();

        } catch (error) {
            const isAppError = error instanceof AppError;

            const title = isAppError ? error.message : 'Não foi possivel mudar a senha'

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            });
        }
    }





    return (
        <ScrollView >
            <VStack >
                <ScreenHeader title="Perfil" />

                <Center mt={4} px={8}>

                    {
                        photoIsLoading ?
                            <Skeleton
                                w={33}
                                h={33}
                                startColor='gray.500'
                                endColor='gray.400'
                                rounded='full'
                                mb={4}
                            />

                            :
                            <UserPhoto
                                source={{ uri: user.user.avatar ? `${api.defaults.baseURL}/avatar/${user.user.avatar}` : `${api.defaults.baseURL}/avatar/userPhotoDefault.png` }}
                                alt='Imagem do usúario'
                                size={33}
                                mb={4}
                            />

                    }
                    <TouchableOpacity
                        onPress={handleNewPhoto}
                    >
                        <Text color='green.500' mb={8}>
                            Alterar Foto
                        </Text>
                    </TouchableOpacity>


                    <Input
                        placeholder="Nome"
                        bg='gray.500'
                        value={user.user.name}
                        isReadOnly={true}

                    />

                    <Input
                        placeholder="E-mail"
                        bg='gray.500'
                        value={user.user.email}
                        isReadOnly={true}

                    />
                </Center>

                <VStack px={8}>
                    <Text
                        color='gray.100'
                        fontWeight='bold'
                        fontSize='md'
                    >
                        Alterar senha
                    </Text>

                    <Center pt={4}>

                        <Controller
                            name="oldPassword"
                            control={control}
                            render={({ field: { onChange, value } }) => (

                                <Input
                                    bg='gray.500'
                                    placeholder="Senha antiga"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    value={value}

                                    errorMessage={errors.oldPassword?.message}
                                />
                            )}


                        />

                        <Controller
                            name="newPassword"
                            control={control}
                            render={({ field: { onChange, value } }) => (

                                <Input
                                    bg='gray.500'
                                    placeholder="Nova senha"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    value={value}

                                    errorMessage={errors.newPassword?.message}

                                />
                            )}
                        />

                        <Controller
                            name="confirmNewPassword"
                            control={control}
                            render={({ field: { onChange, value } }) => (

                                <Input
                                    bg='gray.500'
                                    placeholder="Atualizar nova senha"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.confirmNewPassword?.message}

                                />
                            )}
                        />


                        <Button
                            mt={4}
                            mb={2}
                            title="Atualizar"
                            onPress={handleSubmit(handleSignupForm)}
                        />

                    </Center>
                </VStack>
            </VStack>
        </ScrollView>



    )
}