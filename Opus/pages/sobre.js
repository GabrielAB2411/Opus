import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  Image,
  Animated,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class Servicos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      largura: new Animated.Value(0),
      altura: new Animated.Value(30),
      opacidade: new Animated.Value(0),
    };
  }
  componentDidMount = () => {
    const {largura} = this.state;
    const {altura} = this.state;
    const {opacidade} = this.state;
    Animated.sequence([
      Animated.timing(largura, {
        toValue: 370,
        duration: 1000,
      }),
      Animated.timing(altura, {
        toValue: 490,
        duration: 1000,
      }),
      Animated.timing(opacidade, {
        toValue: 1,
        duration: 1000,
      }),
    ]).start();
  };
  render() {
    const {largura} = this.state;
    const {altura} = this.state;
    const {opacidade} = this.state;
    return (
      <LinearGradient
        style={styles.linearGradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#7159c1', '#27175E']}>
        <View>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.btnMenu}
              onPress={() =>
                this.props.navigation.dispatch(DrawerActions.openDrawer())
              }>
              <FontAwesome
                style={styles.iconeHeader}
                name="bars"
                color="#fff"
                size={22}
              />
              <Text style={styles.titulo}>Sobre</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Animated.View
          style={{
            backgroundColor: '#191919',
            marginLeft: 10,
            marginRight: 10,
            borderRadius: 5,
            marginTop: 15,
            width: largura,
            height: altura,
          }}>
          <Animated.View style={{opacity: opacidade}}>
            <Image
              style={{
                width: 170,
                height: 170,
                alignSelf: 'center',
              }}
              source={require('../images/logo.png')}
            />
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                marginTop: 5,
                marginLeft: 10,
              }}>
              {''} {''} Nós da equipe Opus buscamos através da nossa plataforma,
              ajudar quem enfrenta dificuldades em encontrar um emprego, ou até
              mesmo pra quem busca uma renda extra no final do mês. E
              reconhecemos que no cenário atual do mundo, todos, inclusive nós,
              temos obrigação de ajudar da maneira que podemos e por isso nossa
              plataforma ficará disponível por tempo indeterminado de graça, sem
              nenhuma tarifa para divulgar ou anunciar seus serviços.
            </Text>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                marginTop: 10,
                marginLeft: 10,
              }}>
              {''} {''}Esperamos que vocês aproveitem todos os recursos que
              oferecemos para vocês!
            </Text>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                marginTop: 1,
                marginLeft: 10,
              }}>
              {''} {''}Para qualquer comentário ou sugestão entre em contato
              através de opusappoficial@gmail.com
            </Text>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                marginTop: 10,
                marginLeft: 10,
              }}>
              {''} Atenciosamente,
            </Text>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                marginTop: 1,
                marginLeft: 10,
                marginBottom: 5,
              }}>
              {''} Equipe Opus.
            </Text>
          </Animated.View>
        </Animated.View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
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
    marginLeft: 135,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
