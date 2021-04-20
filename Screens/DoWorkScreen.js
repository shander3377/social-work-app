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
import { Alert } from "react-native";

export default class DoWorkScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      requestedWorksList: [],
    };
    this.requestRef = null;
  }

  getRequestedWorksList = () => {
    this.requestRef = db
      .collection("requested_works")
      .onSnapshot((snapshot) => {
        var requestedWorksList = snapshot.docs.map((doc) => doc.data());
        this.setState({
          requestedWorksList: requestedWorksList,
        });
      });
  };

  componentDidMount() {
    this.getRequestedWorksList();
  }

  componentWillUnmount() {
  this.requestRef();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.work_name}
        subtitle={`${item.work_descreption} \nLocation: ${item.location} \nTime: ${item.time} \nContact: ${item.contact}`}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        leftElement={
          <Image
            style={{ height: 50, width: 50 }}
            source={{
              uri: item.image_link,
            }}
          />
        }
        rightElement={
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Alert.alert("Your request has been accepted please be at the place at correct time and contact the requester")
            }}
          >
            <Text style={{ color: "#ffff" }}>Accept</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    );
  };

  render() {
    return (
      <View style={styles.view}>
        <MyHeader title="Do Social Work" navigation={this.props.navigation} />
        <View style={{ flex: 1 }}>
          {this.state.requestedWorksList.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 }}>List Of All Requested Social Works</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.requestedWorksList}
              renderItem={this.renderItem}
            />
          )}
        </View>
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
