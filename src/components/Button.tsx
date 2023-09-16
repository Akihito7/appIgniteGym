import { Button as ButtonNativeBase, Text, IButtonProps } from 'native-base';

type Props = IButtonProps & {
    title: string;
}

export function Button({title, variant, ...rest} : Props){
    return(
        <ButtonNativeBase
        w='full'
        h='14'
        borderRadius='md'
        bg={variant === 'outline' ? 'gray.700' : 'green.700'}
        borderWidth={variant === 'outline' ? 1 : 0}
        borderColor='green.500'
        _pressed={{
            bg:  'green.500'
        }}
        {...rest}
        >

            <Text
            color='white'
            fontFamily='heading'
            
            >
                {title}
            </Text>
        </ButtonNativeBase>    
    )
}