import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class DoWorkScreen extends Component{


 


  render(){
    return(
        <View style={{flex:1}}>
          <MyHeader title="DoWorkScreen" navigation ={this.props.navigation}/>
        
        </View>
    )
  }
}

