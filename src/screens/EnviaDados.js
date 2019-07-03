import React, {Component} from 'react'
import {View, Text, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native'
import ImagePicker from 'react-native-image-picker'

import Estilo from '../css/Estilos'

export default class EnviaDados extends Component{
    state = {       //estado inicial
        image: null,
        comment: '',
        latitude: 0,
        longitude: 0,
        accuracy: 0,
        erro: null,
        altitude: -1
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
              error: null
            });
          },
          (error) => this.setState({ erro: error.message }),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
      }

    pickImage = () =>{
        ImagePicker.showImagePicker({
            tittle: 'Escolha a Imagem',
            maxHeight: 600,
            maxWidth: 800,
        }, res=>{
            if(!res.didCancel){ //se a opção nao foi cancelada
                this.setState({image: {uri: res.uri, base64: res.data}})    //setando imagem
            }
        })
    }

    save = ()=>{ 
        this.getLocalizacao
        fetch('http://192.168.0.12:3000/',{         //enviando dados para o server
            method: 'POST',
            body: JSON.stringify({ 
                lat: this.state.latitude, 
                lnt: this.state.longitude, 
                acuracia: this.state.accuracy, 
                altitude: this.state.altitude,
                descricao: this.state.comment, 
                // imagem: this.state.image
            }),
            headers: {"Content-Type": "application/json"}
        })
        .then(function(response){
            return response.json()
        }).catch(error => console.log(error));
    }

    render(){
        return(
            <ScrollView>
                <View style={Estilo.container}>
                    <Text style={Estilo.title}>Submeter imagem</Text>
                    <View style={Estilo.imageContainer}>
                        <Image source={this.state.image} style={Estilo.image}/>
                    </View>
                    <TouchableOpacity onPress={this.pickImage} style={Estilo.buttom}>
                        <Text style={Estilo.Text}>Escolha a foto</Text>
                    </TouchableOpacity>
                    <TextInput placeholder="Descrição da imagem..."
                        style={Estilo.input} value={this.state.comment}
                        onChangeText={comment => this.setState({ comment })}/>
                    <View style={Estilo.localizacao}>
                        <Text style={Estilo.dados}>Latitude: {this.state.latitude}</Text>
                        <Text style={Estilo.dados}>Longitude: {this.state.longitude}</Text>
                        <Text style={Estilo.dados}>Acuracia: {this.state.accuracy}</Text>
                        <Text style={Estilo.dados}>Altitude: {this.state.altitude}</Text>
                    </View>
                    <TouchableOpacity onPress={this.save}
                        style={Estilo.buttomEnviar}>
                            <Text style={Estilo.Text}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}