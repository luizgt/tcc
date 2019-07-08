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
        error: null,
        altitude: -1
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

    save = () =>{ 
        this.getLocalizacao
        fetch('http://192.168.0.12:3000/',{       //MUDAR PARA O IP DA MAQUINA (SERVER)
            method: 'POST',
            body: JSON.stringify({ 
                coordinates:{
                    latitude: this.state.latitude, 
                    longitude: this.state.longitude, 
                },
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

    getLocalizacao(){       //busca as coordenadas para atualizar a posicao dos pontos
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
            { enableHighAccuracy: false,    //alta precisao
                timeout: 20000,             //tempo para executar antes de retornar erro
                maximumAge: 1000 },         //tempo permitido de cache do dispositivo
        )
    }

    render(){
        this.getLocalizacao();      // enquanto a localização for atualizada atualiza a renderizacao

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
                        <View style={Estilo.coordenadas}>
                            <Text style={Estilo.dados}>Latitude: {this.state.latitude}</Text>
                            <Text style={Estilo.dados}>Longitude: {this.state.longitude}</Text>
                            <Text style={Estilo.dados}>Acuracia: {this.state.accuracy}</Text>
                            <Text style={Estilo.dados}>Altitude: {this.state.altitude}</Text>
                        </View>
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