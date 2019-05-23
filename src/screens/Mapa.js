import MapView from 'react-native-maps'
import React, {Component} from 'react'
import {StyleSheet} from 'react-native'

export default class Map extends Component{
    render(){
        return(
            <MapView
                style={styles.map}
                loadingEnabled={true}
                region={{
                latitude: -22.122123,
                longitude: -51.4071205,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
                }}>
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