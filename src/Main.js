import React from 'react'
import {createBottomTabNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

import EnviaDados from './screens/EnviaDados'
import Mapa from './screens/Mapa'

const MenuRoutes ={
    EnviaDados: {
        teste: 1,
        name: 'Enviar Dados',
        screen: EnviaDados,
        navigationOptions:{
            title: 'Feed',
            tabBarIcon: ({tintColor}) =>
                <Icon name='camera' size={25} color={tintColor} />
        }
    },
    Mapa: {
        name: 'Mapa',
        screen: Mapa,
        navigationOptions:{
            title: 'Feed',
            tabBarIcon: ({tintColor}) =>
                <Icon name='map' size={25} color={tintColor} />
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