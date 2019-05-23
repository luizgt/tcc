import React, {Component} from 'react'
import {View, Text, StyleSheet, 
        TouchableOpacity, TextInput, Image, 
        Dimensions, Platform, ScrollView, 
        Alert } from 'react-native'
import ImagePicker from 'react-native-image-picker'

import Localizacao from '../componentes/Localizacao'

export default class EnviaDados extends Component{
    state = {       //estado inicial
        image: null,
        comment: '',
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

    save = async ()=>{
        Alert.alert('Imagem Adicionada!', this.state.comment)
    }

    render(){
        return(
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Submeter imagem</Text>
                    <View style={styles.imageContainer}>
                        <Image source={this.state.image} style={styles.image}/>
                    </View>
                    <TouchableOpacity onPress={this.pickImage} style={styles.buttom}>
                        <Text style={styles.buttomText}>Escolha a foto</Text>
                    </TouchableOpacity>
                    <TextInput placeholder="Descrição da imagem..."
                        style={styles.input} value={this.state.comment}
                        onChangeText={comment => this.setState({ comment })}/>
                    <View style={{marginBottom:0}}>
                        <Localizacao/>
                    </View>
                    <TouchableOpacity onPress={this.save}
                        style={styles.buttomEnviar}>
                            <Text style={styles.buttomText}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center'
    },
    title:{
        fontSize: 20,
        marginTop: Platform.OS === 'ios' ? 30 : 10,
        fontWeight: 'bold'
    },
    imageContainer:{
        width: '90%',
        height: Dimensions.get('window').width * 3 /4,
        backgroundColor: '#EEE',
        marginTop: 10
    },
    image:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 3 /4,
        resizeMode: 'center'
    },
    buttom: {
        marginTop: 25,
        padding: 10,
        borderRadius: 50,
        backgroundColor: '#4286f4'
    },
    buttomEnviar: {
        marginTop: 15,
        padding: 10,
        borderRadius: 50,
        backgroundColor: '#FF0090'
    },
    buttomText:{
        fontSize: 20,
        color: '#FFF'
    },
    input:{
        marginTop: 10,
        marginBottom: 10,
        width: '90%',
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10
    }
})