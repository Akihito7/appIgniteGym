import React, { useCallback, useEffect, useState } from "react";
import { Center, FlatList, HStack, Text, VStack, useToast } from "native-base";
import { Header } from "@components/Header";
import { Group } from "@components/Group";
import { ExerciseCard } from "@components/ExerciseCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppError } from "../util/appError";
import { api } from "@services/axios";

import { ExerciseDTO } from "../dtos/ExerciseDTO";


export function Home() {

    const [Groups, setGroups] = useState([]);
    const [groupSelected, setGroupSelected] = useState('antebraço');
    const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
    const toast = useToast();

    const navigate = useNavigation()

    function handleOpenExerciseDetails(exercise: ExerciseDTO) {
        navigate.navigate('exercise', exercise );
    };

    async function fetchGroups() {


        try {
            const response = await api.get('/groups/');

            setGroups(response.data)

        } catch (error) {

            const isAppError = error instanceof AppError;

            const title = isAppError ? error.message : 'Erro no servidor, tente novamente';

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            });
        }
    };

    async function fetchExercises() {
        try {

            const response = await api.get(`/exercises/bygroup/${groupSelected}`)

            setExercises(response.data)

        } catch (error) {
            const isAppError = error instanceof AppError;

            const title = isAppError ? error.message : 'Não foi possivel pegar os exercicios'

            toast.show({
                title,
                placement: "top",
                bgColor: 'red.500'
            });
        }
    }

    useEffect(() => {
        fetchGroups();
    }, []);

    useFocusEffect(useCallback(() => {
        fetchExercises()
    }, [groupSelected]))


    return (
        <VStack flex={1} >
            <Header />

            <FlatList
                data={Groups}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <Group
                        title={item}
                        isActived={groupSelected === item}
                        onPress={() => setGroupSelected(item)}
                    />
                )}

                horizontal
                maxH={10}
                minH={10}
                my={10}
                showsHorizontalScrollIndicator={false}

                _contentContainerStyle={{
                    px: 10,
                }}
            />

            <VStack
                px={8}
                flex={1}
            >
                <HStack justifyContent={'space-between'}>
                    <Text
                        color='gray.200'
                        fontWeight='bold'
                        fontSize='md'
                    >
                        Exercícios
                    </Text>
                    <Text
                        color='gray.200'
                        fontSize='md'
                    >
                        {exercises.length}
                    </Text>
                </HStack>

                <FlatList
                    data={exercises}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <ExerciseCard
                            data={item}
                            onPress={() => handleOpenExerciseDetails(item)}
                        />
                    )}

                    showsVerticalScrollIndicator={false}

                    mb={4}
                />


            </VStack>
        </VStack>
    )
}