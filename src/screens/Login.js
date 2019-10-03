import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, Image, Text } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

import { getUser } from '../services/Realm';

import Icon from 'react-native-vector-icons/SimpleLineIcons'
import Estilo from '../css/Estilos'

export default class Login extends Component{
    state={
        userInfo : null,
        logado: false,
        usuario:{
            fotoUsuario: 'qualquer',
            emailUsuario: 'email',
            nomeUsuario: 'nome'
        },
        User: null
    }

    async componentDidMount(){
        GoogleSignin.configure({});
        await this.loadRepository();
    }

    // Somewhere in your code
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

            this.escreverUsuarioNovo();
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.warn(error);
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.warn(error);
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.warn(error);            
            } else {
                this.getCurrentUser();
                this.getCurrentUserInfo();
            }
        }
    };
    
    signOut = async () => {
        try {
          this.apagarUsuarioAntigo();
          
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();

          this.setState({userInfo: null})
        } catch (error) {
          console.error(error);
        }
      };

    getCurrentUser = async () => {
        const currentUser = await GoogleSignin.getCurrentUser();
        this.setState({ currentUser });
        alert(this.state.userInfo);
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

    async loadRepository(){

        const realm = await getUser();
        const data = await realm.objects('User');
        let auxParaPegarUsuario;
        
        console.warn(data)
        
        if(data.length == 1){
            auxParaPegarUsuario = JSON.stringify(data[0]);
            this.setState({
                usuario: JSON.parse(auxParaPegarUsuario),
                logado: true
            });
        }
        realm.close();
    }

    async escreverUsuarioNovo(){
        const data = await {
            id: Math.floor(Date.now() / 1000),

            nomeUsuario: this.state.userInfo.user.name === undefined||null ? 'Vazio' : this.state.userInfo.user.name,
            emailUsuario: this.state.userInfo.user.email === undefined||null ? 'Vazio' : this.state.userInfo.user.email,
            fotoUsuario: this.state.userInfo.user.photo === undefined||null ? 'Vazio' : this.state.userInfo.user.photo
        }

        const realm = await getUser();          //registrando usuario no banco
        realm.write(() =>{                      //
            realm.create('User', data);         //
        });                                     //

        this.setState({
            usuario:{
                nomeUsuario: this.state.userInfo.user.name,
                emailUsuario: this.state.userInfo.user.email,
                fotoUsuario: this.state.userInfo.user.photo,
            }
        });

        this.setState({
            logado: true,
        })

        realm.close();
    }

    async apagarUsuarioAntigo(){
        const realm = await getUser();                      //abrindo conexao com banco
        
        const Usuario = await realm.objects('User');        //recebendo objetos do banco de usuarios

        realm.write(() => {                                 //sobrescrevendo objeto recebido
            realm.delete(Usuario[0]);                       //
        })                                                  //

        this.setState({             //setando variavel de login
            logado: false           //
        })                          //

        realm.close();
    }

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
                                    <Image 
                                        source = {{uri:this.state.usuario.fotoUsuario}}
                                        style = {Estilo.loginImagemUsuario}
                                        />
                                </View>
                                <View style={Estilo.loginViewInformacaoUsuario}>
                                    <Text style={Estilo.loginNomeUsuario}>
                                        {this.state.usuario.nomeUsuario}
                                    </Text>
                                    <Text style={Estilo.loginEmailUsuario}>
                                        {this.state.usuario.emailUsuario}
                                    </Text>
                                </View>
                                <TouchableOpacity style={Estilo.loginBotaoSair} onPress={this.signOut}>
                                    <Icon name='logout' size={25} color={'red'}></Icon><Text style={Estilo.loginTextoSair}>Sair</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

        return(
            
                this.state.logado ? sair : login
            
        )
    }
}