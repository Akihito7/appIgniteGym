import React from "react";

import { HStack, VStack, Heading, Text, Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import { UserPhoto } from "./UserPhoto";
import { MaterialIcons } from "@expo/vector-icons"

import { useAuth } from "@contexts/AuthContext";
import { api } from "@services/axios";

export function Header() {

    const { logout, user } = useAuth();

    return (

        <HStack
            bg={"gray.500"}
            alignItems={'center'}
            justifyContent={'space-between'}
            pt={20}
            pb={7}
            px={8}
        >


            <HStack alignItems={'center'} >
                <UserPhoto
                    size={16}
                    source={{ uri: user.user.avatar ? `${api.defaults.baseURL}/avatar/${user.user.avatar}` : `${api.defaults.baseURL}/avatar/userPhotoDefault.png` }}
                    alt="imagem do usúario"
                    mr={4}
                />
                <VStack >
                    <Text
                        color={"gray.100"}
                        fontSize={"md"}
                    >
                        Olá
                    </Text>
                    <Heading
                        color={'white'}
                        fontSize={"md"}
                        fontFamily='heading'
                    >
                        Guilherme
                    </Heading>
                </VStack>
            </HStack>
            <TouchableOpacity
                onPress={logout}
            >
                <Icon
                    as={MaterialIcons}
                    name="logout"
                    color="gray.200"
                    size={7}
                />
            </TouchableOpacity>

        </HStack>

    )
}