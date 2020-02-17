import React from 'react'
import {createBottomTabNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

import EnviaDados from './EnviaDados'
import Galeria from './Galeria'
import Mapa from './Mapa'
import Login from './Login'

const MenuRoutes ={
    EnviaDados: {
        name: 'Enviar Dados',
        screen: EnviaDados,
        navigationOptions:{
            title: 'Enviar',
            tabBarIcon: ({tintColor}) =>
                <Icon name='camera' size={25} color={tintColor} />
        }
    },
    Galeria: {
        name: 'Galeria',
        screen: Galeria,
        navigationOptions:{
            title: 'Dados',
            tabBarIcon: ({tintColor}) =>
                <Icon name='picture-o' size={25} color={tintColor} />
        }
    },
    Mapa: {
        name: 'Mapa',
        screen: Mapa,
        navigationOptions:{
            title: 'Mapa',
            tabBarIcon: ({tintColor}) =>
                <Icon name='map' size={25} color={tintColor} />
        }
    },
    Login: {
        name: 'Login',
        screen: Login,
        navigationOptions:{
            title: 'Login',
            tabBarIcon: ({tintColor}) =>
                <Icon name='user' size={25} color={tintColor} />
        }
    }
}

const MenuConfig = {
    initialRouteName: 'EnviaDados',
    tabBarOptions:{
        showLabel: false,
    }
}

const MenuNavigator = createBottomTabNavigator(MenuRoutes, MenuConfig)
export default MenuNavigator