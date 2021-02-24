import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Alert,
  RefreshControl,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextInputMask} from 'react-native-masked-text';

export default class Servicos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cel: '',
      cep: '',
      dados: {
        logradouro: '',
        uf: '',
        localidade: '',
        bairro: '',
      },
      data: [],
      num: '',
      compl: '',
      senha: '',
      SenhaNova: '',
      inputSenha: false,
      styleSenha: false,
      txtSenha: '',
    };
  }
  alterarDados = () => {
    const {SenhaNova} = this.state;
    const {cep} = this.state;
    const {cel} = this.state;
    const {logradouro} = this.state.dados;
    const {uf} = this.state.dados;
    const {localidade} = this.state.dados;
    const {bairro} = this.state.dados;
    const {num} = this.state;
    const {compl} = this.state;

    fetch('http://theopusapp.online/php/alterarDados.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        SenhaNova: SenhaNova,
        cep: cep,
        cel: cel,
        localidade: localidade,
        logradouro: logradouro,
        numero: num,
        bairro: bairro,
        complemento: compl,
        estado: uf,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        Alert.alert('Aviso', responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  };
  alterarSenha = () => {
    const {senha} = this.state;
    fetch('http://theopusapp.online/php/verificaSenha.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        senha: senha,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson === 'True') {
          this.setState({inputSenha: true});
          this.setState({styleSenha: true});
          this.setState({txtSenha: ''});
        }
        if (responseJson === 'False') {
          this.setState({inputSenha: false});
          this.setState({styleSenha: false});
          this.setState({txtSenha: 'Senha inválida'});
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  buscarCep = cep => {
    if (this.state.cep.length < 9) {
      Alert.alert('Atenção', 'Digite um CEP válido');
    }
    this.setState({
      dados: {
        logradouro: '',
        uf: '',
        localidade: '',
        bairro: '',
      },
    });
    fetch(`https://viacep.com.br/ws/${this.state.cep}/json/`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          dados: data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  componentDidMount = () => {
    fetch('http://theopusapp.online/php/perfil.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        var data2 = responseJson;
        this.setState({data: data2[0]});
        console.log(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  };
  onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchData(
      setTimeout(() => {
        this.setState({refreshing: false});
      }, 2000),
    );
  };
  fetchData = () => {
    fetch('http://theopusapp.online/php/perfil.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        var data2 = responseJson;
        this.setState({data: data2[0]});
        console.log(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  };
  render() {
    const {data} = this.state;
    return (
      <LinearGradient
        style={styles.linearGradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#7159c1', '#27175E']}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }>
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
                <Text style={styles.titulo}>Perfil</Text>
              </TouchableOpacity>
            </View>
            <Image
              style={styles.avatar}
              source={{
                uri: data.foto,
              }}
            />
            <Text
              style={{
                color: '#FFF',
                textAlign: 'center',
                fontWeight: 'bold',
                marginTop: 7,
              }}>
              {data.nome}
            </Text>
            <Text
              style={{
                color: '#FFF',
                textAlign: 'center',
                fontSize: 9,
                marginTop: 2,
              }}>
              {data.email}
            </Text>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#fff',
                marginTop: 20,
              }}
            />
            <Text style={styles.txt2}>Login</Text>
            <TextInput
              onEndEditing={this.alterarSenha}
              style={
                this.state.inputSenha
                  ? styles.inputSenhaValida
                  : styles.inputSenhaInvalida
              }
              placeholder={'Senha'}
              placeholderTextColor={'#FFF'}
              secureTextEntry={true}
              onChangeText={senha => this.setState({senha})}
            />
            <Text style={styles.txtSenha}>{this.state.txtSenha}</Text>
            <TextInput
              editable={this.state.inputSenha}
              style={
                this.state.inputSenha
                  ? styles.inputNovaSenha
                  : styles.inputNovaSenhaInvisivel
              }
              placeholder={'Nova senha'}
              placeholderTextColor={this.state.inputSenha ? '#fff' : '#737373'}
              secureTextEntry={true}
              onChangeText={SenhaNova => this.setState({SenhaNova})}
            />
            <TextInputMask
              value={this.state.cel}
              onChangeText={cel => this.setState({cel})}
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) ',
              }}
              style={styles.input}
              placeholder={data.fone}
              placeholderTextColor={'#FFF'}
            />

            <Text style={styles.txt2}>Endereço</Text>
            <TextInputMask
              onEndEditing={this.buscarCep}
              value={this.state.cep}
              onChangeText={cep => this.setState({cep})}
              type={'zip-code'}
              style={styles.input}
              placeholder={data.cep}
              underlineColorAndroid={'transparent'}
              placeholderTextColor={'#FFF'}
            />
            <TextInput
              style={styles.input}
              placeholder={data.uf}
              placeholderTextColor={'#FFF'}
              value={this.state.dados.uf}
              onChangeText={uf => this.setState({uf})}
              editable={false}
            />
            <TextInput
              style={styles.input}
              placeholder={data.cidade}
              placeholderTextColor={'#FFF'}
              value={this.state.dados.localidade}
              onChangeText={localidade => this.setState({localidade})}
              editable={false}
            />
            <TextInput
              style={styles.input}
              placeholder={data.bairro}
              placeholderTextColor={'#FFF'}
              value={this.state.dados.bairro}
              onChangeText={bairro => this.setState({bairro})}
              editable={false}
            />
            <TextInput
              style={styles.input}
              placeholder={data.rua}
              placeholderTextColor={'#FFF'}
              value={this.state.dados.logradouro}
              onChangeText={logradouro => this.setState({logradouro})}
              editable={false}
            />
            <TextInput
              style={styles.input}
              placeholder={data.num}
              placeholderTextColor={'#FFF'}
              onChangeText={num => this.setState({num})}
            />
            <TextInput
              style={styles.input}
              placeholder={data.complemento}
              placeholderTextColor={'#FFF'}
              onChangeText={compl => this.setState({compl})}
            />
            <TouchableOpacity
              style={styles.btnAltera}
              onPress={this.alterarDados}>
              <Text style={styles.btnAlteraTxt}>Alterar dados</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  inputNovaSenhaInvisivel: {
    marginTop: 5,
    alignSelf: 'center',
    height: 30,
    color: '#737373',
    borderBottomColor: '#737373',
    borderBottomWidth: 1,
    fontWeight: 'bold',
    width: 300,
    marginRight: 30,
    fontSize: 9,
    marginLeft: 10,
  },
  txtSenha: {
    color: '#ff3333',
    fontWeight: 'bold',
    fontSize: 9,
    marginLeft: 276,
  },
  btnAlteraTxt: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  btnAltera: {
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 30,
    backgroundColor: '#6BFF4A',
    width: 150,
    height: 35,
    borderRadius: 5,
    textAlign: 'center',
    justifyContent: 'center',
  },
  txtInput: {
    color: '#FFF',
    marginLeft: 40,
    marginTop: 15,
    fontSize: 10,
  },
  input: {
    marginTop: 5,
    alignSelf: 'center',
    height: 30,
    color: '#fff',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    fontWeight: 'bold',
    width: 300,
    marginRight: 30,
    fontSize: 9,
    marginLeft: 10,
  },
  inputNovaSenha: {
    marginTop: 5,
    alignSelf: 'center',
    height: 30,
    color: '#fff',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    fontWeight: 'bold',
    width: 300,
    marginRight: 30,
    fontSize: 9,
    marginLeft: 10,
  },
  inputSenhaInvalida: {
    marginTop: 5,
    alignSelf: 'center',
    height: 30,
    color: '#fff',
    borderBottomColor: '#ff3333',
    borderBottomWidth: 1,
    fontWeight: 'bold',
    width: 300,
    marginRight: 30,
    fontSize: 9,
    marginLeft: 10,
  },
  inputSenhaValida: {
    marginTop: 5,
    alignSelf: 'center',
    height: 30,
    color: '#fff',
    borderBottomColor: '#6BFF4A',
    borderBottomWidth: 1,
    fontWeight: 'bold',
    width: 300,
    marginRight: 30,
    fontSize: 9,
    marginLeft: 10,
  },
  txt: {
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  txt2: {
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 30,
    marginTop: 35,
    fontSize: 16,
    marginBottom: 7,
  },
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
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 35,
    alignSelf: 'center',
  },
});
