import MapView from 'react-native-maps'
import React, {Component} from 'react'
import {StyleSheet, Text} from 'react-native'

import { Estilo } from '../css/Estilos'


// const localizacao = <Dados/>
// alert(localizacao.longitude)

export default class Map extends Component{
       
  state = {
    latitude: 0,
    longitude: 0,
    latitudes:[],
    longitudes:[],
    descricoes:[]
  }

  teste(){
    fetch('http://192.168.0.12:3000/')
      .then(response => response.json())
      .then(posicoes => {
        let lat = [];
        let lnt = [];
        let descricao = [];
        let variavel;
        for(var marco in posicoes){
          lat.push(posicoes[marco].lat);
          lnt.push(posicoes[marco].lnt);
          descricao.push(posicoes[marco].descricao);
        }
        // console.warn(lat);
        // console.warn(lnt);
        // console.warn(descricao);
        this.setState({
           latitudes: lat,
           longitudes: lnt,
           descricoes: descricao
        })
      })
  }

  componentDidMount() {   //invocado imediatamente apos a construcao do componente
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

    this.teste()
  }
    
    render(){
      //  impressoes para teste
      //  console.warn(this.state.latitudes)
      //  console.warn(this.state.longitudes)
      //  console.warn(this.state.descricoes)

      let auxMarker = []
      let auxMarco;
      for(let aux = 0; aux < this.state.latitudes.length; aux++){
        auxMarco = 
          {
            'coordinate':{
              'latitude': this.state.latitudes[aux],
              'longitude': this.state.longitudes[aux]
            },
            'description': this.state.descricoes[aux],
            'id': aux
          }
          auxMarco = JSON.stringify(auxMarco)
      }

      // auxMarker = JSON.stringify(auxMarker)
      console.warn(auxMarco)

      // exemplo de markers
      // markers: [
      //       {
      //           coordinate: {
      //               latitude: 37.298984,
      //               longitude: -122.050362
      //           },
      //           title: "Best Place",
      //           description: "Description1",
      //           id: 1
      //       },
      //       {
      //           coordinate: {
      //               latitude: 37.297803,
      //               longitude: -122.050037
      //           },
      //           title: "Best Place2",
      //           description: "Description 2",
      //           id: 2
      //       }
      //   ]

      return(
          <MapView style={styles.map} loadingEnabled={true} 
          region={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
          }}>
            {/* <MapView.Marker
                coordinate={auxMarker.coordinate}
                title={"É tão lindo"}
                description={auxMarker.description}
            />               */}
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