import React, {Component, useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  Alert,
  Linking,
  Animated,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NavigationContainer,
  DrawerActions,
  CommonActions,
} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {scrollInterpolator, animatedStyles} from '../utils/animations';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import ImagePicker from 'react-native-image-picker';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'react-native-fetch-blob';

const Drawer = createDrawerNavigator();
import Servicos from './servicos';
import Sobre from './sobre';
import Login from './login';
import MeusServicos from './meusServicos';
import Gerenciamento from './gerenciamento';
import {TouchableOpacity} from 'react-native-gesture-handler';
console.ignoredYellowBox = true;
export default class Home extends Component {
  render() {
    return (
      <NavigationContainer independent={true}>
        <Drawer.Navigator
          drawerContent={props => <Menu {...props} />}
          hideStatusBar={true}
          drawerContentOptions={{
            activeBackgroundColor: '#9581DC',
            labelStyle: {fontWeight: 'bold', color: '#fff', marginVertical: 5},
          }}
          drawerStyle={{
            backgroundColor: '#7159c1',
            width: 220,
          }}>
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{
              drawerIcon: () => (
                <FeatherIcon name="home" color="#fff" size={22} />
              ),
            }}
          />
          <Drawer.Screen
            name="Perfil"
            component={Gerenciamento}
            options={{
              drawerIcon: () => (
                <FontAwesome name="user-circle-o" color="#fff" size={22} />
              ),
            }}
          />
          <Drawer.Screen
            name="Servicos"
            component={Servicos}
            options={{
              drawerIcon: () => (
                <MaterialIconsIcon name="work" color="#fff" size={22} />
              ),
            }}
          />
          <Drawer.Screen
            name="Meus serviços"
            component={MeusServicos}
            options={{
              drawerIcon: () => (
                <FontAwesome5Icon name="toolbox" color="#fff" size={22} />
              ),
            }}
          />
          <Drawer.Screen
            name="Sobre"
            component={Sobre}
            options={{
              drawerIcon: () => (
                <MaterialIconsIcon name="info-outline" color="#fff" size={22} />
              ),
            }}
          />
          <Drawer.Screen
            name="Sair"
            component={Login}
            options={{
              drawerIcon: () => (
                <AntDesignIcon name="logout" color="#fff" size={22} />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

function Menu(props, {navigation}) {
  function uploadImageToServer() {
    RNFetchBlob.fetch(
      'POST',
      'http://theopusapp.online/php/uploadFoto.php',
      {
        Authorization: 'Bearer access-token',
        otherHeader: 'foo',
        'Content-Type': 'multipart/form-data',
      },
      [
        {
          name: 'image',
          filename: 'image.jpg',
          type: 'image/jpg',
          data: data,
        },
      ],
    )
      .then(response => response.json())
      .then(responseJson => {
        Alert.alert('Aviso', responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  }
  useEffect(() => {
    fetch('http://theopusapp.online/php/home.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson === 'Erro') {
          setDados(responseJson);
        } else {
          setDados(responseJson);
        }
      })
      .catch(error => {
        console.error(error);
      });
  });
  const [dados, setDados] = useState([]);
  const [avatar, setAvatar] = useState();
  const [ImageSource, setImageSource] = useState();
  const [ftPerfil, setFtPerfil] = useState();
  const [data, setData] = useState();
  function imagePickerCallback(data) {
    if (data.didCancel) {
      return;
    }
    if (data.error) {
      return;
    }
    if (!data.uri) {
      return;
    } else {
      let source = {uri: data.uri};
      setImageSource(source);
      setData(data.data);
      setFtPerfil(source);
    }
  }
  const [perfil] = dados.map(item => item.foto);
  return (
    <View>
      <View style={{backgroundColor: '#261D45'}}>
        {perfil === null ? (
          <TouchableOpacity
            onPress={() =>
              ImagePicker.showImagePicker({}, imagePickerCallback)
            }>
            <Image
              style={styles.avatar}
              source={{
                uri: ImageSource
                  ? ImageSource.uri
                  : 'https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png',
              }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() =>
              ImagePicker.showImagePicker({}, imagePickerCallback)
            }>
            <Image
              style={styles.avatar}
              source={{
                uri: ftPerfil ? ftPerfil.uri : perfil,
              }}
            />
          </TouchableOpacity>
        )}
        <View style={{flexDirection: 'row'}}>
          {dados.map(item => (
            <Text style={styles.txtMenu}>
              Olá {item.nome} {''} !
            </Text>
          ))}
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.txtMenu}>Email:</Text>
          {dados.map(item => (
            <Text style={styles.txtEmail}>{item.email}</Text>
          ))}
        </View>
        {perfil === null ? (
          <TouchableOpacity
            style={styles.btnFoto}
            onPress={uploadImageToServer}>
            <AntDesignIcon name="camera" color="#fff" size={20} />
            <Text style={styles.btnTxtFoto}>Salvar foto</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.btnFoto}
            onPress={uploadImageToServer}>
            <AntDesignIcon name="camera" color="#fff" size={20} />
            <Text style={styles.btnTxtFoto}>Mudar foto</Text>
          </TouchableOpacity>
        )}
      </View>
      <DrawerItemList {...props} />
    </View>
  );
}

export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      largura: new Animated.Value(0),
      altura: new Animated.Value(30),
      opacidade: new Animated.Value(0),
      carouselItems: [
        {
          title: 'Curiosidades sobre home office',
          text:
            'Disponibilizamos algumas informações sobre home office para quem tem alguma dúvida sobre o tema.',
          btnTxt: 'Conferir',
          img: 'http://theopusapp.online/site/img/homeOffice.png',
          onPress:
            'https://revistapegn.globo.com/Noticias/noticia/2014/08/7-coisas-que-todo-mundo-precisa-saber-sobre-home-office.html',
        },
        {
          title: 'Informalidade bate recorde em 2019',
          text:
            'A taxa de informalidade no mercado de trabalho superou o patamar de 41%, segundo reportagem da globo.',
          btnTxt: 'Noticia',
          img: 'http://theopusapp.online/site/img/Informal.jpg',
          onPress:
            'https://g1.globo.com/economia/noticia/2019/12/25/informalidade-bateu-recorde-em-2019-veja-historias-de-quem-trabalha-por-conta-propria.ghtml',
        },
        {
          title: 'Conheçam um pouco mais sobre a Opus',
          text:
            'Clicando no botão abaixo você vai ser redirecionado para o nosso site institucional.',
          img: 'http://theopusapp.online/site/img/site.JPG',
          btnTxt: 'Visitar',
          onPress: 'http://theopusapp.online/site/index.php',
        },
        {
          title: 'Taxas de desemprego sobem para 12,9% em maio',
          text:
            'Segundo portal da rede Globo, índices de desemprego sobem no mês de maio.',
          img: 'http://theopusapp.online/site/img/desemprego.jpg',
          btnTxt: 'Noticia',
          onPress:
            'https://g1.globo.com/economia/noticia/2020/06/30/desemprego-sobe-para-129percent-em-maio.ghtml',
        },
        {
          title: 'Vagas de emprego em meio a pandemia',
          text:
            'Existem setores que em meio a pandemia disponibilizaram vagas em diversas funções. Confira !',
          img: 'http://theopusapp.online/site/img/emprego.jpg',
          btnTxt: 'Conferir',
          onPress:
            'https://g1.globo.com/economia/concursos-e-emprego/noticia/2020/04/13/os-setores-que-ainda-estao-contratando-em-meio-a-pandemia.ghtml',
        },
      ],
    };
  }
  componentDidMount = () => {
    const {largura} = this.state;
    const {altura} = this.state;
    const {opacidade} = this.state;
    Animated.sequence([
      Animated.timing(largura, {
        toValue: 390,
        duration: 1000,
      }),
      Animated.timing(altura, {
        toValue: 200,
        duration: 1000,
      }),
      Animated.timing(opacidade, {
        toValue: 1,
        duration: 1000,
      }),
    ]).start();
  };
  _renderItem({item, index}) {
    return (
      <View
        style={{
          backgroundColor: '#1f1f1f',
          marginTop: 20,
          borderRadius: 5,
          height: 320,
          marginRight: 10,
        }}>
        <Image
          source={{uri: item.img}}
          style={{
            width: 259,
            height: 185,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          }}
        />
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: 15,
            fontSize: 13,
            color: '#fff',
          }}>
          {item.title}
        </Text>
        <Text
          style={{
            color: '#fff',
            fontSize: 12,
            marginTop: 5,
            marginLeft: 20,
            marginRight: 10,
          }}>
          {item.text}
        </Text>
        <TouchableOpacity
          onPress={() => Linking.openURL(item.onPress)}
          style={{
            marginLeft: 95,
            backgroundColor: '#6BFF4A',
            width: 80,
            height: 30,
            borderRadius: 5,
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{fontWeight: 'bold', color: '#fff', textAlign: 'center'}}>
            {item.btnTxt}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
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
        <ScrollView>
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
                <Text style={styles.titulo}>Home</Text>
              </TouchableOpacity>
            </View>
            <Animated.View
              style={{
                width: largura,
                height: altura,
                backgroundColor: '#B19AFF',
                marginTop: 2,
              }}>
              <Animated.View style={{opacity: opacidade}}>
                <ImageBackground
                  style={{
                    flex: 1,
                    resizeMode: 'cover',
                    justifyContent: 'center',
                    width: 450,
                    height: 200,
                  }}
                  source={require('../images/cel.jpg')}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#fff',
                      marginTop: 160,
                      marginLeft: 25,
                      fontSize: 14,
                    }}>
                    Seu emprego na palma da sua mão
                  </Text>
                  <Text
                    style={{
                      color: '#fff',
                      marginTop: 10,
                      marginLeft: 35,
                      fontSize: 10,
                    }}>
                    Anuncie seu serviço em nossa plataforma !
                  </Text>
                </ImageBackground>
              </Animated.View>
            </Animated.View>
            <View
              style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
              <Carousel
                ref={c => (this.carousel = c)}
                data={this.state.carouselItems}
                renderItem={this._renderItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                inactiveSlideShift={0}
                onSnapToItem={index => this.setState({index})}
                scrollInterpolator={scrollInterpolator}
                slideInterpolatedStyle={animatedStyles}
                useScrollView={true}
              />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
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
  },
  titulo: {
    marginLeft: 135,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  txtMenu: {
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
    marginTop: 15,
  },
  txtEmail: {
    color: '#fff',
    marginLeft: 10,
    marginTop: 15,
    fontSize: 13,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 15,
    marginTop: 20,
  },
  btnFoto: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    backgroundColor: '#7159c1',
    alignContent: 'center',
    alignItems: 'center',
    width: 110,
    height: 30,
    justifyContent: 'center',
    borderRadius: 5,
    flexDirection: 'row',
  },
  btnTxtFoto: {
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  linearGradient: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
