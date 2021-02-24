import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

export default class EsqueceuSenha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  recuperaSenha = () => {
    const {email} = this.state;

    fetch('http://theopusapp.online/php/recuperacao.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (
          responseJson === 'O e-mail com sua senha foi enviado com sucesso !'
        ) {
          Alert.alert('Aviso', responseJson);
        }
        if (responseJson === 'Digite um e-mail válido !') {
          Alert.alert('Erro', responseJson);
        }
        if (email === '') {
          Alert.alert('Erro', 'Campo de email vazio !');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <LinearGradient
        style={styles.linearGradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#7159c1', '#27175E']}>
        <View style={styles.Container}>
          <Text style={styles.Titulo}>Recuperar senha</Text>
          <Text style={styles.Texto}>
            Insira abaixo o seu email, para que possamos te enviar um email para
            gerar sua nova senha.
          </Text>
          <TextInput
            onChangeText={email => this.setState({email})}
            style={styles.input}
            placeholder="Digite seu email cadastrado"
            autoCorrect={false}
          />
          <TouchableOpacity
            style={styles.activeStyle}
            onPress={this.recuperaSenha}>
            <Text style={styles.btnLoginTxt}>Recuperar senha</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  inactiveStyle: {
    color: '#fff',
    backgroundColor: '#A4A4A4',
    width: 300,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginTop: 10,
  },
  btnLoginTxt: {
    fontWeight: 'bold',
    color: '#fff',
  },
  activeStyle: {
    color: '#fff',
    backgroundColor: '#6BFF4A',
    width: 300,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginTop: 10,
  },
  Texto: {
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 40,
    marginLeft: 40,
    textAlign: 'center',
    fontSize: 16,
    marginTop: 80,
    justifyContent: 'center',
  },
  Titulo: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 24,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
    width: 300,
    textAlign: 'center',
  },
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  linearGradient: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  input: {
    width: 300,
    marginBottom: 10,
    color: '#fff',
    fontSize: 16,
    borderRadius: 7,
    padding: 10,
    fontWeight: 'bold',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    marginTop: 40,
  },
});
