import MapView, {Marker, InfoWindow} from 'react-native-maps'
import React, {Component} from 'react'
import {StyleSheet, Image, Text, View} from 'react-native'

export default class Map extends Component{
  state = {
    latitude: 0,      // para renderizar mapa
    longitude: 0,     //
    markers: [],      // para guardar os marcadores
    isOpen: false
  }

  handleToggleOpen = () => {
    this.setState({
      isOpen: true
    });
  }

  handleToggleClose = () => {
    this.setState({
      isOpen: false
    });
  }

  componentDidMount() {   //invocado imediatamente apos a construcao do componente
    fetch('http://192.168.0.12:3000/')                            // consultando o banco e setando informacoes
    .then(response => response.json())                            //
    .then(pontos => this.setState({ markers: pontos }))           //

    navigator.geolocation.getCurrentPosition(   //para renderizacao do mapa
      (pos) => {
        this.setState({
          latitude: pos.coords.latitude,        //usando coordenadas atuais
          longitude: pos.coords.longitude,      //
          error: null,
        });
      },
      (error) => this.setState({ erro: error.message }),
      { enableHighAccuracy: false, timeout: 1000, maximumAge: 1000 },
    );
  }
  
  render(){
    return(
        <MapView style={styles.map} loadingEnabled={true} showsUserLocation={true}
        region={{
            latitude: -22.11937,      //this.state.latitude,
            longitude: -51.40329,     //this.state.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        }}>
          {this.state.markers.map((marker, index) => (
            <Marker key={index}
              coordinate={marker.coordinates}
              // title={marker.descricao}
              onClick={() => this.handleToggleOpen()}
            >
            <MapView.Callout>
              <View style={{backgroundColor: '#FFF', display: 'flex', borderRadius: 20, alignItems: 'center'}}>
                {/* <Image source={marker.imagem.uri+marker.imagem.base64}></Image> */}
                <Text>{marker.descricao}</Text>
              </View>
            </MapView.Callout>
            </Marker>
          ))}
        </MapView> 
    )
  }
}

const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
       },
})