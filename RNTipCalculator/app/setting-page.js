/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  Slider,
  Navigator,
  Button
} from 'react-native';

import Utils from './utils'

export default class SettingPage extends Component {

  constructor(props) {
    super(props);

    this.state = {}
  }
  
  componentDidMount() { 
  }

  render() {
    return (
      <View style={{flexDirection:'column'}}>
        <Text>Fck ya !!! I'm a blank page, I have nothing !</Text>
      </View>
    )
  }
}

