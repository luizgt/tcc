import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import Estilo from '../css/Estilos'
import getRealm from '../services/Realm';
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'



export default class EnviaDados extends Component{
    state = {
        Repositories: [],
    }

    async loadRepository(){
        const realm = await getRealm();
        const data = await realm.objects('Repository');

        this.setState({
            Repositories: data
        });
    }

    componentDidMount(){
        this.loadRepository();
    }

    async deletar(id){
        const realm = await getRealm();

        realm.write(() => {
            let ponto = realm.objectForPrimaryKey('Repository', id);
            realm.delete(ponto);
        });

        this.loadRepository()
    }

    async enviarAoBanco(id){
        const realm = await getRealm();
        let ponto = realm.objectForPrimaryKey('Repository', id);

        let enviado = true;

        fetch('http://200.145.184.232:3013/',{
            method: 'POST',
            body: JSON.stringify({                  
                coordinates:{
                    latitude: ponto.latitude,
                    longitude: ponto.longitude,
                },
                acuracia: ponto.accuracy,
                altitude: ponto.altitude,
                perguntas: ponto.perguntas,
                respostas:ponto.respostas,
                descricao: ponto.descricao,
                imagem:{
                    base64: ponto.imagem,
                },
                extensao: ponto.extensao,
                direcao: ponto.direcao,
                dataHora: ponto.date,
                magnetometro:{
                    x: ponto.magX,
                    y: ponto.magY,
                    z: ponto.magZ,
                },
                usuario:{
                    email: ponto.emailUsuario,
                    nome: ponto.nomeUsuario
                }
            }),
            headers: {"Content-Type": "application/json"}
        })
        .catch(
            err => alert(err),
            enviado = false
        )

        if(enviado){
            realm.write(() => {
                realm.delete(ponto);
            });
            
            alert('Dados enviados!');
            this.loadRepository();
        }
    }

    render(){
        const listaComItem = 
            <View>
                <View style={Estilo.dadosAtualizar}>
                    <TouchableOpacity onPress={() => this.loadRepository()} style={Estilo.buttomEnviar}>
                                <MaterialIcon name='reload' size={25} color={'white'}/>
                    </TouchableOpacity>
                </View>
                {this.state.Repositories.map((Dado,index) => (
                    <View key={index}>

                        <View style={Estilo.dadosCard}>
                            <View style={Estilo.viewImagem}>
                                <Image style={Estilo.dadosImagem} source={{uri: `data:image/${Dado.extensao};base64,${Dado.imagem}`}}/>
                            </View>
                            <View>
                                <Text style={Estilo.dadosTexto}>DADOS</Text>           
                                    <View style={Estilo.dadosViewTexto}>
                                        <Text style={Estilo.dadosTexto}>Latitude: </Text>    
                                        <Text style={Estilo.dadosInfo}>{Dado.latitude}</Text>
                                    </View>
                                    <View style={Estilo.dadosViewTexto}>
                                        <Text style={Estilo.dadosTexto}>Longitude: </Text>   
                                        <Text style={Estilo.dadosInfo}>{Dado.longitude}</Text>
                                    </View>
                                    <View style={Estilo.dadosViewTexto}>
                                        <Text style={Estilo.dadosTexto}>Acuracia: </Text>   
                                        <Text style={Estilo.dadosInfo}>{Dado.acuracia}</Text>
                                    </View>
                                    <View style={Estilo.dadosViewTexto}>
                                        <Text style={Estilo.dadosTexto}>Altitude: </Text>   
                                        <Text style={Estilo.dadosInfo}>{Dado.altitude}</Text>
                                    </View>
                                    <View style={Estilo.dadosViewTexto}>
                                        <Text style={Estilo.dadosTexto}>Perguntas: </Text>   
                                        <Text style={Estilo.dadosInfo}>{Dado.perguntas}</Text>
                                    </View>
                                    <View style={Estilo.dadosViewTexto}>
                                        <Text style={Estilo.dadosTexto}>Respostas: </Text>   
                                        <Text style={Estilo.dadosInfo}>{Dado.respostas}</Text>
                                    </View>
                                    <View style={Estilo.dadosViewTexto}>
                                        <Text style={Estilo.dadosTexto}>Descrição: </Text>   
                                        <Text style={Estilo.dadosInfo}>{Dado.descricao}</Text>
                                    </View>
                                    <View style={Estilo.dadosViewTexto}>
                                        <Text style={Estilo.dadosTexto}>Direção: </Text>   
                                        <Text style={Estilo.dadosInfo}>{Dado.direcao}º</Text>
                                    </View>
                                    <View style={Estilo.dadosViewTexto}>
                                        <Text style={Estilo.dadosTexto}>Data: </Text>   
                                        <Text style={Estilo.dadosInfo}>{Dado.dataHora}</Text>
                                    </View>
                                    <View style={Estilo.dadosViewTexto}>
                                        <Text style={Estilo.dadosTexto}>X: </Text>   
                                        <Text style={Estilo.dadosInfo}>{Dado.x}</Text>
                                    </View>
                                    <View style={Estilo.dadosViewTexto}>
                                        <Text style={Estilo.dadosTexto}>Y: </Text>   
                                        <Text style={Estilo.dadosInfo}>{Dado.y}</Text>
                                    </View>
                                    <View style={Estilo.dadosViewTexto}>
                                        <Text style={Estilo.dadosTexto}>Z: </Text>   
                                        <Text style={Estilo.dadosInfo}>{Dado.z}</Text>
                                    </View>
                                    <View style={Estilo.dadosViewTexto}>
                                        <Text style={Estilo.dadosTexto}>Nome: </Text>   
                                        <Text style={Estilo.dadosInfo}>{Dado.nomeUsuario}</Text>
                                    </View>
                                    <View style={Estilo.dadosViewTexto}>
                                        <Text style={Estilo.dadosTexto}>Email: </Text>   
                                        <Text style={Estilo.dadosInfo}>{Dado.emailUsuario}</Text>
                                    </View>
                            </View>
                            <View style={Estilo.dadosBotoes}>
                                <TouchableOpacity onPress={() => this.deletar(Dado.id)} style={Estilo.buttomDelete}>
                                    <MaterialIcon name='delete-empty' size={25} color={'white'}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.enviarAoBanco(Dado.id)} style={Estilo.buttomEnviar}>
                                    <Icon name='arrow-right' size={25} color={'white'}/>
                                </TouchableOpacity>
                            </View>   
                        </View>
                    </View>
                ))}
            </View>

        const listaVazia = <View>
                <View style={Estilo.MensagemNenhumItemSalvo}>

                    <Text style={Estilo.NenhumItemSalvo}>Nenhum item salvo!</Text>
                    <View style={Estilo.dadosBotoes}>
                        <TouchableOpacity onPress={() => this.loadRepository()} style={Estilo.buttomEnviar}>
                            <MaterialIcon name='reload' size={25} color={'white'}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        return(
            <ScrollView style={Estilo.dadosPrincipal}>
                {this.state.Repositories.length > 0 ? listaComItem : listaVazia}
            </ScrollView>
        )
    }
}
