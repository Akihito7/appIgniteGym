import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Signln } from '@screens/Signln';
import { Signup } from '@screens/Singup';

type AuthRoutes = {
    signln: undefined;
    signup: undefined;
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;


export function AuthRoutes() {

    const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen
                name='signln'
                component={Signln}
            />
            <Screen
                name='signup'
                component={Signup}
            />
        </Navigator>
    )
};