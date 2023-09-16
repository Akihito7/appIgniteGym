import React, { useCallback, useState } from "react";
import { Text, VStack, SectionList, Flex, useToast } from "native-base";

import { AppError } from "../util/appError";
import { api } from "@services/axios";

import { HistoryCard } from "@components/HistoryCard";
import { HistoryHome } from "@components/HistoryHome";
import { Loading } from '@components/LoadingSpinner'
import { useFocusEffect } from "@react-navigation/native";
import { HistorySectionDTO } from "@dtos/HistorySectionDTO";


export function History() {

    const [isLoading, setIsLoading] = useState(false);
    const [exercises, setExercises] = useState<HistorySectionDTO[]>([]);
    const toast = useToast();


    async function fetchHistoryExercises() {

        try {
            setIsLoading(true);
            const response = await api.get(`/history`);

            setExercises(response.data);

        } catch (error) {
            const isAppError = error instanceof AppError;

            const title = isAppError ? error.message : 'Não foi possivel pegar o historico de exercicios'

            toast.show({
                title,
                placement: "top",
                bgColor: 'red.500'
            });

        } finally {
            setIsLoading(false)
        };

    }

    useFocusEffect(useCallback(() => {
        fetchHistoryExercises();
    }, []))

    return (

        <VStack flex={1}>
            {

                isLoading ? < Loading /> :
                    <>
                        <HistoryHome />


                        <SectionList
                            sections={exercises}
                            keyExtractor={item => item.id}

                            renderItem={({ item }) => (
                                <HistoryCard
                                    data={item}
                                />
                            )}

                            renderSectionHeader={({ section }) => {

                                return (
                                    <Text color={'gray.200'} fontWeight={'bold'} mt={8} mb={4}>
                                        {section.title}
                                    </Text>
                                )
                            }}


                            contentContainerStyle={exercises.length === 0 &&
                            {
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}

                            ListEmptyComponent={() => (

                                <Text color='white' textAlign='center'>

                                    Ainda não há exercicios registrados {'\n'}
                                    Vamos nos exercitar hoje?
                                </Text>

                            )}

                            px={6}
                        />
                    </>

            }
        </VStack>
    )
}