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
      initialRoute={{id: 'CalculatorPage', title: 'Tip Calculator Page'}}
      renderScene={(route, navigator) => {
        switch (route.id) {
          case 'CalculatorPage':
            return <CalculatorPage navigator={navigator} />
            break;
          case 'BlankPage':
            return (
              <View>
                <Button
                  style={{width:10, flex:0.1}}
                  title="Go Back"
                  onPress={() => navigator.pop({id:"CalculatorPage"})}
                />

                <View style={{flexDirection:'column'}}>
                  <Text>Fck ya !!! I'm a blank page, I have nothing !</Text>
                </View>

              </View>
            )
            break;
          default:
        }
      }}
    />
      
    )
  }
}


AppRegistry.registerComponent('RNTipCalculator', () => RNTipCalculator);
