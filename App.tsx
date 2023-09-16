import React from 'react';
import { StatusBar } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { NativeBaseProvider } from "native-base";


import { Loading } from '@components/LoadingSpinner';
import { Signln } from '@screens/Signln';
import { THEME } from './src/theme';
import { Signup } from '@screens/Singup';
import { Routes } from '@routes/index';

import { AuthContextProvider } from '@contexts/AuthContext';


export default function App() {

  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (

    <NativeBaseProvider theme={THEME}>
      <StatusBar barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />

      <AuthContextProvider>
        {!fontsLoaded ? <Loading /> : <Routes />}
      </AuthContextProvider>
    </NativeBaseProvider>

  );
}

