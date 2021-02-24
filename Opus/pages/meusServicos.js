import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Picker,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  LayoutAnimation,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
  RefreshControl,
  Image,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextInputMask} from 'react-native-masked-text';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Rating from './rating';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialComunnity from 'react-native-vector-icons/MaterialCommunityIcons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
const tab = createBottomTabNavigator();
export default class BottomTab extends Component {
  render() {
    return (
      <NavigationContainer independent={true}>
        <tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, size, color}) => {
              let iconName;

              if (route.name === 'Meus serviços') {
                iconName = focused ? 'worker' : 'worker';
              } else if (route.name === 'Cadastrar serviço') {
                iconName = focused
                  ? 'briefcase-plus'
                  : 'briefcase-plus-outline';
              }
              color: '#7159c1';
              size: 22;
              return (
                <MaterialComunnity name={iconName} size={size} color={color} />
              );
            },
          })}
          tabBarOptions={{
            activeTintColor: '#fff',
            inactiveTintColor: '#fff',
            activeBackgroundColor: '#9581DC',
            inactiveBackgroundColor: '#7159c1',
          }}>
          <tab.Screen name="Meus serviços" component={MeusServicos} />
          <tab.Screen name="Cadastrar serviço" component={CadastrarServicos} />
        </tab.Navigator>
      </NavigationContainer>
    );
  }
}

export class MeusServicos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      id1: '',
      id2: '',
      id3: '',
      expanded: false,
      expandido: false,
      extended: false,
      extendido: false,
      esticado: false,
      clicado: true,
      click: true,
      clicou: true,
      toque: true,
      touch: true,
      dados1: [],
      dados2: [],
      dados3: [],
      data: [],
      refreshing: false,
      isLoading: true,
    };
  }
  componentDidMount = () => {
    fetch('http://theopusapp.online/php/MeusServicos.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        var dados = responseJson;
        this.setState({isLoading: false});
        if (
          dados[0].nome === null ||
          dados[0].email === null ||
          dados[0].fone === null ||
          dados[0].preco === null ||
          dados[0].pag === null ||
          dados[0].desc === null ||
          dados[0].cat === null
        ) {
          this.setState({
            dados1: [{}],
          });
        } else {
          this.setState({
            dados1: dados[0],
            id1: dados[0].id,
          });
        }
        if (
          dados[1].nome === null ||
          dados[1].email === null ||
          dados[1].fone === null ||
          dados[1].preco === null ||
          dados[1].pag === null ||
          dados[1].desc === null ||
          dados[1].cat === null
        ) {
          this.setState({
            dados2: [{}],
          });
        } else {
          this.setState({
            dados2: dados[1],
            id2: dados[1].id,
          });
        }
        if (
          dados[2].nome === null ||
          dados[2].email === null ||
          dados[2].fone === null ||
          dados[2].preco === null ||
          dados[2].pag === null ||
          dados[2].desc === null ||
          dados[2].cat === null
        ) {
          this.setState({
            dados3: [{}],
          });
        } else {
          this.setState({
            dados3: dados[2],
            id3: dados[2].id,
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  btnDelete1 = () => {
    const {id1} = this.state;
    Alert.alert('Aviso', 'Tem certeza que deseja desativar seu serviço ?', [
      {
        text: 'Não',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: 'Sim',
        onPress: () =>
          fetch('http://theopusapp.online/php/deletar.php', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id_servico: id1,
            }),
          })
            .then(response => response.json())
            .then(responseJson => {
              if (responseJson === 'Serviço excluído com sucesso !') {
                this.setState({dados1: [{}]});
                Alert.alert('Aviso', responseJson);
              } else {
                Alert.alert('Aviso', responseJson);
              }
            })
            .catch(error => {
              console.error(error);
            }),
      },
    ]);
  };
  btnDelete2 = () => {
    const {id2} = this.state;
    Alert.alert('Aviso', 'Tem certeza que deseja desativar seu serviço ?', [
      {
        text: 'Não',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: 'Sim',
        onPress: () =>
          fetch('http://theopusapp.online/php/deletar.php', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id_servico: id2,
            }),
          })
            .then(response => response.json())
            .then(responseJson => {
              if (responseJson === 'Serviço excluído com sucesso !') {
                this.setState({dados2: [{}]});
                Alert.alert('Aviso', responseJson);
              } else {
                Alert.alert('Aviso', responseJson);
              }
            })
            .catch(error => {
              console.error(error);
            }),
      },
    ]);
  };
  btnDelete3 = () => {
    const {id3} = this.state;
    Alert.alert('Aviso', 'Tem certeza que deseja desativar seu serviço ?', [
      {
        text: 'Não',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: 'Sim',
        onPress: () =>
          fetch('http://theopusapp.online/php/deletar.php', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id_servico: id3,
            }),
          })
            .then(response => response.json())
            .then(responseJson => {
              if (responseJson === 'Serviço excluído com sucesso !') {
                this.setState({dados3: [{}]});
                Alert.alert('Aviso', responseJson);
              } else {
                Alert.alert('Aviso', responseJson);
              }
            })
            .catch(error => {
              console.error(error);
            }),
      },
    ]);
  };
  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded: !this.state.expanded});
  };
  Layout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expandido: !this.state.expandido});
  };
  change = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({extended: !this.state.extended});
  };
  Extender = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({extendido: !this.state.extendido});
  };
  Extend = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({esticado: !this.state.esticado});
  };
  clicou = () => {
    this.setState({clicado: !this.state.clicado});
  };
  clickzin = () => {
    this.setState({click: !this.state.click});
  };
  tocado = () => {
    this.setState({clicou: !this.state.clicou});
  };
  touched = () => {
    this.setState({toque: !this.state.toque});
  };
  Clicao = () => {
    this.setState({touch: !this.state.touch});
  };
  todasAsFuncoes = () => {
    this.clicou();
    this.changeLayout();
  };
  todas = () => {
    this.clickzin();
    this.Layout();
  };
  todasFuncoes = () => {
    this.tocado();
    this.change();
  };
  todasAs = () => {
    this.touched();
    this.Extender();
  };
  AsFuncoes = () => {
    this.Clicao();
    this.Extend();
  };
  fetchData = () => {
    fetch('http://theopusapp.online/php/MeusServicos.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        var dados = responseJson;
        if (
          dados[0].nome === null ||
          dados[0].email === null ||
          dados[0].fone === null ||
          dados[0].preco === null ||
          dados[0].pag === null ||
          dados[0].desc === null ||
          dados[0].cat === null
        ) {
          this.setState({
            dados1: [{}],
          });
        } else {
          this.setState({
            dados1: dados[0],
            id1: dados[0].id,
          });
        }
        if (
          dados[1].nome === null ||
          dados[1].email === null ||
          dados[1].fone === null ||
          dados[1].preco === null ||
          dados[1].pag === null ||
          dados[1].desc === null ||
          dados[1].cat === null
        ) {
          this.setState({
            dados2: [{}],
          });
        } else {
          this.setState({
            dados2: dados[1],
            id2: dados[1].id,
          });
        }
        if (
          dados[2].nome === null ||
          dados[2].email === null ||
          dados[2].fone === null ||
          dados[2].preco === null ||
          dados[2].pag === null ||
          dados[2].desc === null ||
          dados[2].cat === null
        ) {
          this.setState({
            dados3: [{}],
          });
        } else {
          this.setState({
            dados3: dados[2],
            id3: dados[2].id,
          });
        }
      })
      .catch(error => {
        console.log(error);
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
  render() {
    const {dados1} = this.state;
    const {dados2} = this.state;
    const {dados3} = this.state;
    if (this.state.isLoading) {
      return (
        <LinearGradient
          style={styles.linearGradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#7159c1', '#27175E']}>
          <View style={{flex: 1, marginTop: 210}}>
            <ActivityIndicator size={100} color="#00ff00" />
            <Text
              style={{
                fontWeight: 'bold',
                color: '#00ff00',
                textAlign: 'center',
                fontSize: 30,
              }}>
              Carregando...
            </Text>
          </View>
        </LinearGradient>
      );
    }
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
              onPress={() => this.props.navigation.openDrawer()}>
              <FontAwesome
                style={styles.iconeHeader}
                name="bars"
                color="#fff"
                size={22}
              />
              <Text style={styles.titulo}>Meus serviços</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }>
          <Text style={styles.txtsegCad}>
            Essa é uma pré visualização do seu anúncio de serviço. Você pode
            adicionar até três serviços feitos por você. Lembre-se de que eles
            estarão a mostra para os outros usuários, então revise os erros na
            hora do cadastro.
          </Text>
          <View style={styles.prestador}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image style={styles.avatar} source={{uri: dados1.foto}} />
                <Text style={styles.txtNome}>{dados1.nome} </Text>
              </View>
              <View
                style={{
                  alignContent: 'center',
                  marginTop: 10,
                  marginLeft: 10,
                  marginBottom: 10,
                }}>
                <Text style={styles.txtCard}>Contato:</Text>
                <View style={{flexDirection: 'row', marginLeft: 5}}>
                  <FontAwesome
                    style={{marginLeft: 10, marginTop: 2}}
                    name="whatsapp"
                    color="#33E517"
                    size={11}
                  />
                  <Text style={styles.txtFone}>{dados1.fone}</Text>
                </View>
                <View style={{flexDirection: 'row', marginLeft: 5}}>
                  <Entypo
                    name="email"
                    color="#009BFF"
                    size={11}
                    style={{marginLeft: 10, marginTop: 2}}
                  />
                  <Text style={styles.txtFone}>{dados1.email}</Text>
                </View>
                <Text style={styles.txtPag}>Formas de pagamento:</Text>
                <View style={{flexDirection: 'row', marginLeft: 5}}>
                  <MaterialCommunity
                    name="cash"
                    color="#33E517"
                    size={14}
                    style={{marginLeft: 10}}
                  />
                  <Text style={styles.txtFone}>- {dados1.pag}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.txtPag}>Preço médio:</Text>
                <Text style={styles.txtFonezin}>{dados1.preco}</Text>
                <Text style={styles.txtCat}>Categoria:</Text>
                <Text style={styles.txtCatzin}>{dados1.cat}</Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <TouchableOpacity
                  style={{marginTop: 1, marginLeft: 15}}
                  onPress={this.btnDelete1}>
                  <AntDesign name={'delete'} color="#fff" size={17} />
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft: 7}} onPress={this.todas}>
                  <Entypo
                    name={this.state.click ? 'plus' : 'minus'}
                    color="#fff"
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              overflow: 'hidden',
              height: this.state.expandido ? null : 0,
              backgroundColor: '#261D45',
              justifyContent: 'center',
              width: 378,
              alignSelf: 'center',
              marginTop: -1,
              borderColor: '#fff',
              borderWidth: 0.5,
              borderTopColor: 'transparent',
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
            }}>
            <Text style={styles.txtCardzin}>Descrição:</Text>
            <Text
              style={{
                justifyContent: 'center',
                marginRight: 15,
                marginLeft: 25,
                color: '#fff',
                fontSize: 8,
                marginTop: 2,
                marginBottom: 25,
              }}>
              {dados1.desc}
            </Text>
          </View>

          <View style={styles.prestador}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image style={styles.avatar} source={{uri: dados2.foto}} />
                <Text style={styles.txtNome}>{dados2.nome}</Text>
              </View>
              <View
                style={{
                  alignContent: 'center',
                  marginTop: 10,
                  marginLeft: 10,
                  marginBottom: 10,
                }}>
                <Text style={styles.txtCard}>Contato:</Text>
                <View style={{flexDirection: 'row', marginLeft: 5}}>
                  <FontAwesome
                    style={{marginLeft: 10, marginTop: 2}}
                    name="whatsapp"
                    color="#33E517"
                    size={11}
                  />
                  <Text style={styles.txtFone}>{dados2.fone}</Text>
                </View>
                <View style={{flexDirection: 'row', marginLeft: 5}}>
                  <Entypo
                    name="email"
                    color="#009BFF"
                    size={11}
                    style={{marginLeft: 10, marginTop: 2}}
                  />
                  <Text style={styles.txtFone}>{dados2.email}</Text>
                </View>
                <Text style={styles.txtPag}>Formas de pagamento:</Text>
                <View style={{flexDirection: 'row', marginLeft: 5}}>
                  <MaterialCommunity
                    name="cash"
                    color="#33E517"
                    size={14}
                    style={{marginLeft: 10}}
                  />
                  <Text style={styles.txtFone}>- {dados2.pag}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.txtPag}>Preço médio:</Text>
                <Text style={styles.txtFonezin}>{dados2.preco}</Text>
                <Text style={styles.txtCat}>Categoria:</Text>
                <Text style={styles.txtCatzin}>{dados2.cat}</Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <TouchableOpacity
                  style={{marginTop: 1, marginLeft: 15}}
                  onPress={this.btnDelete2}>
                  <AntDesign name={'delete'} color="#fff" size={17} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginLeft: 7}}
                  onPress={this.todasAs}>
                  <Entypo
                    name={this.state.toque ? 'plus' : 'minus'}
                    color="#fff"
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              overflow: 'hidden',
              height: this.state.extendido ? null : 0,
              backgroundColor: '#261D45',
              justifyContent: 'center',
              width: 378,
              alignSelf: 'center',
              marginTop: -1,
              borderColor: '#fff',
              borderWidth: 0.5,
              borderTopColor: 'transparent',
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
            }}>
            <Text style={styles.txtCardzin}>Descrição:</Text>
            <Text
              style={{
                justifyContent: 'center',
                marginRight: 15,
                marginLeft: 25,
                color: '#fff',
                fontSize: 8,
                marginTop: 2,
                marginBottom: 25,
              }}>
              {dados2.desc}
            </Text>
          </View>
          <View style={styles.prestador}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image style={styles.avatar} source={{uri: dados3.foto}} />
                <Text style={styles.txtNome}>{dados3.nome}</Text>
              </View>
              <View
                style={{
                  alignContent: 'center',
                  marginTop: 10,
                  marginLeft: 10,
                  marginBottom: 10,
                }}>
                <Text style={styles.txtCard}>Contato:</Text>
                <View style={{flexDirection: 'row', marginLeft: 5}}>
                  <FontAwesome
                    style={{marginLeft: 10, marginTop: 2}}
                    name="whatsapp"
                    color="#33E517"
                    size={11}
                  />
                  <Text style={styles.txtFone}>{dados3.fone}</Text>
                </View>
                <View style={{flexDirection: 'row', marginLeft: 5}}>
                  <Entypo
                    name="email"
                    color="#009BFF"
                    size={11}
                    style={{marginLeft: 10, marginTop: 2}}
                  />
                  <Text style={styles.txtFone}>{dados3.email}</Text>
                </View>
                <Text style={styles.txtPag}>Formas de pagamento:</Text>
                <View style={{flexDirection: 'row', marginLeft: 5}}>
                  <MaterialCommunity
                    name="cash"
                    color="#33E517"
                    size={14}
                    style={{marginLeft: 10}}
                  />
                  <Text style={styles.txtFone}>- {dados3.pag}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.txtPag}>Preço médio:</Text>
                <Text style={styles.txtFonezin}>{dados3.preco}</Text>
                <Text style={styles.txtCat}>Categoria:</Text>
                <Text style={styles.txtCatzin}>{dados3.cat}</Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <TouchableOpacity
                  style={{marginTop: 1, marginLeft: 15}}
                  onPress={this.btnDelete3}>
                  <AntDesign name={'delete'} color="#fff" size={17} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginLeft: 7}}
                  onPress={this.AsFuncoes}>
                  <Entypo
                    name={this.state.touch ? 'plus' : 'minus'}
                    color="#fff"
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              overflow: 'hidden',
              height: this.state.esticado ? null : 0,
              backgroundColor: '#261D45',
              justifyContent: 'center',
              width: 378,
              alignSelf: 'center',
              marginTop: -1,
              borderColor: '#fff',
              borderWidth: 0.5,
              borderTopColor: 'transparent',
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              marginBottom: 30,
            }}>
            <Text style={styles.txtCardzin}>Descrição:</Text>
            <Text
              style={{
                justifyContent: 'center',
                marginRight: 15,
                marginLeft: 25,
                color: '#fff',
                fontSize: 8,
                marginTop: 2,
                marginBottom: 25,
              }}>
              {dados3.desc}
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}

export class CadastrarServicos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoria: 'Selecione',
      cpf: '',
      dinheiro: '',
      metodoPag: '',
      descricao: '',
      Inicio: -1,
      refreshing: false,
      btnCad: false,
      txtCad: '',
      qtdCad: 0,
    };
  }
  componentDidMount = () => {
    fetch('http://theopusapp.online/php/limiteServico.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson === 'True') {
          this.setState({btnCad: true});
          this.setState({
            txtCad:
              'Limite de cadastros por usuário atingido ! Exclua um serviço para poder cadastrar um novo.',
          });
        } else {
          this.setState({btnCad: false});
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  cadastroServico = () => {
    const {qtdCad} = this.state;
    const {categoria} = this.state;
    const {dinheiro} = this.state;
    const {metodoPag} = this.state;
    const {descricao} = this.state;

    fetch('http://theopusapp.online/php/cadastroServico.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        categoria: categoria,
        dinheiro: dinheiro,
        metodoPag: metodoPag,
        descricao: descricao,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson === 'Cadastro realizado com êxito !') {
          Alert.alert('Aviso', responseJson);
          this.setState({qtdCad: qtdCad + 1});
        } else {
          Alert.alert('Aviso', responseJson);
        }
        if (qtdCad === 2) {
          this.setState({btnCad: true});
          this.setState({
            txtCad:
              'Limite de cadastros por usuário atingido ! Exclua um serviço para poder cadastrar um novo.',
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  fetchData = () => {
    fetch('http://theopusapp.online/php/limiteServico.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson === 'True') {
          this.setState({btnCad: true});
          this.setState({
            txtCad:
              'Limite de cadastros por usuário atingido ! Exclua um serviço para poder cadastrar um novo.',
          });
        } else {
          this.setState({btnCad: false});
          this.setState({
            txtCad: '',
          });
        }
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

  render() {
    const metodoPagamento = [
      {label: 'Dinheiro', value: 'Dinheiro'},
      {label: 'Cartão de débito/crédito', value: 'Cartão de débito/crédito'},
      {label: 'Boleto', value: 'Boleto'},
      {label: 'Depósito bancário', value: 'Depósito bancário'},
    ];
    return (
      <LinearGradient
        style={styles.linearGradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#7159c1', '#27175E']}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView>
            <View>
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                  />
                }>
                <View style={styles.header}>
                  <TouchableOpacity
                    style={styles.btnMenu}
                    onPress={() => this.props.navigation.openDrawer()}>
                    <FontAwesome
                      style={styles.iconeHeader}
                      name="bars"
                      color="#fff"
                      size={22}
                    />
                    <Text style={styles.segTitulo}>Cadastrar serviços</Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 10, alignContent: 'center'}}>
                  <Text style={styles.txtCad}>
                    Preencha os campos abaixo para cadastrar o seu serviço na
                    plataforma.
                  </Text>
                  <Text style={styles.txtCorpo}>
                    {' '}
                    Nos informe seu o seu preço médio p/hora:
                  </Text>
                  <TextInputMask
                    value={this.state.dinheiro}
                    options={{
                      precision: 2,
                    }}
                    onChangeText={dinheiro => this.setState({dinheiro})}
                    type={'money'}
                    style={styles.input}
                    placeholder="R$ 00,00"
                    underlineColorAndroid={'transparent'}
                  />
                  <Text style={styles.txtCorpo}> Métodos de pagamento:</Text>
                  <View
                    style={{marginLeft: 30, marginBottom: 15, marginTop: 15}}>
                    <RadioForm
                      radio_props={metodoPagamento}
                      initial={-1}
                      onPress={text => {
                        this.setState({metodoPag: text});
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
                  <Text style={styles.txtCorpo}>
                    {' '}
                    Nos informe sua categoria de serviço:
                  </Text>
                  <Picker
                    style={styles.Picker}
                    selectedValue={this.state.categoria}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({categoria: itemValue})
                    }>
                    <Picker.Item label="Selecione" value="Selecione" />
                    <Picker.Item label="Casa" value="Casa" />
                    <Picker.Item label="Cozinha" value="Cozinha" />
                    <Picker.Item label="Informática" value="Informática" />
                    <Picker.Item label="Saúde" value="Saúde" />
                    <Picker.Item
                      label="Serviços gerais"
                      value="Serviços gerais"
                    />
                    <Picker.Item label="Vet" value="Vet" />
                    <Picker.Item label="Auto" value="Auto" />
                    <Picker.Item
                      label="Assistência técnica"
                      value="Assistência técnica"
                    />
                  </Picker>
                  <Text style={styles.txtCorpo}>
                    Digite uma descrição para o seu serviço.
                  </Text>
                  <TextInput
                    style={styles.inputDesc}
                    placeholder="Descrição"
                    multiline
                    numberOfLines={4}
                    maxLength={172}
                    onChangeText={descricao => this.setState({descricao})}
                  />
                  <TouchableOpacity
                    disabled={this.state.btnCad}
                    style={
                      this.state.btnCad ? styles.btnCadDisabled : styles.btnCad
                    }
                    onPress={this.cadastroServico}>
                    <Text style={styles.btnTxtCad}>Cadastrar</Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: '#ff3333',
                      marginLeft: 5,
                      marginRight: 5,
                      marginBottom: 15,
                    }}>
                    {this.state.txtCad}
                  </Text>
                </View>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  txtsegCad: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 15,
    marginBottom: 15,
    marginTop: 10,
  },
  txtFonezin: {
    justifyContent: 'center',
    marginRight: -40,
    marginLeft: 15,
    color: '#fff',
    fontSize: 8,
    marginTop: 2,
    marginBottom: 25,
  },
  txtCardzin: {
    marginTop: 8,
    marginLeft: 22,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 11,
  },
  txtNome: {
    marginLeft: 10,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 7,
  },
  txtPag: {
    marginTop: 8,
    marginLeft: 10,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 11,
  },
  txtFone: {
    marginLeft: 5,
    color: '#fff',
    fontSize: 8,
    marginTop: 2,
  },
  txtCat: {
    marginTop: -1,
    marginLeft: 17,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 11,
  },
  txtCatzin: {
    marginLeft: 20,
    color: '#fff',
    fontSize: 8,
    marginTop: 2,
  },
  txtCard: {
    marginLeft: 10,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 11,
  },
  prestador: {
    backgroundColor: '#261D45',
    justifyContent: 'center',
    width: 378,
    borderColor: '#fff',
    borderWidth: 0.5,
    alignSelf: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 130,
    marginTop: 10,
    borderBottomColor: 'transparent',
  },
  prestadorServico: {
    backgroundColor: '#261D45',
    justifyContent: 'center',
    width: 378,
    borderColor: '#fff',
    borderWidth: 0.5,
    alignSelf: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 130,
    marginTop: 20,
    borderBottomColor: 'transparent',
  },
  btnTxtCad: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 15,
  },
  btnCad: {
    backgroundColor: '#6BFF4A',
    height: 40,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: 25,
    width: 335,
    marginBottom: 10,
    borderRadius: 3,
  },
  btnCadDisabled: {
    backgroundColor: '#b0b0b0',
    height: 40,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: 25,
    width: 335,
    marginBottom: 10,
    borderRadius: 3,
  },
  inputDesc: {
    backgroundColor: '#fff',
    fontWeight: 'bold',
    marginLeft: 25,
    width: 335,
    height: 100,
    borderRadius: 2,
    marginTop: 13,
    marginBottom: 20,
  },
  Picker: {
    height: 40,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    fontWeight: 'bold',
    marginLeft: 25,
    width: 335,
    marginBottom: 10,
  },
  txtCorpo: {
    fontSize: 15,
    color: '#fff',
    marginLeft: 25,
  },
  txtCad: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    marginLeft: 18,
    marginRight: 18,
  },
  segTitulo: {
    marginLeft: 85,
    textAlign: 'center',
    alignContent: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  input: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 30,
    color: '#fff',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    fontWeight: 'bold',
    width: 334,
    marginLeft: 25,
  },
  subtitulo: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
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
    marginBottom: 20,
    textAlign: 'center',
  },
  titulo: {
    marginLeft: 100,
    textAlign: 'center',
    alignContent: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
