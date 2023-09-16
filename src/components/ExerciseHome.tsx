import { VStack, Icon, HStack, Heading, Text } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import BodySvg from '../assets/body.svg'
import { ExerciseDTO } from "../dtos/ExerciseDTO";

export function ExerciseHome({exercise} : {exercise: ExerciseDTO}) {

    const { navigate } = useNavigation();

    function handleBackHome() {
        navigate('home');
    }
    return (
        <VStack pt={16} pb={10} bg='gray.500' px={6}>


            <TouchableOpacity onPress={handleBackHome}>
                <Icon
                    as={AntDesign}
                    name="arrowleft"
                    color='green.500'
                    size='xl'
                    mb={4}

                />
            </TouchableOpacity>

            <HStack alignItems='center'>
                <Heading
                    fontSize='xl'
                    color='gray.100'
                    flex={1}
                    fontFamily='heading'


                >
                    {exercise.name}
                </Heading>


                <BodySvg fontSize={2} />
                <Text
                    color='gray.300'
                    fontSize='md'
                    textTransform='capitalize'
                    ml={1}
                >
                    {exercise.group}
                </Text>

            </HStack>

        </VStack>
    )
}