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
  Button
} from 'react-native';

import Utils from './utils'

export default class CalculatorPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      billAmount: 0,
      selectedTipIndex: 0,
      tipPercent: 10,
      tipAmount: 0,
      result: 0
    }
  }
  
  componentDidMount() { 
  }

  handleAmountChange(value) {
    let billAmount = parseInt(value || 0);

    this.setState({ billAmount: billAmount }, () => {
      this.handleTipChanged(this.state.tipPercent);
    });
  }

  handleTipChanged(value) {
    let tipAmount = parseInt(value) / 100 * this.state.billAmount;
    let result = tipAmount + this.state.billAmount;

    this.setState({
      tipPercent: value,
      tipAmount: tipAmount,
      result: result
    });
  }

  render() {
    return (
      
      <View>
        <Button
            style={{width:30, flex:0.1}}
            title="Settings"
            onPress={() => this.props.navigator.push(Utils.routes.SettingPage)}
          />

        <TouchableWithoutFeedback onPress={ () => {Keyboard.dismiss()} }>
          <View>

            <View>
              <TextInput autoFocus={true} keyboardType='numeric' style={{height: 40}} onChangeText={ this.handleAmountChange.bind(this) } placeholder="Enter Bill amount"/>
            </View>

            <View>
              <View>
                <Slider minimumValue={10} maximumValue={50} step={10} onValueChange={ this.handleTipChanged.bind(this) } />
              </View>

              <View>
                <Text>Bill amount: {this.state.billAmount}</Text>
                <Text>Tip percent: {this.state.tipPercent}%</Text>
                <Text>Tip amount: {this.state.tipAmount.toFixed(1)}</Text>
                
              </View>

              <View>
                <Text>Result: {this.state.result}</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}
