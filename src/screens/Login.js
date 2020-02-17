import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

import Icon from 'react-native-vector-icons/SimpleLineIcons'
import Estilo from '../css/Estilos'

export default class Login extends Component{
    state={
        userInfo:{
            user:{
                photo: "Sem infomação.",
                email: "Sem infomação.",
                name: "Sem infomação."
            }
        },
        logado: false
    }

    async componentDidMount(){
        GoogleSignin.configure({});
        await this.isSignedIn();
    }

    isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        this.setState({ logado: isSignedIn });
        this.state.logado ? this.getCurrentUser() : null
      };

    signIn = async () => {
        try {
            try {
                await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
                // google services are available
              } catch (err) {
                console.error('play services are not available');
              }
        const userInfo = await GoogleSignin.signIn();
        
        this.setState({ userInfo });
        this.isSignedIn();

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // console.warn(error);
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // console.warn(error);
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // console.warn(error);            
            } else {
                alert(error);
                this.getCurrentUser();
                this.getCurrentUserInfo();
            }
        }
    };

    signOut = async () => {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();

          this.setState({
            userInfo :{
                user:{
                    photo: "vazio",
                    email: "vazio",
                    name: "vazio"
                }
            }
          })
          
        } catch (error) {
          console.error(error);
        };
        this.isSignedIn();
    };

    getCurrentUser = async () => {
        const userInfo = await GoogleSignin.getCurrentUser();
        this.setState({ userInfo });
    };

    getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            this.setState({ userInfo });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
            // user has not signed in yet
            } else {
            // some other error
            }
        }
    };

    render(){
        const login =   <View style={Estilo.loginView}>
                            <Text style={Estilo.loginTitulo}>Faça login para continuar!</Text>
                            <GoogleSigninButton
                                style={Estilo.loginBotaoGoogle}
                                size={GoogleSigninButton.Size.Standard}
                                color={GoogleSigninButton.Color.Dark}
                                onPress={this.signIn}
                            />
                        </View>

        const sair =    <View style={Estilo.viewFundoDadosUsuario}>
                            <View style={Estilo.viewDadosUsuario}>
                                <View style={Estilo.loginViewImagemUsuario}>
                                    {
                                        this.state.userInfo.user.photo === null ?
                                        <Image source = {require('../images/imagemUsuario.png')}
                                        style = {Estilo.loginImagemUsuario}/>
                                        :
                                        <Image source = {{uri:this.state.userInfo.user.photo}}
                                        style = {Estilo.loginImagemUsuario}/>
                                    }
                                </View>
                                <View style={Estilo.loginViewInformacaoUsuario}>
                                    <Text style={Estilo.loginNomeUsuario}>
                                        {this.state.userInfo.user.name}
                                    </Text>
                                    <Text style={Estilo.loginEmailUsuario}>
                                        {this.state.userInfo.user.email}
                                    </Text>
                                </View>
                                <TouchableOpacity style={Estilo.loginBotaoSair} onPress={this.signOut}>
                                    <Icon name='logout' size={25} color={'red'}></Icon><Text style={Estilo.loginTextoSair}>Sair</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

        return( this.state.logado ? sair : login )
    }
}