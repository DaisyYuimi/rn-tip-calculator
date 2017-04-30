import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Slider,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
  Picker,
  AsyncStorage,
  ScrollView
} from 'react-native';

import SegmentedControlTab from 'react-native-segmented-control-tab'

import Utils from './utils'

class SettingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sceneTransition: "FloatFromRight",
      selectedCurrency: "dong",
      selectedCurrencyIndex: 0,
      selectedMinTipValue: 1,
      selectedMaxTipValue: 10
    }

    this.props.route.performRightAction = () => {
      this.setSettings();
      
      if (this.props.route.parentPage) {
        this.props.route.parentPage.getSettings();
      }
      
      this.props.navigator.pop();
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
  
  setSettings() {
    try {
      let data = {
        sceneTransition: this.state.sceneTransition,
        selectedCurrency: this.state.selectedCurrency,
        selectedCurrencyIndex: this.state.selectedCurrency,
        selectedMinTipValue: this.state.selectedMinTipValue,
        selectedMaxTipValue: this.state.selectedMaxTipValue
      }
      AsyncStorage.setItem("SAVED_SETTINGS", JSON.stringify(data));
    } catch(error) {
       console.log("Hmm, something when wrong when set data..." + error);
    }
  }

  selectedSceneTransition(scene) {
    this.setState({
      sceneTransition : scene
    })
  }

  componentDidMount() {
    this.getSettings();
  }

  handleTipValuesChanged(values) {
    this.setState({
      tipDefaultValues : values
    })
  }

  handleCurrencyChanged(value) {
    this.setState({
      selectedCurrency : value
    })
  }

  handleMinTipChanged(value) {
    let selectedMaxTipValue = this.state.selectedMaxTipValue
    if (value > selectedMaxTipValue) {
      selectedMaxTipValue = value;
    }

    this.setState({
      selectedMinTipValue : value,
      selectedMaxTipValue: selectedMaxTipValue
    }, () => {
      this.handleMaxTipChanged(selectedMaxTipValue);
    })
  }

  handleMaxTipChanged(value) {
    let selectedMinTipValue = this.state.selectedMinTipValue
    if (value < this.state.selectedMinTipValue) {
      selectedMinTipValue = value;
    }

    this.setState({
      selectedMaxTipValue : value,
      selectedMinTipValue: selectedMinTipValue
    })
  }

  renderDefaultTips() {
    return (
      <View>
        <Text style={{fontSize: 15}}>Default tip values: </Text>
        <View>
          <Text>From: {this.state.selectedMinTipValue}%</Text>
          <Slider value={this.state.selectedMinTipValue} minimumValue={1} maximumValue={20} step={1} onValueChange={ this.handleMinTipChanged.bind(this) } />
        </View>

        <View>
          <Text>To: {this.state.selectedMaxTipValue}%</Text>
          <Slider value={this.state.selectedMaxTipValue} minimumValue={1} maximumValue={20} step={1} onValueChange={ this.handleMaxTipChanged.bind(this) } />
        </View>

      </View>
    )
  }

  renderSelectCurrencies() {
    return (
      <View style={{marginTop: 20}}>
        <Text style={{fontSize: 15}}>Select currencies: </Text>
        <Picker
          selectedValue={this.state.selectedCurrency}
          onValueChange={this.handleCurrencyChanged.bind(this)}>
          <Picker.Item label="VND" value="dong" />
          <Picker.Item label="USD" value="usdollar" />
          <Picker.Item label="Euro" value="euro" />
        </Picker>
      </View>
    )
  }

  renderSelectScenes() {
    return (
      <View style={{marginTop: 20}}>
        <Text style={{fontSize: 15}}>Scene Transitions: </Text>
        <Picker
          selectedValue={this.state.sceneTransition}
          onValueChange={this.selectedSceneTransition.bind(this)}>
          <Picker.Item label="FloatFromRight" value="FloatFromRight" />
          <Picker.Item label="FloatFromLeft" value="FloatFromLeft" />
          <Picker.Item label="FloatFromBottom" value="FloatFromBottom" />
          <Picker.Item label="FloatFromBottomAndroid" value="FloatFromBottomAndroid" />
          <Picker.Item label="SwipeFromLeft" value="SwipeFromLeft" />
          <Picker.Item label="HorizontalSwipeJump" value="HorizontalSwipeJump" />
          <Picker.Item label="HorizontalSwipeJumpFromRight" value="HorizontalSwipeJumpFromRight" />
        </Picker>
      </View>
    )
  }

  render() {
    return(
      <ScrollView style={Utils.styles.container}>
        <View>        
          {this.renderDefaultTips()}
          {this.renderSelectCurrencies()}
          {this.renderSelectScenes()}
        </View>
      </ScrollView>
    )
  }
}

export default SettingPage
