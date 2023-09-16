import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { HStack, Image, VStack, Heading, Icon, Text } from "native-base";
import { Entypo } from '@expo/vector-icons'


import { ExerciseDTO } from "../dtos/ExerciseDTO";
import { api } from "@services/axios";
type Props = TouchableOpacityProps & {
    data: ExerciseDTO;
}
export function ExerciseCard({ data, ...rest }: Props) {
    return (
        <TouchableOpacity {...rest} >
            <HStack
                mt={6}
                alignItems="center"
                bg={"gray.500"}
                rounded={"md"}
                p={2}



            >
                <Image
                    source={{
                        uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`
                    }}
                    alt="imagem do exercicio"

                    h={"16"}
                    w="16"
                    rounded={'md'}
                    mr={4}
                    resizeMode="cover"
                />

                <VStack flex={1} >
                    <Heading
                        color={'white'}
                        fontSize={'lg'}
                        fontFamily='heading'
                        mb={1}

                    >
                        {data.name}
                    </Heading>
                    <Text
                        numberOfLines={2}
                        color={"gray.200"}
                    >
                        {data.repetitions} repetições X { data.series } séries
                    </Text>

                </VStack>

                <Icon
                    as={Entypo}
                    name="chevron-right"
                    size={'xl'}
                    color={'gray.200'}
                />


            </HStack>
        </TouchableOpacity>
    )
}