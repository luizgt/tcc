import React, {Component} from 'react'
import {View, Text, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { RadioGroup } from 'react-native-btr';
import Icon from 'react-native-vector-icons/FontAwesome'

import {
    // accelerometer,
    // gyroscope,
    // barometer,
    magnetometer,
    setUpdateIntervalForType,
    SensorTypes
  } from "react-native-sensors";

import Estilo from '../css/Estilos'
import getRealm, {getUser} from '../services/Realm';

var ext;

export default class EnviaDados extends Component{

    state = {       //estado inicial
        //dados para enviar
        image: null,
        latitude: 0,
        longitude: 0,
        accuracy: 0,
        altitude: 0,
        descricao: '',
        extensao: '',
        formulario: [],
        perguntas:[],
        respostas:[],
        usuario: [],
        direcao: null,
        magX: null, 
        magY: null, 
        magZ: null,

        //variaveis para controle
        error: null,
        coordenadas: [],
        selected: false,
        logado: false,

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
        ],
    }

    async componentDidMount(){
        fetch('http://200.145.184.232:3013/formulario')                // consultando o banco e setando informacoes
        .then(response => response.json())                             //
        .then(perguntas => {
            this.setState({formulario: perguntas})
        })             // atribuindo todos marcadores ao array de marcadores
        .catch((err) => alert('Não foi possível obter as perguntas do servidor' + err)) /// exibindo erro
        
        await this.loadRepository();

        this._toggle();

        magnetometer.subscribe(async({ x, y, z }) => {
            this.setState({
                coordenadas:{
                    coordX: JSON.stringify(x),
                    coordY: JSON.stringify(y),
                    coordZ: JSON.stringify(z)
                }
            })
        });
    }

    tirarFoto = async () =>{
        ImagePicker.launchCamera({
            maxHeight: 600,
            maxWidth: 800,
        }, res=>{
            if(!res.didCancel){ //se a opção nao foi cancelada
                            

                this.setState({image: {uri: res.uri, base64: res.data}})    //setando imagem
                
                var date = new Date().getDate();        //Current Date
                var month = new Date().getMonth() + 1;  //Current Month
                var year = new Date().getFullYear();    //Current Year
                var hours = new Date().getHours();      //Current Hours
                var min = new Date().getMinutes();      //Current Minutes
                var sec = new Date().getSeconds();      //Current Seconds
                this.setState({
                    date: date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
                });

                this.pegarLocalizacao();      // enquanto a localização for atualizada atualiza a renderizacao

                //pegando valores do magnetometro
                let auxMg = JSON.stringify(this.state.coordenadas);
                auxMg = JSON.parse(auxMg);
                this.setState({
                    magX: auxMg.coordX,
                    magY: auxMg.coordY,
                    magZ: auxMg.coordZ,
                    direcao: this._direction(this._degree(this.state.magnetometer)),
                });
                this._toggle();
            }
        })
    }

    salvarNoBanco = async () =>{
        await this.loadRepository();  //verificando se o usuario logou

        if(this.state.image == null) alert('Imagem não pode ser vazia!')
        else if(!this.state.logado) alert('Usuário não logado!')
           else{
                ext = '';                                                   //variaveis para buscar extensao da imagem
                var auxExtensao = this.state.image.uri.lastIndexOf('.')     //

                for(let aux = auxExtensao+1; aux < this.state.image.uri.length; aux++)  //percorrendo o array para pegar a extensao
                    ext+= this.state.image.uri[aux];                                    //
                    this.salvarNoRepositorioOffline()

                    // fetch('http://200.145.184.232:3013/',{       //MUDAR PARA O IP DA MAQUINA (SERVER)
                    //     method: 'POST',
                    //     body: JSON.stringify({                      // DADOS PARA O BANCO
                    //         coordinates:{                           //.coordenadas do ponto
                    //             latitude: this.state.latitude,      //
                    //             longitude: this.state.longitude,    //    
                    //         },                                      
                    //         acuracia: this.state.accuracy,          //
                    //         altitude: this.state.altitude,          //
                    //         perguntas: this.state.perguntas,        //
                    //         respostas:this.state.respostas,         //
                    //         descricao: this.state.descricao,        //
                    //         imagem:{
                    //             base64: this.state.image.base64,    //
                    //         },
                    //         extensao: ext,                          //.extensao do arquivo
                    //         direcaoAngulo: this._degree(this.state.magnetometer),       ////
                    //         direcao: this.state.direcao,
                    //         dataHora: this.state.date,
                    //         magnetometro:{
                    //             x: this.state.magX,
                    //             y: this.state.magY,
                    //             z: this.state.magZ,
                    //         },
                    //         usuario:{
                    //             email: this.state.usuario.emailUsuario,
                    //             nome: this.state.usuario.nomeUsuario
                    //         }
                    //     }),
                    //     headers: {"Content-Type": "application/json"}
                    // }).catch(
                    //     err => alert('Dados não enviados, salvos na biblioteca!')
                    // )
                    // .finally(
                    //     this.salvarNoRepositorioOffline()
                    // )
            }//else
    }//salvar

    zerarRespostas = async () => {
        this.setState({
            descricao: '',
            date: '', 
            image: null,
            magX: null,
            magY: null,
            magZ: null,
            direcao: null,
            accuracy: 0,
            latitude: 0,
            longitude: 0,
            altitude: 0
        }) //setando para valores iniciais
    }

    salvarRespostaNoState(index, pergunta){
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

    pegarLocalizacao(){       //busca as coordenadas para atualizar a posicao dos pontos
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                posAuxiliar = JSON.stringify(pos);
                posAuxiliar = JSON.parse(posAuxiliar);

                this.setState({
                    latitude: posAuxiliar.coords.latitude,
                    longitude: posAuxiliar.coords.longitude,
                    accuracy: posAuxiliar.coords.accuracy,
                    altitude: posAuxiliar.coords.altitude,
                    error: null
                });
            },
            (error) => this.setState({ erro: error.message }),
            {   enableHighAccuracy: false,    //alta precisao
                timeout: 20000,             //tempo para executar antes de retornar erro
                maximumAge: 1000 },         //tempo permitido de cache do dispositivo
        )
    }

    async salvarNoRepositorioOffline(){
        const data = await {
            id: Math.floor(Date.now() / 1000),

            latitude: this.state.latitude === undefined||null ? 0 : this.state.latitude,
            longitude: this.state.longitude === undefined||null ? 0 : this.state.longitude,

            acuracia: this.state.accuracy === undefined||null ? 'Vazio' : this.state.accuracy,
            altitude: this.state.altitude === undefined||null ? 'Vazio' : this.state.altitude,
            perguntas: this.state.perguntas  === undefined||null ? 'Vazio' : this.state.perguntas.toString(),
            respostas: this.state.respostas  === undefined||null ? 'Vazio' : this.state.respostas.toString(),
            descricao: this.state.descricao === undefined||null ? 'Vazio' : this.state.descricao,
            imagem: this.state.image === undefined||null ? 'Vazio' : this.state.image.base64,
            extensao: ext === undefined||null ? 'Vazio' : ext,
            direcao: this.state.magnetometer === undefined||null ? 0 : parseFloat(this._degree(this.state.magnetometer)),
            dataHora: this.state.date === undefined||null ? 'Vazio' : this.state.date,
            x: this.state.magX === undefined||null ? 'Vazio' : this.state.magX.toString(),
            y: this.state.magY === undefined||null ? 'Vazio' : this.state.magY.toString(),
            z: this.state.magZ === undefined||null ? 'Vazio' : this.state.magZ.toString(),
            emailUsuario: this.state.usuario.emailUsuario === undefined||null ? 'Vazio' : this.state.usuario.emailUsuario,
            nomeUsuario: this.state.usuario.nomeUsuario === undefined||null ? 'Vazio' : this.state.usuario.nomeUsuario,
        }

        const realm = await getRealm();

        realm.write(() =>{
            realm.create('Repository', data)
        });
        
        await realm.close();

        alert('Dados salvos no repositório!');
        this.zerarRespostas();
    }

    async loadRepository(){
        const realm = await getUser();
        const data = await realm.objects('User');
        
        let auxParaPegarUsuario;
        
        if(data.length == 1){
            auxParaPegarUsuario = JSON.stringify(data[0]);
            this.setState({
                usuario: JSON.parse(auxParaPegarUsuario),
                logado: true
            });
        }else{
            this.setState({
                logado: false
            });
        }
        await realm.close();
    }

    render(){
        return(
            <ScrollView>
                <View style={Estilo.container}>
                    <Text style={Estilo.title}>Submeter imagem</Text>
                    <View style={Estilo.imageContainer}>
                        <Image source={this.state.image} style={Estilo.image}/>
                    </View>
                    <TouchableOpacity onPress={this.tirarFoto} style={Estilo.buttom}>
                        <Icon name='camera' size={25} color={'white'}></Icon>
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
                                        onPress={radioButtons => this.salvarRespostaNoState(index, pergunta.pergunta)}
                                    />
                                </View>
                                {/* <Text key={index} style={{marginLeft:20}}>Selecionado: {this.state.perguntas[index]} {this.state.respostas[index]}</Text> */}
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
                                <Text style={Estilo.dados}>Direção: {this.state.direcao}</Text>
                                <Text style={Estilo.dados}>X: {this.state.magX}</Text>
                                <Text style={Estilo.dados}>Y: {this.state.magY}</Text>
                                <Text style={Estilo.dados}>Z: {this.state.magZ}</Text>
                            </View>
                            <View style={Estilo.dadosMag}>
                                <Text style={Estilo.dados}>{this.state.date}</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity onPress={this.salvarNoBanco} style={Estilo.buttomEnviar}>
                        <Icon name='save' size={25} color={'white'}/>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }

/*************************FUNCOES PARA DIRECAO*************************/
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
            error => console.log("Sensor não disponível")
        )
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
}

