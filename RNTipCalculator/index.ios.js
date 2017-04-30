/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  Navigator,
  Button,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

import CalculatorPage from './app/calculator-page'
import SettingPage from './app/setting-page'
import Utils from './app/utils'

export default class RNTipCalculator extends Component {

  constructor(props) {
    super(props);

    this.state = { sceneTransition: "FloatFromRight" }

    this.customNavbar = (
      <Navigator.NavigationBar 
        routeMapper={{ 
          LeftButton: (route, navigator, index, navState) => { 
            return ( 
              <TouchableHighlight onPress={() => navigator.pop()}><Text>{route.labelLeft}</Text></TouchableHighlight> 
            ); 
          }, 
          RightButton: (route, navigator, index, navState) => {
            return ( 
              <TouchableHighlight onPress={() => route.performRightAction()}><Text>{route.labelRight}</Text></TouchableHighlight> 
            ); 
          }, 
          Title: (route, navigator, index, navState) => { return (<Text>{route.title}</Text>); }, }} 
      />
    )
  }
  
  getSettings() {
    AsyncStorage.getItem("SAVED_SETTINGS", (error, value) => {
      let setting = JSON.parse(value);
      if (setting && setting["sceneTransition"]) {
        this.setState({sceneTransition: setting.sceneTransition});
      }
      
    });
  }

  componentDidMount() { 
  }

  configureScene(route) {
    return Navigator.SceneConfigs[this.state.sceneTransition];
  }

  render() {

    return (
      <Navigator
        initialRoute={Utils.routes.CalculatorPage}
        onDidFocus={this.getSettings.bind(this)}
        configureScene={this.configureScene.bind(this)}
        renderScene={(route, navigator) => {
          switch (route.id) {
            case Utils.routes.CalculatorPage.id:
              return <CalculatorPage navigator={navigator}  route={route} />
              break;
            case Utils.routes.SettingPage.id:
              return <SettingPage navigator={navigator}  route={route} />
              break;
            default:
          }
        }}
        navigationBar={this.customNavbar}
      />
    )

  }
}


AppRegistry.registerComponent('RNTipCalculator', () => RNTipCalculator);
