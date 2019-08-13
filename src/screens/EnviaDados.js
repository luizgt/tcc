import React, {Component} from 'react'
import {View, Text, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { RadioGroup } from 'react-native-btr';

import {
    // accelerometer,
    // gyroscope,
    // barometer,
    magnetometer,
    setUpdateIntervalForType,
    SensorTypes
  } from "react-native-sensors";

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
        formulario: [],
        perguntas:[],
        respostas:[],

        magnetometer: '0',

        selected: false,

        radioButtons: [
            {
              label: 'Sim',
              value: 'Sim',
              color: '#1B5E20',
              size: 13,
            },
            {
              label: 'Não',
              value: 'Não',
              color: '#F44336',
              size: 13,
            },
            {
              label: 'Outro',
              value: 'Outro',
              color: '#FF8F00',
              size: 13,
            }
          ]
    }

    componentDidMount(){
        fetch('http://200.145.184.232:3013/formulario')                // consultando o banco e setando informacoes
        .then(response => response.json())                             //
        .then(perguntas => {
            this.setState({formulario: perguntas})
        })             // atribuindo todos marcadores ao array de marcadores
        .catch((err) => alert(err))                                    // exibindo erro

        this._toggle();
    }

    pickImage = async () =>{
        // ImagePicker.showImagePicker
        ImagePicker.launchCamera({
            tittle: 'Escolha a Imagem',
            maxHeight: 600,
            maxWidth: 800,
        }, res=>{
            if(!res.didCancel){ //se a opção nao foi cancelada
                magnetometer.subscribe(({ x, y, z }) => {          
                    this.setState({ magX: x, magY: y, magZ: z })
                });
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
                    perguntas: this.state.perguntas,        //
                    respostas:this.state.respostas,         //
                    descricao: this.state.descricao,        //
                    imagem: this.state.image,               //
                    extensao: ext,                          //.extensao do arquivo
                    direcao: this.magnetometro,
                    magnetometro:{
                        x: this.state.magX,
                        y: this.state.magY,
                        z: this.state.magZ,
                    }
                }),
                headers: {"Content-Type": "application/json"}
            })
            .then(function(response){
                return response.json()
            }).catch(error => console.log(error));
            
            alert('Dados enviados!')            //msg de confirmacao
            this.setState({descricao: '', image: null}) //setando para valores iniciais
        }//else
    }//salvar

    salvarResposta(index, pergunta){
        var auxPerguntas = this.state.perguntas;
        var auxRespostas = this.state.respostas;

        let selectedItem = this.state.radioButtons.find(e => e.checked == true);
        selectedItem = selectedItem ? selectedItem.value : this.state.radioButtons.value;

        auxPerguntas[index] = pergunta;
        auxRespostas[index] = selectedItem;

        this.setState({
            perguntas: auxPerguntas,
            respostas: auxRespostas
        });
    }

/////////////////////////////////////////////////////////////////////////
    _toggle = () => {
        if (this._subscription) {
            this._unsubscribe();
        } else {
            this._subscribe();
        }
    };

    _subscribe = async () => {
        setUpdateIntervalForType(SensorTypes.magnetometer, 1000);
        this._subscription = magnetometer.subscribe(
            sensorData => this.setState({magnetometer: this._angle(sensorData)}),
            error => console.log("The sensor is not available"),
        );
    };
    
    _unsubscribe = () => {
    this._subscription && this._subscription.unsubscribe();
    this._subscription = null;
    };
    
    _angle = magnetometer => {
        let angle = 0;
        if (magnetometer) {
            let {x, y} = magnetometer;
            if (Math.atan2(y, x) >= 0) {
            angle = Math.atan2(y, x) * (180 / Math.PI);
            } else {
            angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
            }
        }
        return Math.round(angle);
    };

    _direction = degree => {
        if (degree >= 22.5 && degree < 67.5) return "Nordeste";
         else if (degree >= 67.5 && degree < 112.5)  return "Leste";
         else if (degree >= 112.5 && degree < 157.5) return "Sudeste";
         else if (degree >= 157.5 && degree < 202.5) return "Sul";
         else if (degree >= 202.5 && degree < 247.5) return "Sudoeste";
         else if (degree >= 247.5 && degree < 292.5) return "Oeste";
         else if (degree >= 292.5 && degree < 337.5) return "Noroeste";
         else return "Norte";
    };
    
    // Match the device top with pointer 0° degree. (By default 0° starts from the right of the device.)
    _degree = magnetometer => {
        return magnetometer - 90 >= 0
            ? magnetometer - 90
            : magnetometer + 271;
    };
/////////////////////////////////////////////////////////////////////////

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
            {   enableHighAccuracy: false,    //alta precisao
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

                    <TextInput style={Estilo.input} placeholder='Descrição da imagem (opcional)' onChangeText={(descricao) => this.setState({descricao})}>{this.state.descricao}</TextInput>

                    <View style={Estilo.perguntasView}>
                        {this.state.formulario.map((pergunta,index) => (
                            <View style={Estilo.formulario} key={index}>
                                <Text style={Estilo.perguntaText}>{pergunta.pergunta}</Text>
                                <View style={Estilo.botoesView}>
                                    <RadioGroup
                                        selected={this.state.selected}
                                        style={Estilo.botoes}
                                        radioButtons={this.state.radioButtons}
                                        onPress={radioButtons => this.salvarResposta(index, pergunta.pergunta)}
                                    />
                                </View>
                                <Text key={index} style={{marginLeft:20}}>Selecionado: {this.state.perguntas[index]} {this.state.respostas[index]}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={Estilo.localizacao}>
                        <View style={Estilo.coordenadas}>
                            <Text style={Estilo.dados}>Latitude: {this.state.latitude}</Text>
                            <Text style={Estilo.dados}>Longitude: {this.state.longitude}</Text>
                            <Text style={Estilo.dados}>Acuracia: {this.state.accuracy}</Text>
                            <Text style={Estilo.dados}>Altitude: {this.state.altitude}</Text>
                            <View style={Estilo.dadosMag}>
                                <Text style={Estilo.dados}>Direção: {this._direction(this._degree(this.state.magnetometer))}</Text>
                                <Text style={Estilo.dados}>X:  {this.state.magX}</Text>
                                <Text style={Estilo.dados}>Y: {this.state.magY}</Text>
                                <Text style={Estilo.dados}>Z: {this.state.magZ}</Text>
                            </View>
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