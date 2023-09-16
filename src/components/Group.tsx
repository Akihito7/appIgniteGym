import { Text, Pressable, IPressableProps } from "native-base";

type Props = IPressableProps & {
    title: string;
    isActived: boolean;
};

export function Group({ title, isActived, ...rest }: Props) {
    return (
        <Pressable
            bg='gray.500'
            alignItems={'center'}
            justifyContent={'center'}
            px={6}
            
            mr={4}
            h={10}
            rounded={4}
            overflow={'hidden'}
            borderWidth={1}
            borderColor={isActived ? 'green.500' : 'gray.500'}
           

            _pressed={{
                borderWidth: 1,
                borderColor: "green.500",
            }}
            {...rest}
        >
            <Text
                color={isActived ? 'green.500' : 'gray.200'}
                textTransform={'uppercase'}
            >
                {title}
            </Text>
        </Pressable>
    )
}