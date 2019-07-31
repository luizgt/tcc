import React, {Component} from 'react'
import {View, Text, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native'
import ImagePicker from 'react-native-image-picker'
// import { ButtonGroup } from 'react-native-elements'

import Estilo from '../css/Estilos'

export default class EnviaDados extends Component{
    state = {       //estado inicial
        image: null,
        error: null,
        latitude: 0,
        longitude: 0,
        accuracy: 0,
        altitude: -1,
        descricao: '',
        extensao: '',
        formulario: []
    }

    componentDidMount(){
        fetch('http://200.145.184.232:3013/formulario')                              // consultando o banco e setando informacoes
        .then(response => response.json())                              //
        .then(perguntas => {
            this.setState({formulario: perguntas})
        })             // atribuindo todos marcadores ao array de marcadores
        .catch((err) => alert(err))                                    // exibindo erro
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
        if(this.state.image == null){                   //para nao submeter uma imagem vazia ao servidor
            alert('Imagem não pode ser vazia!')         //
        }else{
            var ext = '';                                               //variaveis para buscar extensao da imagem
            var auxExtensao = this.state.image.uri.lastIndexOf('.')     //

            for(let aux = auxExtensao+1; aux < this.state.image.uri.length; aux++)  //percorrendo o array para pegar a extensao
                ext+= this.state.image.uri[aux];                                    //


            fetch('http://200.145.184.232:3013/',{       //MUDAR PARA O IP DA MAQUINA (SERVER)
                method: 'POST',
                body: JSON.stringify({                      // DADOS PARA O BANCO
                    coordinates:{                           //.coordenadas do ponto
                        latitude: this.state.latitude,      //
                        longitude: this.state.longitude,    //    
                    },                                      //
                    acuracia: this.state.accuracy,          //
                    altitude: this.state.altitude,          //
                    descricao: this.state.descricao,        //
                    imagem: this.state.image,               //
                    extensao: ext                           //.extensao do arquivo
                }),
                headers: {"Content-Type": "application/json"}
            })
            .then(function(response){
                return response.json()
            }).catch(error => console.log(error));
            
            alert('Dados enviados!')            //msg de confirmacao
            this.setState({descricao: '', image: null}) //setando para valores iniciais
        }
    }

    getLocalizacao(){       //busca as coordenadas para atualizar a posicao dos pontos
        navigator.geolocation.getCurrentPosition(
            (pos) => {
              this.setState({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                accuracy: pos.coords.accuracy,
                altitude: pos.coords.altitude,
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
        // alert(this.state.formulario);
        // var perguntas = this.state.formulario.pergunta;
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

                    {this.state.formulario.map((pergunta,index) => (
                        <View style={Estilo.formulario} key={index}>
                            <Text style={Estilo.pergunta}>{pergunta.pergunta}</Text>
                            
                        </View>
                    ))}
      
                    <View style={Estilo.localizacao}>
                        <View style={Estilo.coordenadas}>
                            <Text style={Estilo.dados}>Latitude: {this.state.latitude}</Text>
                            <Text style={Estilo.dados}>Longitude: {this.state.longitude}</Text>
                            <Text style={Estilo.dados}>Acuracia: {this.state.accuracy}</Text>
                            <Text style={Estilo.dados}>Altitude: {this.state.altitude}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={this.save} style={Estilo.buttomEnviar}>
                            <Text style={Estilo.Text}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}