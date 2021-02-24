import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Login from './pages/login';
import Home from './pages/home';
import Servicos from './pages/servicos';
import Sobre from './pages/sobre';
import Cadastro from './pages/cadastro';
import EsqueceuSenha from './pages/esqueceusenha';
import Cozinha from './pages/cozinha';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function Routes() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{
            headerStyle: {
              backgroundColor: '#7159c1',
            },
            headerTintColor: '#fff',
            headerTitle: '',
            headerShown: true,
            headerStatusBarHeight: 1,
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="EsqueceuSenha"
          component={EsqueceuSenha}
          options={{
            headerTransparent: true,
            headerShown: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="Cozinha"
          component={Cozinha}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
