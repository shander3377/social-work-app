import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity, Image } from 'react-native';

import AppHeader from '../Components/AppHeader.js';

export default class WorkDetailsScreen extends Component{



  render(){
    return(
      <View style={{flex:1}}>
        <AppHeader title="WorkDetailsScreen" navigation ={this.props.navigation}/>
     <Text>Hello</Text>
      </View>
    )
  }
}
