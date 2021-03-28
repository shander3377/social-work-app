import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class AskForSocialWorkScreen extends Component{
  

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="AskForSocialWorkScreen" navigation ={this.props.navigation}/>
<Text></Text>
      </View>
    )
  }
}


