import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { ListItem } from "react-native-elements";
import firebase from "firebase";
import db from "../config";
import MyHeader from "../components/MyHeader";

export default class WorkDetailsScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      requestedWorksList: [],
    };
    this.requestRef = null;
  }

  componentDidMount = () =>{
      console.warn(this.props.navigation.getParam("details"))
  }

  render() {
    return (
      <View style={styles.view}>
        <MyHeader title="Do Social Work" navigation={this.props.navigation} />
    
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#32867d",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  view:{
    flex: 1,
    backgroundColor: "#fff"
  }
});
