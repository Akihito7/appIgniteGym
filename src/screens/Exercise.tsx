import React, { useEffect, useState } from "react";
import { HStack, ScrollView, Text, VStack, Box, useToast } from "native-base";
import { ExerciseHome } from "@components/ExerciseHome";
import { PhotoExercise } from "@components/PhotoExercise";
import { Button } from "@components/Button";

import { useRoute } from "@react-navigation/native";

import SeriesSvg from '../assets/series.svg'
import RepeticoesSvg from '../assets/repetitions.svg'
import { ExerciseDTO } from "../dtos/ExerciseDTO";
import { api } from "@services/axios";
import { AppError } from "../util/appError";

export function Exercise() {

    const routes = useRoute();
    const exercise: ExerciseDTO = routes.params;
    const toast = useToast();

    async function handleSendExerciseConcluded(exercise_id: string) {
        try {
           
            const response = await api.post(`/history/`, {exercise_id});

            toast.show({
                title: 'Exericio adicionado ao seu historico',
                placement: "top",
                bgColor: 'green.500'
            });



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

    return (
        <VStack flex={1}>
            <ExerciseHome
                exercise={exercise}
            />

            <ScrollView>
                <VStack mt={8} px={6}>

                    <Box
                        rounded={'lg'}
                        bgColor='red.500'
                        overflow='hidden'

                    >
                        <PhotoExercise
                            source={{
                                uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`
                            }}
                            alt="gif do exercicio"
                        />
                    </Box>

                    <VStack

                        bg="gray.500"
                        rounded="lg"
                        mt={4}
                        pt={7}
                        pb={4}
                        px={4}
                    >
                        <HStack px={4} mb={6}>

                            <SeriesSvg fontSize={4} />
                            <Text
                                color='gray.100'
                                fontSize={'md'}
                                ml={2}
                                flex={1}
                            >
                                {exercise!.series} Séries
                            </Text>

                            <RepeticoesSvg fontSize={4} />
                            <Text
                                color='gray.100'
                                fontSize='md'
                                ml={2}
                            >
                                {exercise!.repetitions} repetições
                            </Text>
                        </HStack>

                        <Button
                            title="Marcar como realizado"
                            onPress={() => handleSendExerciseConcluded(exercise.id)}
                        />
                    </VStack>
                </VStack>

            </ScrollView>


        </VStack>
    )
}