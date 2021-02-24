import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  LayoutAnimation,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Rating from './rating';
import * as Animatable from 'react-native-animatable';

export default class Cozinha extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      refreshing: false,
      isLoading: true,
    };
  }
  onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchData(
      setTimeout(() => {
        this.setState({refreshing: false});
      }, 2000),
    );
  };
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#fff',
        }}
      />
    );
  };
  componentDidMount = () => {
    return fetch('http://theopusapp.online/php/servicos/saude.php')
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          dataSource: responseJson,
          isLoading: false,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  fetchData = () => {
    return fetch('http://theopusapp.online/php/servicos/saude.php')
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          dataSource: responseJson,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  arrayVazio = () => {
    return (
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#fff',
            fontSize: 20,
            marginLeft: 30,
            marginRight: 30,
            marginTop: 70,
          }}>
          Ops... Não encontramos nenhum serviço cadastrado nessa categoria.
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#fff',
            fontSize: 100,
            marginLeft: 30,
            marginRight: 30,
            marginTop: 15,
          }}>
          :/
        </Text>
      </View>
    );
  };
  render() {
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
            <Text style={styles.titulo}>Saúde</Text>
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }>
            <View style={{marginTop: 30, marginBottom: 30}}>
              <FlatList
                ListEmptyComponent={this.arrayVazio}
                data={this.state.dataSource}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                renderItem={({item}) => (
                  <View>
                    <View style={styles.prestador}>
                      <View style={{flexDirection: 'row', marginLeft: 1}}>
                        <View>
                          <Image
                            source={{uri: item.foto}}
                            style={styles.avatar}
                          />
                          <Text style={styles.txtNome}>{item.nome}</Text>
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
                              style={{marginLeft: 17, marginTop: 2}}
                              name="whatsapp"
                              color="#33E517"
                              size={11}
                            />
                            <Text style={styles.txtFone}>{item.fone}</Text>
                          </View>
                          <View style={{flexDirection: 'row', marginLeft: 5}}>
                            <Entypo
                              name="email"
                              color="#009BFF"
                              size={11}
                              style={{marginLeft: 17, marginTop: 2}}
                            />
                            <Text style={styles.txtFone}>{item.email}</Text>
                          </View>
                          <Text style={styles.txtPag}>
                            Formas de pagamento:
                          </Text>
                          <View style={{flexDirection: 'row', marginLeft: 5}}>
                            <MaterialCommunity
                              name="cash"
                              color="#33E517"
                              size={14}
                              style={{marginLeft: 15}}
                            />
                            <Text style={styles.txtFone}>- {item.pag}</Text>
                          </View>
                        </View>
                        <View style={{marginLeft: 5}}>
                          <View style={{marginTop: 1}}>
                            <Text style={styles.txtPag}>Preço médio:</Text>
                            <Text style={styles.txtFonezin}>
                              {item.preco} p/hora
                            </Text>
                            <View />
                          </View>
                        </View>
                      </View>
                    </View>
                    <View>
                      <View style={{backgroundColor: '#261D45'}}>
                        <Text style={styles.txtCardzin}>Descrição:</Text>
                        <Text
                          style={{
                            justifyContent: 'center',
                            marginRight: 15,
                            marginLeft: 35,
                            color: '#fff',
                            fontSize: 8,
                            marginTop: 2,
                            marginBottom: 10,
                          }}>
                          {item.desc}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 50,
    marginLeft: 20,
    marginTop: 10,
  },
  imageView: {
    width: '50%',
    height: 100,
    margin: 7,
    borderRadius: 7,
  },

  textView: {
    width: '50%',
    textAlignVertical: 'center',
    padding: 10,
    color: '#000',
  },
  txtFonezin: {
    justifyContent: 'center',
    marginRight: -40,
    marginLeft: 25,
    color: '#fff',
    fontSize: 8,
    marginTop: 2,
    marginBottom: 25,
  },
  txtCardzin: {
    marginLeft: 30,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 11,
    marginTop: -2,
  },
  txtNome: {
    marginLeft: 15,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 7,
    marginTop: 4,
  },
  txtPag: {
    marginTop: 8,
    marginLeft: 17,
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
  txtCard: {
    marginLeft: 17,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 11,
  },
  prestador: {
    backgroundColor: '#261D45',
    justifyContent: 'center',
    width: 385,
    borderWidth: 0.5,
    alignSelf: 'center',
    height: 120,
    borderBottomColor: 'transparent',
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
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,
    marginTop: 20,
  },
});
