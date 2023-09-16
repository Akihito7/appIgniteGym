import { Input as InputNativeBase, IInputProps, FormControl } from 'native-base';

type Props = IInputProps & {
    errorMessage?: string | null;

};

export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {

    const invalid = !!errorMessage || isInvalid;

    return (
        <FormControl isInvalid={invalid} mb={2}  >
            <InputNativeBase
                bg='gray.700'
                borderRadius='md'
                borderWidth={0}
                h={14}
                fontSize='md'
                color='white'
                placeholderTextColor='gray.300'
                isInvalid={invalid}

                _invalid={{
                    borderWidth: 1,
                    borderColor: 'red.600'
                }}

                {...rest}

                _focus={{
                    bg: 'gray.700',
                    borderWidth: 1,
                    borderColor: 'green.200'
                }}
            />

            <FormControl.ErrorMessage  >
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>

    )
}