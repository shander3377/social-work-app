import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TouchableHighlight,
  Alert,
  Image,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";
import { SearchBar, ListItem, Input } from "react-native-elements";

import MyHeader from "../components/MyHeader";


export default class AskForSocialWorkScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      workName: "",
      descreption: "",
      IsWorkRequestActive: "",
      requestedWorkName: "",
      workStatus: "",
      requestId: "",
      userDocId: "",
      docId: "",
      dataSource: "",
      requestedImageLink: "",
      showFlatlist: false,
    };
  }

  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addRequest = async (workName, descreption) => {
    var userId = this.state.userId;
    var randomRequestId = this.createUniqueId();



    db.collection("requested_works").add({
      user_id: userId,
      work_name: workName,
      reason_to_request: descreption,
      request_id: randomRequestId,
      work_status: "requested",
      date: firebase.firestore.FieldValue.serverTimestamp(),
    });

    await this.getworkRequest();
    db.collection("users")
      .where("email_id", "==", userId)
      .get()
      .then()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          db.collection("users").doc(doc.id).update({
            IsWorkRequestActive: true,
          });
        });
      });

    this.setState({
      workName: "",
      descreption: "",
      requestId: randomRequestId,
    });

    return Alert.alert("work Requested Successfully");
  };

  receivedworks = (workName) => {
    var userId = this.state.userId;
    var requestId = this.state.requestId;
    db.collection("received_works").add({
      user_id: userId,
      work_name: workName,
      request_id: requestId,
      workStatus: "received",
    });
  };

  getIsworkRequestActive() {
    db.collection("users")
      .where("email_id", "==", this.state.userId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            IsworkRequestActive: doc.data().IsworkRequestActive,
            userDocId: doc.id,
          });
        });
      });
  }

  getworkRequest = () => {
    // getting the requested work
    var workRequest = db
      .collection("requested_works")
      .where("user_id", "==", this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().work_status !== "received") {
            this.setState({
              requestId: doc.data().request_id,
              requestedworkName: doc.data().work_name,
              workStatus: doc.data().work_status,
              requestedImageLink: doc.data().image_link,
              docId: doc.id,
            });
          }
        });
      });
  };

  sendNotification = () => {
    //to get the first name and last name
    db.collection("users")
      .where("email_id", "==", this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var name = doc.data().first_name;
          var lastName = doc.data().last_name;

          // to get the donor id and work nam
          db.collection("all_notifications")
            .where("request_id", "==", this.state.requestId)
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                var donorId = doc.data().donor_id;
                var workName = doc.data().work_name;

                //targert user id is the donor id to send notification to the user
                db.collection("all_notifications").add({
                  targeted_user_id: donorId,
                  message:
                    name + " " + lastName + " received the work " + workName,
                  notification_status: "unread",
                  work_name: workName,
                });
              });
            });
        });
      });
  };

  componentDidMount() {
    this.getworkRequest();
    this.getIsworkRequestActive();
  }

  updateworkRequestStatus = () => {
    //updating the work status after receiving the work
    db.collection("requested_works").doc(this.state.docId).update({
      work_status: "received",
    });

    //getting the  doc id to update the users doc
    db.collection("users")
      .where("email_id", "==", this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          //updating the doc
          db.collection("users").doc(doc.id).update({
            IsworkRequestActive: false,
          });
        });
      });
  };



  //render Items  functionto render the works from api
  renderItem = ({ item, i }) => {


    let obj = {
      title: item.volumeInfo.title,
      selfLink: item.selfLink,
      buyLink: item.saleInfo.buyLink,
      imageLink: item.volumeInfo.imageLinks,
    };

    return (
      <TouchableHighlight
        style={styles.touchableopacity}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => {
          this.setState({
            showFlatlist: false,
            workName: item.volumeInfo.title,
          });
        }}
        bottomDivider
      >
        <Text> {item.volumeInfo.title} </Text>
      </TouchableHighlight>
    );
  };
  getworksFromApi = (text) =>{
    this.setState({workName: text})
  }
  render() {
    if (this.state.IsworkRequestActive === true) {
      return (
        <View style={{ flex: 1}}>
          <View
            style={{
              flex: 0.1,
            }}
          >
            <MyHeader title="work Status" navigation={this.props.navigation} />
          </View>
          <View
            style={styles.ImageView}
          >
            <Image
              source={{ uri: this.state.requestedImageLink }}
              style={styles.imageStyle}
            />
          </View>
          <View
            style={styles.workstatus}
          >
            <Text
              style={{
                fontSize: RFValue(20),

              }}
            >
              Name of the work
            </Text>
            <Text
              style={styles.requestedworkName}
            >
              {this.state.requestedworkName}
            </Text>
            <Text
              style={styles.status}
            >
              Status
            </Text>
            <Text
              style={styles.workStatus}
            >
              {this.state.workStatus}
            </Text>
          </View>
          <View
            style={styles.buttonView}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.sendNotification();
                this.updateworkRequestStatus();
                this.receivedworks(this.state.requestedworkName);
              }}
            >
              <Text
                style={styles.buttontxt}
              >
                work Recived
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
   
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.1 }}>
          <MyHeader title="Request work" navigation={this.props.navigation} />
        </View>
        <View style={{ flex: 0.9 }}>
          <Input
            style={styles.formTextInput}
            label={"work Name"}
            placeholder={"work name"}
            containerStyle={{ marginTop: RFValue(60) }}
            onChangeText={(text) => this.getworksFromApi(text)}
            onClear={(text) => this.getworksFromApi("")}
            value={this.state.workName}
          />
          {this.state.showFlatlist ? (
            <FlatList
              data={this.state.dataSource}
              renderItem={this.renderItem}
              enableEmptySections={true}
              style={{ marginTop: RFValue(10) }}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <View style={{ alignItems: "center" }}>
              <Input
                style={styles.formTextInput}
                containerStyle={{ marginTop: RFValue(30) }}
                multiline
                numberOfLines={8}
                label={"Reason"}
                placeholder={"Why do you need the work"}
                onChangeText={(text) => {
                  this.setState({
                    descreption: text,
                  });
                }}
                value={this.state.descreption}
              />
              <TouchableOpacity
                style={[styles.button, { marginTop: RFValue(30) }]}
                onPress={() => {
                  this.addRequest(
                    this.state.workName,
                    this.state.descreption
                  );
                }}
              >
                <Text
                  style={styles.requestbuttontxt}
                >
                  Request
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  keyBoardStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formTextInput: {
    width: "75%",
    height: RFValue(35),
    borderWidth: 1,
    padding: 10,
  },
  ImageView:{
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    marginTop:20
  },
  imageStyle:{
    height: RFValue(150),
    width: RFValue(150),
    alignSelf: "center",
    borderWidth: 5,
    borderRadius: RFValue(10),
  },
  workstatus:{
    flex: 0.4,
    alignItems: "center",

  },
  requestedworkName:{
    fontSize: RFValue(30),
    fontWeight: "500",
    padding: RFValue(10),
    fontWeight: "bold",
    alignItems:'center',
    marginLeft:RFValue(60)
  },
  status:{
    fontSize: RFValue(20),
    marginTop: RFValue(30),
  },
  workStatus:{
    fontSize: RFValue(30),
    fontWeight: "bold",
    marginTop: RFValue(10),
  },
  buttonView:{
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  buttontxt:{
    fontSize: RFValue(18),
    fontWeight: "bold",
    color: "#fff",
  },
  touchableopacity:{
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: "90%",
  },
  requestbuttontxt:{
    fontSize: RFValue(20),
    fontWeight: "bold",
    color: "#fff",
  },
  button: {
    width: "75%",
    height: RFValue(60),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(50),
    backgroundColor: "#32867d",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
});
