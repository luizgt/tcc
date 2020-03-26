import MapView, { Marker } from 'react-native-maps'
import React, { Component } from 'react'
import { Image, Text, TouchableOpacity, View, ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Estilos from '../css/Estilos'

export default class Map extends Component {
  state = {
    latitude: 0,      // para renderizar mapa
    longitude: 0,     //
    markers: [],      // para guardar os marcadores
  }

  componentDidMount() {   //invocado imediatamente apos a construcao do componente 
    this.carregarMarcadores();
    this.carregarPosicaoUsuario();
  }

  async carregarMarcadores() {
    await fetch('http://192.168.0.13:3013')                       // consultando o banco e setando informacoes
      .then(response => response.json())                          //
      .then(markers => this.setState({ markers }))                // atribuindo todos marcadores ao array de marcadores
      .catch((err) => alert(err))                                 // exibindo erro
  }

  carregarPosicaoUsuario(){
    navigator.geolocation.getCurrentPosition(
      (pos) => {
          posAuxiliar = JSON.stringify(pos);
          posAuxiliar = JSON.parse(posAuxiliar);

          this.setState({
              latitude: posAuxiliar.coords.latitude,
              longitude: posAuxiliar.coords.longitude,
              accuracy: posAuxiliar.coords.accuracy,
              altitude: posAuxiliar.coords.altitude,
              error: null
          });
      },
      (error) => this.setState({ erro: error.message }),
      {   enableHighAccuracy: false,    //alta precisao
          timeout: 20000,             //tempo para executar antes de retornar erro
          maximumAge: 1000 },         //tempo permitido de cache do dispositivo
    )
  }

  exibirImagemDoMarcador(enderecoImagem) {
    <View>
      <Image style={Estilos.mapaFoto} source={{ uri: `http://192.168.0.13:3013/${enderecoImagem}` }}>
      </Image>
    </View>
  }


  render() {
    // mapType={'satellite'}
    return (
      <View style={Estilos.map}>
        <MapView style={Estilos.map} showsMyLocationButton={true} showsUserLocation={true}
          showsPointsOfInterest={false}
          moveOnMarkerPress = {false}

          loadingEnabled = {true}
          loadingIndicatorColor="#666666"
          loadingBackgroundColor="#eeeeee"
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          {this.state.markers.map((marker, index) => (      //percorrendo array com os marcadores
            <Marker key={index} coordinate={marker.coordinates}>
              <MapView.Callout style={Estilos.infoCallOut}>
                <View style={Estilos.infoView}>
                  <ImageBackground
                    style={Estilos.mapaFoto}
                    source={{ uri: `http://192.168.0.13:3013/${marker.enderecoImagem}` }}
                    onLoad={() => this.forceUpdate()}
                  >
                  </ImageBackground>
                </View>
              </MapView.Callout>
            </Marker>
            ))}
        </MapView>
        <View style={Estilos.viewMapa}>
          <TouchableOpacity onPress={() => { this.carregarMarcadores() }} style={Estilos.buttomAtualizarMapa}>
            <Icon name='reload' size={25} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}