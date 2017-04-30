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

import CalculatorPage from './app/calculator-page'
import SettingPage from './app/setting-page'
import Utils from './app/utils'

export default class RNTipCalculator extends Component {

  constructor(props) {
    super(props);

    this.state = {}
  }
  
  componentDidMount() { 
  }

  render() {

    return (
      <Navigator
        initialRoute={Utils.routes.CalculatorPage}
        renderScene={(route, navigator) => {
          switch (route.id) {
            case Utils.routes.CalculatorPage.id:
              return <CalculatorPage navigator={navigator} />
              break;
            case Utils.routes.SettingPage.id:
              return <SettingPage navigator={navigator} />
              break;
            default:
          }
        }}
      />
    )

  }
}


AppRegistry.registerComponent('RNTipCalculator', () => RNTipCalculator);
