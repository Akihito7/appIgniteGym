import { HStack, Heading, Text, VStack } from "native-base";
import { HistoryDataDTO } from "@dtos/HistoryDataDTO";

export function HistoryCard({ data }: { data: HistoryDataDTO }) {
    return (
        <HStack w={"full"} bg={'gray.500'} mb={4} rounded={'md'} p={4} alignItems={'center'} justifyContent={'space-between'}>
            <VStack flex={1} mr={8}>
                <Heading color={'gray.100'} fontSize={'lg'} mb={2} numberOfLines={1} fontFamily='heading' textTransform='capitalize'>
                    {data.group}
                </Heading>

                <Text color={'gray.200'} fontSize={'lg'} numberOfLines={2} textTransform='capitalize'>
                    {data.name}
                </Text>
            </VStack>
            <Text color={'gray.300'}>
                {data.hour}
            </Text>
        </HStack>
    )
}