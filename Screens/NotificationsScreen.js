import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";

import firebase from "firebase";
import MyHeader from "../components/MyHeader";

import db from "../config";

export default class NotificationsScreen extends Component {
 

  render() {
    return (
      <View style={styles.container}>
     
          <MyHeader
            title={"NotificationsScreen"}
            navigation={this.props.navigation}
          />
     
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});