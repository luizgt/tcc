import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Dimensions, Platform, ScrollView, Alert } from 'react-native'
import ImagePicker from 'react-native-image-picker'

class AddPhoto extends Component{
    state = {
        image: null,
        comment: '',
    }

    pickImage = () =>{
        ImagePicker.showImagePicker({
            tittle: 'Escolha a Imagem',
            maxHeight: 600,
            maxWidth: 800,
        }, res=>{
            if(!res.didCancel){
                this.setState({image: {uri: res.uri, base64: res.data}})
            }
        })
    }

    save = async ()=>{
        Alert.alert('Imagem Adicionada!', this.state.comment)
    }

    render(){
        return(
            <ScrollView>
                <View style={StyleSheet.container}>
                    <Text style={StyleSheet.title}>Compartilhe uma imagem</Text>
                    <View style={StyleSheet.imageContainer}>
                        <Image source={this.state.image} style={StyleSheet.image}/>
                    </View>
                    <TouchableOpacity onPress={this.pickImage} style={StyleSheet.buttom}>
                        <Text style={StyleSheet.buttomText}>Escolha a foto</Text>
                    </TouchableOpacity>
                    <TextInput placeHolder="Comentário para a foto"
                        style={StyleSheet.input} value={this.state.comment}
                        onChanceText={comment => this.setState({comment})}/>
                    <TouchableOpacity onPress={this.save}
                        style={StyleSheet.buttom}>
                            <Text style={StyleSheet.buttomText}>Salvar</Text>
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
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4'
    },
    buttomText:{
        fontSize: 20,
        color: '#FFF'
    },
    input:{
        marginTop: 20,
        width: '90%'
    }
})

export default AddPhoto