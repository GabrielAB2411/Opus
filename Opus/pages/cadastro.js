/* eslint-disable react/jsx-no-duplicate-props */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import {TextInputMask} from 'react-native-masked-text';
import {BarPasswordStrengthDisplay} from 'react-native-password-strength-meter';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

export default class Cadastro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      txtSenha: '',
      txtConfSenha: '',
      email: '',
      cpf: '',
      ConfSenha: '',
      senha: '',
      validity: Boolean,
      valida: true,
      cep: '',
      cel: '',
      comple: '',
      numero: '',
      nasc: '',
      sexo: '',
      msgCad: '',
      msgBemVindo: '',
      msgLogin: '',
      corTxtVermelho: Boolean,
      dados: {
        logradouro: '',
        uf: '',
        localidade: '',
        bairro: '',
      },
    };
  }

  UserRegistrationFunction = () => {
    const {email} = this.state;
    const {senha} = this.state;
    const {nome} = this.state;
    const {cpf} = this.state;
    const {cep} = this.state;
    const {cel} = this.state;
    const {comple} = this.state;
    const {numero} = this.state;
    const {logradouro} = this.state.dados;
    const {uf} = this.state.dados;
    const {localidade} = this.state.dados;
    const {bairro} = this.state.dados;
    const {nasc} = this.state;
    const {sexo} = this.state;

    fetch('http://theopusapp.online/php/cadastro.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: nome,
        email: email,
        senha: senha,
        cpf: cpf,
        fone: cel,
        cidade: localidade,
        rua: logradouro,
        numero: numero,
        bairro: bairro,
        complemento: comple,
        cep: cep,
        estado: uf,
        nascimento: nasc,
        sexo: sexo,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        // Showing response message coming from server after inserting records.
        this.setState({msgCad: responseJson});
        if (
          responseJson ===
            'Não conseguimos efetuar o seu cadastro, tente novamente.' ||
          'O email informado já existe ! '
        ) {
          this.setState({
            msgBemVindo: 'Sinto muito',
            msgLogin:
              'Por favor, retorne a página de cadastro e tente novamente.',
            corTxtVermelho: true,
          });
        }
        if (responseJson === 'Cadastro realizado com êxito !') {
          this.setState({
            msgBemVindo: 'Seja bem vindo',
            msgLogin:
              'Vá para a página de login e desfrute dos recursos que a nossa plataforma tem à oferecer !',
            corTxtVermelho: false,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  confirmacaoSenha = () => {
    if (this.state.senha !== this.state.ConfSenha) {
      this.setState({validity: true});
      this.setState({txtConfSenha: 'Senhas não conferem'});
    } else {
      this.setState({validity: false});
      this.setState({txtConfSenha: ''});
    }
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

  ValidaCPF = () => {
    const {cpf} = require('cpf-cnpj-validator');
    var valido = cpf.isValid(this.state.cpf);
    if (valido === false) {
      Alert.alert('Atenção', 'Digite um CPF válido !');
    }
  };

  ValidaCel = () => {
    if (this.state.cel.length < 11) {
      Alert.alert('Atenção', 'Digite um número de telefone válido !');
    }
  };

  onChange = () => {
    if (this.state.senha.length < 8) {
      this.setState({txtSenha: 'Sua senha precisa ter pelo menos 8 digitos'});
    } else {
      this.setState({txtSenha: ''});
    }
  };

  validaEmail = () => {
    const {email} = this.state;
    fetch('http://theopusapp.online/php/validarEmail.php', {
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
        if (responseJson === 'Email Válido') {
          console.log('email válido');
        } else {
          Alert.alert('Aviso', 'Digite um email válido !');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    const Levels = [
      {
        label: 'Muito curta',
        labelColor: '#ff2900',
        activeBarColor: '#ff2900',
      },
      {
        label: 'Fraca',
        labelColor: '#ff6900',
        activeBarColor: '#ff6900',
      },
      {
        label: 'Médio',
        labelColor: '#f3d331',
        activeBarColor: '#f3d331',
      },
      {
        label: 'Suficiente',
        labelColor: '#84FF62',
        activeBarColor: '#84FF62',
      },
      {
        label: 'Forte',
        labelColor: '#00ff6b',
        activeBarColor: '#00ff6b',
      },
    ];

    const sexo = [
      {label: 'Masculino', value: 'Masculino'},
      {label: 'Feminino', value: 'Feminino'},
      {label: 'Outros', value: 'Outros'},
      {label: 'Prefiro não informar', value: 'Prefiro não informar'},
    ];

    const btnProximo = {
      color: '#fff',
      backgroundColor: '#6BFF4A',
      borderRadius: 5,
      fontWeight: 'bold',
    };
    const btnProximoCad = {
      backgroundColor: 'transparent',
    };
    return (
      <KeyboardAvoidingView>
        <LinearGradient
          style={styles.linearGradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#7159c1', '#27175E']}>
          <View style={styles.Container}>
            <ProgressSteps
              disabledStepNumColor="#858585"
              activeStepNumColor="#fff"
              activeLabelColor="#6BFF4A"
              labelColor="#fff">
              <ProgressStep
                nextBtnStyle={btnProximo}
                nextBtnTextStyle={btnProximo}
                nextBtnText="Próximo"
                label="Dados pessoais"
                nextBtnDisabled={this.state.validity}>
                <View
                  style={{
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}>
                  <StatusBar
                    backgroundColor="#7159c1"
                    barStyle="light-content"
                  />
                  <TextInput
                    onChangeText={nome => this.setState({nome})}
                    style={styles.Input}
                    placeholder="Digite seu nome de usuário"
                    underlineColorAndroid={'transparent'}
                  />
                  <TextInput
                    onEndEditing={this.validaEmail}
                    onChangeText={email => this.setState({email})}
                    style={styles.Input}
                    placeholder="Digite seu email"
                    underlineColorAndroid={'transparent'}
                  />
                  <TextInputMask
                    onEndEditing={this.ValidaCPF}
                    value={this.state.cpf}
                    onChangeText={cpf => this.setState({cpf})}
                    type={'cpf'}
                    value={this.state.cpf}
                    style={styles.Input}
                    placeholder="Digite seu cpf"
                    underlineColorAndroid={'transparent'}
                  />
                  <TextInputMask
                    onEndEditing={this.ValidaCel}
                    value={this.state.cel}
                    onChangeText={cel => this.setState({cel})}
                    type={'cel-phone'}
                    options={{
                      maskType: 'BRL',
                      withDDD: true,
                      dddMask: '(99) ',
                    }}
                    style={styles.Input}
                    placeholder="Digite seu número de telefone"
                    underlineColorAndroid={'transparent'}
                  />
                  <TextInputMask
                    value={this.state.nasc}
                    onChangeText={text => this.setState({nasc: text})}
                    type={'datetime'}
                    options={{
                      format: 'DD/MM/YYYY',
                    }}
                    style={styles.Input}
                    placeholder="Digite sua data de nascimento"
                    underlineColorAndroid={'transparent'}
                  />
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      marginRight: 155,
                    }}>
                    Nos informe seu sexo:
                  </Text>
                  <View
                    style={{marginRight: 140, marginBottom: 15, marginTop: 20}}>
                    <RadioForm
                      radio_props={sexo}
                      initial={-1}
                      onPress={text => {
                        this.setState({sexo: text});
                      }}
                      formHorizontal={false}
                      labelHorizontal={true}
                      buttonColor={'#fff'}
                      selectedButtonColor={'#6BFF4A'}
                      buttonSize={11}
                      labelStyle={{
                        marginRight: 1,
                        marginLeft: 1,
                        fontWeight: 'bold',
                        color: '#fff',
                        fontSize: 13,
                      }}
                    />
                  </View>

                  <TextInput
                    value={this.state.senha}
                    onEndEditing={this.onChange}
                    onChangeText={senha => {
                      this.setState({
                        senha,
                      });
                    }}
                    maxLength={20}
                    style={styles.InputConfSenha}
                    placeholder="Digite sua senha"
                    underlineColorAndroid={'transparent'}
                    secureTextEntry={true}
                  />
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#ff3333',
                      marginLeft: 80,
                      fontSize: 11,
                      marginBottom: 20,
                    }}>
                    {this.state.txtSenha}
                  </Text>
                  <BarPasswordStrengthDisplay
                    scoreLimit={100}
                    wrapperStyle={styles.bar}
                    barContainerStyle={styles.bar}
                    barStyle={styles.bar}
                    labelStyle={styles.label}
                    minLength={0}
                    levels={Levels}
                    password={this.state.senha}
                    width={250}
                  />
                  <TextInput
                    onEndEditing={this.confirmacaoSenha}
                    maxLength={20}
                    value={this.state.ConfSenha}
                    onChangeText={text => {
                      this.setState({
                        ConfSenha: text,
                      });
                    }}
                    style={styles.InputConfSenha}
                    placeholder="Confirme sua senha"
                    underlineColorAndroid={'transparent'}
                    secureTextEntry={true}
                  />
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#ff3333',
                      marginLeft: 190,
                      fontSize: 11,
                      marginBottom: 20,
                    }}>
                    {this.state.txtConfSenha}
                  </Text>
                </View>
              </ProgressStep>
              <ProgressStep
                onNext={this.UserRegistrationFunction}
                nextBtnDisabled={this.state.valida}
                nextBtnStyle={btnProximo}
                nextBtnTextStyle={btnProximo}
                nextBtnText="Cadastrar"
                previousBtnStyle={btnProximo}
                previousBtnTextStyle={btnProximo}
                previousBtnText="Anterior"
                label="Endereço">
                <View
                  style={{
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}>
                  <TextInputMask
                    onEndEditing={this.buscarCep}
                    type={'zip-code'}
                    value={this.state.cep}
                    onChangeText={cep => this.setState({cep})}
                    onChangeText={value => {
                      if (value === '') {
                        this.setState({cep: value, valida: true});
                      } else {
                        this.setState({cep: value, valida: false});
                      }
                    }}
                    style={styles.Input}
                    placeholder="Informe seu CEP (Obrigatório)"
                    underlineColorAndroid={'transparent'}
                  />
                  <TextInput
                    style={styles.Input}
                    placeholder="Estado"
                    underlineColorAndroid={'transparent'}
                    value={this.state.dados.uf}
                    onChangeText={uf => this.setState({uf})}
                    editable={false}
                  />
                  <TextInput
                    style={styles.Input}
                    placeholder="Cidade"
                    underlineColorAndroid={'transparent'}
                    value={this.state.dados.localidade}
                    onChangeText={localidade => this.setState({localidade})}
                    editable={false}
                  />
                  <TextInput
                    style={styles.Input}
                    placeholder="Bairro"
                    underlineColorAndroid={'transparent'}
                    value={this.state.dados.bairro}
                    onChangeText={bairro => this.setState({bairro})}
                    editable={false}
                  />
                  <TextInput
                    style={styles.Input}
                    placeholder="Rua"
                    underlineColorAndroid={'transparent'}
                    value={this.state.dados.logradouro}
                    onChangeText={logradouro => this.setState({logradouro})}
                    editable={false}
                  />
                  <TextInput
                    onChangeText={numero => this.setState({numero})}
                    style={styles.Input}
                    placeholder="Número"
                    underlineColorAndroid={'transparent'}
                    onSubmitEditing={() => {
                      this.thirdTextInput.focus();
                    }}
                  />
                  <TextInput
                    onChangeText={comple => this.setState({comple})}
                    style={styles.Input}
                    placeholder="Complemento (opcional)"
                    underlineColorAndroid={'transparent'}
                    ref={input => {
                      this.thirdTextInput = input;
                    }}
                  />
                </View>
              </ProgressStep>
              <ProgressStep
                removeBtnRow={true}
                previousBtnDisabled={true}
                nextBtnDisabled={true}
                label="Cadastro"
                previousBtnStyle={btnProximoCad}
                previousBtnTextStyle={btnProximoCad}
                previousBtnText=""
                nextBtnStyle={btnProximoCad}
                nextBtnTextStyle={btnProximoCad}
                finishBtnText="">
                <View
                  style={{
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={
                      this.state.corTxtVermelho ? styles.falhou : styles.exito
                    }>
                    {this.state.msgCad}
                  </Text>
                  <Text style={styles.titulo}>
                    {this.state.msgBemVindo} {this.state.nome} !
                  </Text>
                  <Text style={styles.textinho}>{this.state.msgLogin}</Text>
                </View>
              </ProgressStep>
            </ProgressSteps>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  textozinho: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 15,
  },
  dados: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
    marginLeft: 15,
    marginTop: 15,
  },
  textinho: {
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 40,
    marginRight: 40,
    fontSize: 15,
  },
  titulo: {
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
    marginTop: 25,
    fontSize: 18,
  },
  exito: {
    marginLeft: 15,
    marginRight: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#6BFF4A',
    marginTop: 40,
    fontSize: 20,
  },
  falhou: {
    marginLeft: 15,
    marginRight: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FF3333',
    marginTop: 40,
    fontSize: 20,
  },
  bar: {
    marginTop: 1,
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
  },
  btnCep: {
    height: 40,
    color: '#fff',
    fontWeight: 'bold',
    width: 100,
  },
  linearGradient: {
    width: '100%',
    height: '100%',
  },
  Container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
  },
  Form: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    paddingTop: 30,
    paddingBottom: 10,
    marginBottom: 30,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    textAlign: 'center',
  },
  Input: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 30,
    color: '#fff',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    fontWeight: 'bold',
    width: 300,
  },
  InputConfSenha: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 5,
    color: '#fff',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    fontWeight: 'bold',
    width: 300,
  },
  botao: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#6BFF4A',
    marginTop: 5,
    borderRadius: 50,
    marginBottom: 20,
    width: 300,
    height: 45,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
