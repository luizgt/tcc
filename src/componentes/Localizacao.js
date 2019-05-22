import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class GeolocationExample extends Component {
    state = {
      latitude: 0,
      longitude: 0,
      accuracy: 0,
      erro: null,
      altitude: -1,
      altitudeAccuracy: 0
    }

    componentDidMount() {   //invocado imediatamente apos a construcao do componente
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.setState({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
            altitude: pos.coords.altitude,
            altitudeAccuracy: pos.coords.altitudeAccuracy,
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
          <Text style={style.dados}>Latitude: {this.state.latitude}</Text>
          <Text style={style.dados}>Longitude: {this.state.longitude}</Text>
          <Text style={style.dados}>Acuracia: {this.state.accuracy}</Text>
          <Text style={style.dados}>Altitude: {this.state.altitude}</Text>
          <Text style={style.dados}>Acuracia de Altitude: {this.state.altitudeAccuracy}</Text>
          {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        </View>
      );
    }
  }

const style = StyleSheet.create({
  dados:{
    color: '#000',
    fontSize: 15
  }
})