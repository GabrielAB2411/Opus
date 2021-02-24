import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar,
  Animated,
  Keyboard,
  Alert,
} from 'react-native';
console.ignoredYellowBox = true;
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FonstistoIcon from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      offset: new Animated.ValueXY({x: 0, y: 95}),
      opacity: new Animated.Value(0),
      logo: new Animated.ValueXY({x: 220, y: 220}),
    };
  }
  UserLoginFunction = () => {
    const {email} = this.state;
    const {senha} = this.state;

    fetch('http://theopusapp.online/php/login.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,

        senha: senha,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        // If server response message same as Data Matched
        if (responseJson === 'Data Matched') {
          //Then open Profile activity and send user email to profile activity.
          this.props.navigation.navigate('Home', {Email: email});
        } else {
          Alert.alert('Aviso', responseJson);
        }
      })
      .catch(error => {
        console.error(error);
      });
    Keyboard.dismiss();
  };
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  componentDidMount = () => {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
    const {offset} = this.state;
    const {opacity} = this.state;
    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 2,
        bounciness: 25,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  };
  _keyboardDidShow = () => {
    Animated.parallel([
      Animated.timing(this.state.logo.x, {
        toValue: 140,
        duration: 150,
      }),
      Animated.timing(this.state.logo.y, {
        toValue: 140,
        duration: 150,
      }),
    ]).start();
  };

  _keyboardDidHide = () => {
    Animated.parallel([
      Animated.timing(this.state.logo.x, {
        toValue: 220,
        duration: 200,
      }),
      Animated.timing(this.state.logo.y, {
        toValue: 220,
        duration: 200,
      }),
    ]).start();
  };
  render() {
    const {offset} = this.state;
    const {opacity} = this.state;
    const {logo} = this.state;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <LinearGradient
          style={styles.linearGradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#7159c1', '#27175E']}>
          <Animated.View
            style={[
              styles.container,
              {opacity: opacity, transform: [{translateY: offset.y}]},
            ]}>
            <View style={styles.containerLogo}>
              <Animated.Image
                style={{
                  width: logo.x,
                  height: logo.y,
                  marginTop: 20,
                }}
                source={require('../images/logo.png')}
              />
            </View>

            <View style={styles.containerApp}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FonstistoIcon
                  style={styles.iconeEmail}
                  name="email"
                  color="#fff"
                  size={22}
                />
                <TextInput
                  onChangeText={email => this.setState({email})}
                  style={styles.input}
                  placeholder="Digite seu email"
                  autoCorrect={false}
                />
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialCommunityIcons
                  style={styles.iconeEmail}
                  name="onepassword"
                  color="#fff"
                  size={22}
                />
                <TextInput
                  onChangeText={senha => this.setState({senha})}
                  maxLength={20}
                  style={styles.input}
                  placeholder="Digite sua senha"
                  autoCorrect={false}
                  secureTextEntry={true}
                />
              </View>

              <TouchableOpacity
                style={styles.btnLogin}
                onPress={this.UserLoginFunction}>
                <AntDesignIcon name="login" color="#fff" size={22} />
                <Text style={styles.btnLoginTxt}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnCadastrar}
                onPress={() => {
                  this.props.navigation.navigate('Cadastro');
                }}>
                <Text style={styles.btnCadastrarTxt}>Crie sua conta</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnEsqueci}
                onPress={() => {
                  this.props.navigation.navigate('EsqueceuSenha');
                }}>
                <Text style={styles.btnCadastrarTxt}>Esqueci minha senha</Text>
              </TouchableOpacity>
              <StatusBar backgroundColor="#7159c1" barStyle="light-content" />
            </View>
          </Animated.View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  iconeEmail: {
    marginBottom: 5,
  },

  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLogo: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    marginTop: 30,
  },
  containerApp: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    marginTop: 100,
  },
  input: {
    width: 280,
    marginBottom: 10,
    color: '#fff',
    fontSize: 15,
    borderRadius: 7,
    padding: 8,
    fontWeight: 'bold',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  btnLogin: {
    color: '#fff',
    backgroundColor: '#6BFF4A',
    width: 300,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginTop: 10,
    flexDirection: 'row',
  },
  btnLoginTxt: {
    textAlign: 'center',
    paddingLeft: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  btnCadastrar: {
    marginTop: 15,
    flexDirection: 'row',
  },
  btnCadastrarTxt: {
    color: '#fff',
    fontWeight: 'bold',
  },
  btnEsqueci: {
    marginTop: 5,
  },
  linearGradient: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
