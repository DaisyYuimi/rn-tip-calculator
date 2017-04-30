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
  Button,
  AsyncStorage
} from 'react-native';

import Utils from './utils'

export default class CalculatorPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      billAmount: 0,
      selectedTipIndex: 0,
      tipPercent: 5,
      tipAmount: 0,
      result: 0,
      selectedMinTipValue: 1,
      selectedMaxTipValue: 20,
      selectedCurrency: "dong"
    }

    this.props.route.performRightAction = () => {
      let settingPage = Utils.routes.SettingPage;
      settingPage.parentPage = this;
      this.props.navigator.push(settingPage);
    }
  }
  
  getSettings() {
    AsyncStorage.getItem("SAVED_SETTINGS", (error, value) => {
      let setting = JSON.parse(value);
      if (setting && setting["sceneTransition"]) {
        this.setState(setting);
      }
      
    });
  }

  componentDidMount() { 
    this.getSettings()
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
      <View style={Utils.styles.container}>
        <TouchableWithoutFeedback onPress={ () => {Keyboard.dismiss()} }>
          <View>

            <View>
              <TextInput autoFocus={true} keyboardType='numeric' style={{height: 40}} onChangeText={ this.handleAmountChange.bind(this) } placeholder="Enter Bill amount"/>
            </View>

            <View>
              <View>
                <Slider value={this.state.tipPercent} minimumValue={this.state.selectedMinTipValue} maximumValue={this.state.selectedMaxTipValue} step={1} onValueChange={ this.handleTipChanged.bind(this) } />
              </View>

              <View>
                <Text>+ Tip percent: {this.state.tipPercent}% ({Utils.formatNumber(this.state.tipAmount, this.state.selectedCurrency)})</Text>
              </View>

              <View>
                <Text>Total: {Utils.formatNumber(this.state.result, this.state.selectedCurrency)}</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}
