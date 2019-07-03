import MapView from 'react-native-maps'
import React, {Component} from 'react'
import {StyleSheet} from 'react-native'

import { Estilo } from '../css/Estilos'

// const localizacao = <Dados/>
// alert(localizacao.longitude)

export default class Map extends Component{
       
    state = {
        latitude: 0,
        longitude: 0,
        accuracy: 0,
        erro: null,
        // altitudeAccuracy: 0
      }
  
      componentDidMount() {   //invocado imediatamente apos a construcao do componente
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            this.setState({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              accuracy: pos.coords.accuracy,
              // altitudeAccuracy: pos.coords.altitudeAccuracy,
              error: null,
            });
          },
          (error) => this.setState({ erro: error.message }),
          { enableHighAccuracy: false, timeout: 1000, maximumAge: 1000 },
        );
      }
    
    render(){
        return(
            <MapView style={styles.map} loadingEnabled={true} 
            region={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}>
                <MapView.Marker
                    coordinate={{latitude: -22.119220,
                    longitude: -51.403267}}
                    title={"É tão lindo"}
                    description={"não precisa mudar"}
                />
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