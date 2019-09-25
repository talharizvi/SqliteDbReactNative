/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import Home from './app/Home';
import {creatAppContainer, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AddUser from './app/AddUser';

const RootStack=createStackNavigator({
  
    Home:{
      screen:Home,
    },
    AddUser:{
      screen:AddUser
    } 
})

const AppContainer=createAppContainer(RootStack)

export default class App extends React.Component {
  render(){
    return (
    <AppContainer/>
     );
  }
};


