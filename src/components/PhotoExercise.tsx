import { Image, IImageProps } from "native-base";


type Props = IImageProps & {

}

export function PhotoExercise({ ...rest }: Props) {

    return (
        <Image
            w={'full'}
            h={80}
            rounded={"lg"}
            resizeMode="cover"
            {...rest}

        />
    )
}