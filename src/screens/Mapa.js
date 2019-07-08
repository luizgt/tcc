import MapView from 'react-native-maps'
import React, {Component} from 'react'
import {StyleSheet, Text} from 'react-native'

export default class Map extends Component{
  state = {
    latitude: 0,
    longitude: 0,
    descricoes:[],
    markers: []
  }

  componentDidMount() {   //invocado imediatamente apos a construcao do componente
    fetch('http://192.168.0.12:3000/')                            // consultando o banco e setando informacoes
    .then(response => response.json())                            //
    .then(posicoes => this.setState({ markers: posicoes }))       //

    navigator.geolocation.getCurrentPosition(   //para renderizacao do mapa
      (pos) => {
        this.setState({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
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
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        }}>
          {this.state.markers.map((marker, index) => (
            <MapView.Marker key={index}
              coordinate={marker.coordinates}
              title={marker.descricao}
            />
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