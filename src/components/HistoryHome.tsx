import { Heading, VStack } from "native-base"

export function HistoryHome(){
    return(
        <VStack pt={20} pb={6} mb={4} bg={'gray.500'} alignItems={'center'} >
            <Heading color={'gray.100'} fontSize={'xl'} fontFamily='heading'>
                Histórico de exercícios
            </Heading>
        </VStack>
    )
}