import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { Estilo } from '../css/Estilos'

export default class GeolocationExample extends Component {
    state = {
      latitude: 0,
      longitude: 0,
      accuracy: 0,
      erro: null,
      altitude: -1,
      // altitudeAccuracy: 0
    }

    componentDidMount() {   //invocado imediatamente apos a construcao do componente
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.setState({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
            altitude: pos.coords.altitude,
            // altitudeAccuracy: pos.coords.altitudeAccuracy,
            error: null,
          });
        },
        (error) => this.setState({ erro: error.message }),
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
      );
    }

    render() {
      return (
        <View>
          <Text style={Estilo.dados}>Latitude: {this.state.latitude}</Text>
          <Text style={Estilo.dados}>Longitude: {this.state.longitude}</Text>
          <Text style={Estilo.dados}>Acuracia: {this.state.accuracy}</Text>
          <Text style={Estilo.dados}>Altitude: {this.state.altitude}</Text>
          {/* <Text style={style.dados}>Acuracia de Altitude: {this.state.altitudeAccuracy}</Text> */}
          {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        </View>
      );
    }
  }