import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView
} from "react-native";


import db from "../config";
import firebase from "firebase";

export default class WelcomeScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
      <TouchableOpacity onPress={()=> this.props.navigation.navigate("DoWorkScreen")}><Text>mhm</Text></TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8BE85",
    alignItems: "center",
    justifyContent: "center"
  },
});
