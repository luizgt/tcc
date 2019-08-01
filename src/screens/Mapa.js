import MapView, {Marker} from 'react-native-maps'
import React, {Component} from 'react'
import {Image, Text, View} from 'react-native'

import Estilos from '../css/Estilos'

export default class Map extends Component{
  state = {
    latitude: 0,      // para renderizar mapa
    longitude: 0,     //
    markers: [],      // para guardar os marcadores
    isOpen: false
  }

  componentDidMount() {   //invocado imediatamente apos a construcao do componente
    fetch('http://200.145.184.232:3013/')                              // consultando o banco e setando informacoes
    .then(response => response.json())                              //
    .then(pontos => this.setState({ markers: pontos }))             // atribuindo todos marcadores ao array de marcadores
    .catch((err) => alert(err))                                     // exibindo erro
    
    navigator.geolocation.getCurrentPosition(   //pegando posicao para renderizacao do mapa
      (pos) => {
        this.setState({
          latitude: pos.coords.latitude,        // -22.1221069,
          longitude: pos.coords.longitude,      //-51.4070715
          error: null,
        });
      },
      (error) => this.setState({ erro: error.message }),
      { enableHighAccuracy: false, timeout: 1000, maximumAge: 1000 },
    );
  }

  getDados(){
    fetch('http://200.145.184.232:3013/')                           // consultando o banco e setando informacoes
    .then(response => response.json())                              //
    .then(pontos => this.setState({ markers: pontos }))             // atribuindo todos marcadores ao array de marcadores
    .catch((err) => alert(err))                                     // exibindo erro
  }

  render(){
    return(
        <MapView style={Estilos.map} loadingEnabled={true} showsUserLocation={true}
        region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.015,     //Distance between the minimum and the 
            longitudeDelta: 0.0121,   //maximum latitude/longitude to be displayed.
        }}>
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