import MapView, {Marker} from 'react-native-maps'
import React, {Component} from 'react'
import {Image, Text, View} from 'react-native'

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

      fetch('http://200.145.184.232:3013/')                              // consultando o banco e setando informacoes
      .then(response => response.json())                              //
      .then(pontos => this.setState({ markers: pontos }))             // atribuindo todos marcadores ao array de marcadores
      .catch((err) => alert(err))                                     // exibindo erro
  }

  getDados(){
    fetch('http://200.145.184.232:3013/')                           // consultando o banco e setando informacoes
    .then(response => response.json())                              //
    .then(pontos => this.setState({ markers: pontos }))             // atribuindo todos marcadores ao array de marcadores
    .catch((err) => alert(err))                                     // exibindo erro
  }

  render(){
    // mapType={'satellite'}
    return(
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
                  {/* {this.state.markers.perguntas.map((pergunta,index) => (
                    <View>
                      <Text>{pergunta}</Text>
                      <Text>{this.state.markers.resposta[index]}</Text>
                    </View>
                  ))} */}
                </View>
              </MapView.Callout>
            </Marker>
          ))}
        </MapView> 
    )
  }
}