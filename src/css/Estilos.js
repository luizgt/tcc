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
    localizacao: {
        backgroundColor: '#FFA500',
        width: '90%',
        borderRadius: 20,
        alignItems: 'center'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
})