import AsyncStorage from "@react-native-async-storage/async-storage";

const refreshStorage = "@akihitogym:refreshtoken";
const tokenStorage = "@akihitogym:token";

export async function getRefreshToken() {

    const refresh_token = await AsyncStorage.getItem(refreshStorage);
    
    const refresh_token_parse = refresh_token ? JSON.parse(refresh_token) : ''

    return refresh_token_parse;
};

export async function getToken() {

    const token = await AsyncStorage.getItem(tokenStorage);
    
    const token_parse = token ? JSON.parse(token) : ''

    return token_parse;
};

export async function saveRefreshToken(refresh_token : string){
    await AsyncStorage.setItem(refreshStorage, JSON.stringify(refresh_token));
};

export async function saveToken(token : string){
    await AsyncStorage.setItem(tokenStorage, JSON.stringify(token));
};