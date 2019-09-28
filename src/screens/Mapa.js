import MapView, {Marker} from 'react-native-maps'
import React, {Component} from 'react'
import {Image, Text, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Estilos from '../css/Estilos'

export default class Map extends Component{
  state = {
    latitude: 0,      // para renderizar mapa
    longitude: 0,     //
    markers: [],      // para guardar os marcadores

    region: {
      latitude: -22.1221069,
      longitude: -51.4070715,
      latitudeDelta: 0.095,
      longitudeDelta: 0.0121,
    }
  }

  componentDidMount() {   //invocado imediatamente apos a construcao do componente 
    navigator.geolocation.getCurrentPosition(   //pegando posicao para renderizacao do mapa
      (pos) => {
        this.setState({
          region:{
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
    fetch('http://186.217.107.31:3013/')                       // consultando o banco e setando informacoes
    .then(response => response.json())                          //
    .then(markers => this.setState({ markers }))                // atribuindo todos marcadores ao array de marcadores
    .catch((err) => alert(err))                                 // exibindo erro
  }

  async updateMarkers() {
    await fetch('http://186.217.107.31:3013/')                       // consultando o banco e setando informacoes
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
                    <Image
                      style={{width: 250, height: 300, margin: 10}}
                      source={{uri: `data:image/${marker.extensao};base64,${marker.imagem.base64}`}}
                      />
                    <Text style={Estilos.legenda}>{marker.descricao}</Text>
                    {/* <Text style={Estilos.legenda}>{marker.perguntas}</Text>
                    <Text style={Estilos.legenda}>{marker.respostas}</Text>
                    <Text style={Estilos.legenda}>{marker.magnetometro.x}</Text>
                    <Text style={Estilos.legenda}>{marker.magnetometro.y}</Text>
                  <Text style={Estilos.legenda}>{marker.magnetometro.z}</Text> */}
                  </View>
                </MapView.Callout>
              </Marker>
            ))}
          </MapView>
          <View style={Estilos.viewMapa}>
            <TouchableOpacity onPress={() =>{this.updateMarkers()}} style={Estilos.buttomAtualizarMapa}>
              <Icon name='reload' size={25} color={'white'}/>                
            </TouchableOpacity>
          </View>
        </View>
    )
  }
}