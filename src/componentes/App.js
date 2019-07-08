/**
 * Author: Luiz G Thomaz
 * https://www.facebook.com/NaoPrecisaLerAqui
 *
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import EnviaDados from '../screens/EnviaDados';
import Main from '../Main'

export default class App extends Component {
  render() {
    return (
      <Main/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  },
  instructions: {
    textAlign: 'center',
    color: '#ff69b4',
    marginBottom: 5,
    fontWeight: 'bold'
  },
});
