import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native'
import getRealm from '../services/Realm';
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'


import Estilo from '../css/Estilos'

export default class EnviaDados extends Component {
    state = {
        Repositories: [],
        page: 1,
        loading: false,
    }

    async loadRepository() {
        if (this.state.loading) return;

        const realm = await getRealm();
        var data = realm.objects('Repository');

        var dados = [];

        data.map(dado => {
            var auxCopiarDados = JSON.stringify(dado);
            dados.push(JSON.parse(auxCopiarDados));
        })

        this.setState({
            Repositories: dados,
            loading: true
        });

        realm.close();
    }

    componentDidMount() {
        this.loadRepository();
    }

    async deletar(id) {
        const realm = await getRealm();

        realm.write(async () => {
            let ponto = realm.objectForPrimaryKey('Repository', id);
            realm.delete(ponto);
        });

        this.loadRepository();
    }

    async enviarAoBanco(id) {
        const realm = await getRealm();
        let ponto = realm.objectForPrimaryKey('Repository', id);

        let enviado = true;
        
        await fetch('http://186.217.108.95:3013', {
            method: 'POST',
            body: JSON.stringify({
                coordinates: {
                    latitude: ponto.latitude,
                    longitude: ponto.longitude,
                },
                acuracia: ponto.acuracia,
                altitude: ponto.altitude,
                perguntas: ponto.perguntas,
                respostas: ponto.respostas,
                descricao: ponto.descricao,
                imagem: {
                    base64: ponto.imagem,
                },
                extensao: ponto.extensao,
                direcao: ponto.direcao,
                dataHora: ponto.dataHora,
                magnetometro: {
                    x: ponto.x,
                    y: ponto.y,
                    z: ponto.z,
                },
                usuario: {
                    email: ponto.emailUsuario,
                    nome: ponto.nomeUsuario
                }
            }),
            headers: { "Content-Type": "application/json" }
        })
            .catch(
                err => {
                    alert('Dados não enviados ' + err),
                        enviado = false
                }
            )

        if (enviado) {
            realm.write(() => {
                realm.delete(ponto);
            });

            alert('Dados enviados!');
            this.loadRepository();
        }
    }

    renderFooter = () => {
        if (this.state.loading) return null;
        else {
            this.setState({
                loading: true
            })
            return (
                <View style={Estilo.footerGaleria}>
                    <ActivityIndicator />
                </View>
            );
        }
    };

    salvarImagemNaGaleria = (base64Image) => {
        // var Base64Code = base64Image.split("data:image/png;base64,"); //base64Image is my image base64 string

        // const dirs = RNFetchBlob.fs.dirs;
        
        // var path = dirs.DCIMDir + "/image.png";

        // RNFetchBlob.fs.writeFile(path, Base64Code[1], 'base64')
        //     .then((res) => { console.log("File : ", res) });
        console.warn('carregou uma imagem!');
    }


    renderItem = ({ item }) => (
        <View style={Estilo.dadosCard}>
            {/* {this.salvarImagemNaGaleria(`data:image/${item.extensao};base64,${item.imagem}`)} */}
            <View style={Estilo.viewImagem}>
                <Image style={Estilo.dadosImagem} source={{ uri: `data:image/${item.extensao};base64,${item.imagem}` }} />
            </View>
            <View>
                <Text style={Estilo.dadosTexto}>DADOS</Text>
                <View style={Estilo.dadosViewTexto}>
                    <Text style={Estilo.dadosTexto}>Data: </Text>
                    <Text style={Estilo.dadosInfo}>{item.dataHora}</Text>
                </View>
                <View style={Estilo.dadosViewTexto}>
                    <Text style={Estilo.dadosTexto}>Latitude: </Text>
                    <Text style={Estilo.dadosInfo}>{item.latitude}</Text>
                </View>
                <View style={Estilo.dadosViewTexto}>
                    <Text style={Estilo.dadosTexto}>Longitude: </Text>
                    <Text style={Estilo.dadosInfo}>{item.longitude}</Text>
                </View>
                <View style={Estilo.dadosViewTexto}>
                    <Text style={Estilo.dadosTexto}>Acuracia: </Text>
                    <Text style={Estilo.dadosInfo}>{item.acuracia}</Text>
                </View>
                <View style={Estilo.dadosViewTexto}>
                    <Text style={Estilo.dadosTexto}>Altitude: </Text>
                    <Text style={Estilo.dadosInfo}>{item.altitude}</Text>
                </View>
                <View style={Estilo.dadosViewTexto}>
                    <Text style={Estilo.dadosTexto}>Perguntas: </Text>
                    <Text style={Estilo.dadosInfo}>{item.perguntas.toString()}</Text>
                </View>
                <View style={Estilo.dadosViewTexto}>
                    <Text style={Estilo.dadosTexto}>Respostas: </Text>
                    <Text style={Estilo.dadosInfo}>{item.respostas.toString()}</Text>
                </View>
                <View style={Estilo.dadosViewTexto}>
                    <Text style={Estilo.dadosTexto}>Descrição: </Text>
                    <Text style={Estilo.dadosInfo}>{item.descricao}</Text>
                </View>
                <View style={Estilo.dadosViewTexto}>
                    <Text style={Estilo.dadosTexto}>Direção: </Text>
                    <Text style={Estilo.dadosInfo}>{item.direcao}º</Text>
                </View>
                <View style={Estilo.dadosViewTexto}>
                    <Text style={Estilo.dadosTexto}>X: </Text>
                    <Text style={Estilo.dadosInfo}>{item.x}</Text>
                </View>
                <View style={Estilo.dadosViewTexto}>
                    <Text style={Estilo.dadosTexto}>Y: </Text>
                    <Text style={Estilo.dadosInfo}>{item.y}</Text>
                </View>
                <View style={Estilo.dadosViewTexto}>
                    <Text style={Estilo.dadosTexto}>Z: </Text>
                    <Text style={Estilo.dadosInfo}>{item.z}</Text>
                </View>
                <View style={Estilo.dadosViewTexto}>
                    <Text style={Estilo.dadosTexto}>Nome: </Text>
                    <Text style={Estilo.dadosInfo}>{item.nomeUsuario}</Text>
                </View>
                <View style={Estilo.dadosViewTexto}>
                    <Text style={Estilo.dadosTexto}>Email: </Text>
                    <Text style={Estilo.dadosInfo}>{item.emailUsuario}</Text>
                </View>
            </View>
            <View style={Estilo.dadosBotoes}>
                <TouchableOpacity onPress={() => this.deletar(item.id)} style={Estilo.buttomDelete}>
                    <MaterialIcon name='delete-empty' size={25} color={'white'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.enviarAoBanco(item.id)} style={Estilo.buttomEnviar}>
                    <Icon name='arrow-right' size={25} color={'white'} />
                </TouchableOpacity>
            </View>
        </View>
    );

    render() {
        const listaComItem =
            <FlatList
                style={Estilo.flat}
                data={this.state.Repositories}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => String(index)}
                onEndReached={() => this.loadRepository()}
                onEndReachedThreshold={0.1}
                ListFooterComponent={this.renderFooter}
            >
            </FlatList>

        const listaVazia = <View>
            <View style={Estilo.MensagemNenhumItemSalvo}>
                <Text style={Estilo.NenhumItemSalvo}>Nenhum item salvo!</Text>
            </View>
        </View>

        return (
            <View>
                <View style={Estilo.headerGaleria}>
                    <Text style={Estilo.tituloHeaderDadosSalvos}>Galeria</Text>
                    <TouchableOpacity style={Estilo.botaoAtualizar} onPress={() => this.loadRepository()} style={Estilo.buttomEnviar}>
                        <MaterialIcon name='reload' size={25} color={'white'} />
                    </TouchableOpacity>
                </View>
                {this.state.Repositories.length > 0 ? listaComItem : listaVazia}
            </View>
        )
    }
}
