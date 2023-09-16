import { Heading, VStack } from "native-base";

type Props = {
    title: string;
}
export function ScreenHeader({ title }: Props) {
    return (
        <VStack bg={'gray.500'} pt={20} pb={6} alignItems={'center'}>
            <Heading
                color={'gray.100'}
                textTransform="capitalize"
                fontSize={'xl'}
                fontFamily='heading'
                
            >

                {title}

            </Heading>
        </VStack>
    )
}