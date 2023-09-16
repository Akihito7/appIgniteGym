import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useTheme, Box } from "native-base";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { useAuth } from "@contexts/AuthContext";

export function Routes() {
 
    const theme = DefaultTheme;
    const { colors } = useTheme();

    const { user } = useAuth();

    theme.colors.background = colors.gray[700]

    return (
        <Box flex={1} bg='gray.700'>
            <NavigationContainer theme={theme}>
                {user.token ? <AppRoutes /> : <AuthRoutes />}
            </NavigationContainer>
        </Box>
    )
};

// o NavigationContainer tem o background dele por padrão na cor branca, mas nos podemos mudar ele, sobreescrevendo, como fizemos acima! O box é usado pra envolver o navigationContainer porque as vezes na troca de screen pode demorar e ficar sem nenhuma tela sendo exibida por isso definimos uma cor de fundo pra quando isso acontencer