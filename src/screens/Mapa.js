import MapView, {Marker} from 'react-native-maps'
import React, {Component} from 'react'
import {Image, Text, TouchableOpacity, View, ImageBackground} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Estilos from '../css/Estilos'

export default class Map extends Component{
  state = {
    latitude: 0,      // para renderizar mapa
    longitude: 0,     //
    markers: [],      // para guardar os marcadores
  }

  componentDidMount() {   //invocado imediatamente apos a construcao do componente 
    navigator.geolocation.getCurrentPosition(   //pegando posicao para renderizacao do mapa
      (pos) => {
        this.setState({
          region: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.latitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }
        });
      },
      (error) => this.setState({ erro: error.message }),
      { enableHighAccuracy: false, timeout: 1000, maximumAge: 10 },
    );
    this.carregarMarcadores();
  }
  
  carregarMarcadores() {
    fetch('http://200.145.184.207:3013/')                       // consultando o banco e setando informacoes
    .then(response => response.json())                          //
    .then(markers => this.setState({ markers }))                // atribuindo todos marcadores ao array de marcadores
    .catch((err) => alert(err))                                 // exibindo erro
  }
  
  render(){
    // mapType={'satellite'}

    return(
        <View style={Estilos.map}>
          <MapView style={Estilos.map} showsMyLocationButton={true} showsUserLocation={true}
            followsUserLocation={true} initialRegion={this.state.region} loadingEnabled={true}
            >
            {this.state.markers.map((marker, index) => (      //percorrendo array com os marcadores
              <Marker key={index} coordinate={marker.coordinates}>  
                <MapView.Callout style={Estilos.infoCallOut}> 
                  <View style={Estilos.infoView}>
                    <ImageBackground
                      style={Estilos.mapaFoto}
                      source={{uri: `${marker.enderecoImagem}`}}
                      onLoad={() => this.forceUpdate()}
                    >
                      <Text style={{ width: 0, height: 0 }}>{Math.random()}</Text>
                    </ImageBackground>
                  </View>
                </MapView.Callout>
              </Marker>
            ))}
          </MapView>
          <View style={Estilos.viewMapa}>
            <TouchableOpacity onPress={() =>{this.carregarMarcadores()}} style={Estilos.buttomAtualizarMapa}>
              <Icon name='reload' size={25} color={'white'}/>                
            </TouchableOpacity>
          </View>
        </View>
    )
  }
}