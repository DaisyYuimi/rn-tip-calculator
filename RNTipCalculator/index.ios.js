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
  TextInput
} from 'react-native';

import SegmentedControlTab from 'react-native-segmented-control-tab'

export default class RNTipCalculator extends Component {

  constructor(props) {
    super(props);

    this.state = {
      billAmount: 0,
      selectedTipIndex: 0
    }
  }
  
  componentDidMount() { 
  }

  handleAmountChange(value) {
    this.setState({
      billAmount: value
    })      
  }

  render() {
    return (
      
      <View>
        <TouchableWithoutFeedback onPress={ () => {Keyboard.dismiss()} }>
          <View>

            <View>
              <TextInput autoFocus={true} keyboardType='numeric' style={{height: 40}} onChangeText={ this.handleAmountChange.bind(this) } placeholder="Enter Bill amount"/>
            </View>

            <View>
              <View>
                <SegmentedControlTab
                  values= {["10%", "20%", "30%"]}
                  selectedIndex={1}
                  onTabPress={ function(){ console.log("Tab pressed.")} }
                />
              </View>

              <View>
                <Text>Bill amount: {this.state.billAmount}</Text>
                <Text>Tip amount: 0</Text>
                <Text>Percent: 0</Text>
              </View>

              <View>
                <Text>Result: 0</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}


AppRegistry.registerComponent('RNTipCalculator', () => RNTipCalculator);
