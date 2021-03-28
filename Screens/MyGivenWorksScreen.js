import React ,{Component} from 'react'
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet} from 'react-native';
import MyHeader from '../components/MyHeader.js'
import firebase from 'firebase';
import db from '../config.js'

export default class MyGivenWorksScreen extends Component {


  
   render(){
     return(
       <View style={{flex:1}}>
         <MyHeader navigation={this.props.navigation} title="MyGivenWorksScreen"/>
      
       </View>
     )
   }
   }


