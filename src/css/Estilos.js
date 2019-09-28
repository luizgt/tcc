import { StyleSheet, Dimensions, Platform } from 'react-native'

export default StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center'
    },
    dados:{
        color: '#000',
        fontSize: 15
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
        backgroundColor: '#4286f4'
    },
    buttomDelete:{
        marginTop: 15,
        marginRight: 25,
        padding: 10,
        borderRadius: 50,
        backgroundColor: '#FF0000'
    },
    buttomAtualizarMapa:{
        marginTop: 15,
        marginLeft: 15,
        padding: 10,
        borderRadius: 50,
        backgroundColor: '#4286f4',
        width: 85
    },
    Text:{
        fontSize: 17,
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
    },
    coordenadas: {
        backgroundColor: '#FFF',
        width: '90%',
        // display:'flex',
        borderRadius: 20,
        alignItems: 'center'
    },
    localizacao: {
        backgroundColor: '#FFA500',
        width: '90%',
        borderRadius: 20,
        alignItems: 'center',
        // display:'flex'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    legenda:{
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 10,
        color: '#000'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
    infoView: {
        backgroundColor: '#FFF',
        display: 'flex', 
        borderRadius: 20, 
        alignItems: 'center'
    },
    infoCallOut: {
        backgroundColor: '#FFA500',
        borderRadius: 10
    },
    formulario:{
        marginTop: 5,
        marginBottom: 5,
    },
    perguntasView: {
        marginTop: 10,
        marginBottom: 10,
        width: '100%'
    },
    perguntaText:{
        fontSize: 20,
        marginLeft: 20,
        marginBottom:5,
        color: '#000',
    },
    botoesView:{
        display:'flex', 
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    botoes:{
        display:'flex',
        fontSize: 17,
        display: 'flex',
        flexDirection: 'row'
    },
    dadosMag:{
        marginTop: 10,
    },
    dadosPrincipal:{
        padding: 15,
    },
    dadosCard:{
        padding:  15,
        borderColor: '#FFAE40',
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 15,
    },
    dadosTexto:{
        color: '#000',
        fontSize: 14,
        marginBottom: 5,
        fontWeight:'bold'
    },
    dadosInfo:{
        color: '#000',
        fontSize: 14,
        marginBottom: 5
    },
    dadosViewTexto:{
        display:'flex',
        flexDirection:'row'
    },
    dadosImagem:{
        width: 150,
        height: 200,
        borderRadius: 10,
    },
    viewImagem:{
        marginBottom: 15,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    dadosBotoes:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    NenhumItemSalvo:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    MensagemNenhumItemSalvo:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        marginBottom: 40,
        marginTop: 80
    }
})