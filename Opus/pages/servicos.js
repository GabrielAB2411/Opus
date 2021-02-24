import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialComunnityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Cozinha from './cozinha';
import ServicosGerais from './servicosGerais';
import Saude from './saude';
import Informatica from './informatica';
import Vet from './vet';
import Assist from './assist';
import Auto from './auto';
import Casa from './casa';

const Stack = createStackNavigator();

export default class Servicos extends Component {
  render() {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator
          initialRouteName={telaServicos}
          screenOptions={{
            gestureEnabled: true,
            cardOverlayEnabled: true,
            ...TransitionPresets.ModalPresentationIOS,
          }}
          mode="modal">
          <Stack.Screen
            name="Servicos"
            component={telaServicos}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Cozinha"
            component={Cozinha}
            options={{
              headerTitle: 'Cozinha',
              headerShown: false,
              headerStyle: {backgroundColor: '#7159c1'},
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
              headerTitleStyle: {fontWeight: 'bold'},
            }}
          />
          <Stack.Screen
            name="ServicosGerais"
            component={ServicosGerais}
            options={{
              headerTitle: 'Cozinha',
              headerShown: false,
              headerStyle: {backgroundColor: '#7159c1'},
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
              headerTitleStyle: {fontWeight: 'bold'},
            }}
          />
          <Stack.Screen
            name="Saude"
            component={Saude}
            options={{
              headerTitle: 'Cozinha',
              headerShown: false,
              headerStyle: {backgroundColor: '#7159c1'},
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
              headerTitleStyle: {fontWeight: 'bold'},
            }}
          />
          <Stack.Screen
            name="Casa"
            component={Casa}
            options={{
              headerTitle: 'Cozinha',
              headerShown: false,
              headerStyle: {backgroundColor: '#7159c1'},
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
              headerTitleStyle: {fontWeight: 'bold'},
            }}
          />
          <Stack.Screen
            name="Informatica"
            component={Informatica}
            options={{
              headerTitle: 'Cozinha',
              headerShown: false,
              headerStyle: {backgroundColor: '#7159c1'},
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
              headerTitleStyle: {fontWeight: 'bold'},
            }}
          />
          <Stack.Screen
            name="Vet"
            component={Vet}
            options={{
              headerTitle: 'Cozinha',
              headerShown: false,
              headerStyle: {backgroundColor: '#7159c1'},
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
              headerTitleStyle: {fontWeight: 'bold'},
            }}
          />
          <Stack.Screen
            name="Assist"
            component={Assist}
            options={{
              headerTitle: 'Cozinha',
              headerShown: false,
              headerStyle: {backgroundColor: '#7159c1'},
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
              headerTitleStyle: {fontWeight: 'bold'},
            }}
          />
          <Stack.Screen
            name="Auto"
            component={Auto}
            options={{
              headerTitle: 'Cozinha',
              headerShown: false,
              headerStyle: {backgroundColor: '#7159c1'},
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
              headerTitleStyle: {fontWeight: 'bold'},
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

function telaServicos({navigation}) {
  return (
    <LinearGradient
      style={styles.linearGradient}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={['#7159c1', '#27175E']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.btnMenu}
          onPress={() => navigation.openDrawer()}>
          <FontAwesome
            style={styles.iconeHeader}
            name="bars"
            color="#fff"
            size={22}
          />
          <Text style={styles.titulo}>Serviços</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.txt}>Selecione a categoria de serviço desejada.</Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.btnItem}
          onPress={() => {
            navigation.navigate('Cozinha');
          }}>
          <MaterialComunnityIcon
            style={styles.txtItem}
            name="food-fork-drink"
            color="#7159c1"
            size={18}
          />
          <Text style={styles.txtItem}>Cozinha</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnItem}
          onPress={() => {
            navigation.navigate('ServicosGerais');
          }}>
          <MaterialComunnityIcon
            style={styles.txtItem}
            name="worker"
            color="#7159c1"
            size={18}
          />
          <Text style={styles.txtItem}>Serviços Gerais</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.btnItem}
          onPress={() => {
            navigation.navigate('Saude');
          }}>
          <MaterialComunnityIcon
            style={styles.txtItem}
            name="medical-bag"
            color="#7159c1"
            size={18}
          />
          <Text style={styles.txtItem}>Saúde</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnItem}
          onPress={() => {
            navigation.navigate('Informatica');
          }}>
          <MaterialComunnityIcon
            style={styles.txtItem}
            name="laptop-chromebook"
            color="#7159c1"
            size={18}
          />
          <Text style={styles.txtItem}>Informática</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.btnItem}
          onPress={() => {
            navigation.navigate('Vet');
          }}>
          <MaterialComunnityIcon
            style={styles.txtItem}
            name="dog-service"
            color="#7159c1"
            size={18}
          />
          <Text style={styles.txtItem}>Vet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnItem}
          onPress={() => {
            navigation.navigate('Assist');
          }}>
          <MaterialComunnityIcon
            style={styles.txtItem}
            name="auto-fix"
            color="#7159c1"
            size={18}
          />
          <Text style={styles.txtItem}>Assistencia técnica</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.btnItem}
          onPress={() => {
            navigation.navigate('Auto');
          }}>
          <MaterialComunnityIcon
            style={styles.txtItem}
            name="car-side"
            color="#7159c1"
            size={18}
          />
          <Text style={styles.txtItem}>Automóveis</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnItem}
          onPress={() => {
            navigation.navigate('Casa');
          }}>
          <MaterialComunnityIcon
            style={styles.txtItem}
            name="home"
            color="#7159c1"
            size={18}
          />
          <Text style={styles.txtItem}>Casa</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  txt: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  btnMenu: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
  },
  iconeHeader: {
    marginLeft: 20,
  },
  header: {
    backgroundColor: '#7159c1',
    width: 390,
    marginBottom: 10,
  },
  titulo: {
    marginLeft: 120,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  txtItem: {
    color: '#7159c1',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnItem: {
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginTop: 20,
    backgroundColor: '#fff',
    width: 150,
    height: 100,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 15,
  },
  linearGradient: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
