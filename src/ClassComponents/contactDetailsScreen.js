import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableNativeFeedback,
  ScrollView,
  Linking,
} from "react-native";
import { Surface, Portal, Dialog } from "react-native-paper";
import { MaterialCommunityIcons, Feather } from "react-native-vector-icons";
import RNImmediatePhoneCall from "react-native-immediate-phone-call";

import { primaryColor } from "../../AppStyles";

export default class ContactDetails extends React.Component {
  state = {
    dialogVisible: false,
  };

  makeCall = (number) => {
    RNImmediatePhoneCall.immediatePhoneCall(number);
    if (this.state.dialogVisible) {
      this._hideDialog();
    }
  };

  decideCaller = () => {
    if (this.props.phoneNumbers.length == 1) {
      this.makeCall(this.props.phoneNumbers[0].number);
    } else {
      this.setState({ dialogVisible: true });
    }
  };

  _hideDialog = () => {
    this.setState({ dialogVisible: false });
  };

  openMessenger = () => {
    Linking.openURL(`sms:${this.props.phoneNumbers[0].number}`);
  };

  render() {
    console.log(this.props.phoneNumbers);
    return (
      <View style={styles.page}>
        <View style={styles.topContainer}>
          <Surface style={[styles.header]}>
            <Text style={[styles.headerText]}>{this.props.avatarText}</Text>
          </Surface>
          <Text style={[styles.contactName]}>{this.props.name}</Text>
          <View style={styles.actionsContainer}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple("#aaa")}
              onPress={this.decideCaller}
            >
              <View style={styles.actionViews}>
                <MaterialCommunityIcons
                  name="phone"
                  size={30}
                  color={primaryColor}
                />
                <Text>Call</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple("#aaa")}
              onPress={this.openMessenger}
            >
              <View style={styles.actionViews}>
                <MaterialCommunityIcons
                  size={30}
                  name="message-text-outline"
                  color={primaryColor}
                />
                <Text>Message</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <ScrollView onScroll={this.onPageScroll} style={{ flex: 1 }}>
          {this.props.phoneNumbers.map((number) => (
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple("#aaa")}
              onPress={() => {
                this.makeCall(number.number);
              }}
            >
              <View
                // key={number.id}
                style={{
                  paddingTop: 0,
                  height: 70,
                  // borderWidth: 1,
                  justifyContent: "center",
                  paddingLeft: 30,
                }}
              >
                <Text style={{ fontSize: 20 }}>{number.label}</Text>
                <Text style={{ color: "#444" }}>{number.number}</Text>
              </View>
            </TouchableNativeFeedback>
          ))}
        </ScrollView>

        <Portal>
          <Dialog
            dismissable={true}
            onDismiss={this._hideDialog}
            visible={this.state.dialogVisible}
            onDismiss={this._hideDialog}
          >
            <Dialog.Title>CHOOSE NUMBER</Dialog.Title>
            <Dialog.Content>
              <View>
                {this.props.phoneNumbers.map((number) => (
                  <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple("#aaa")}
                    onPress={() => {
                      this.makeCall(number.number);
                    }}
                  >
                    <View
                      // key={number.id}
                      style={{
                        paddingTop: 0,
                        height: 70,
                        // borderWidth: 1,
                        justifyContent: "center",
                        paddingLeft: 30,
                      }}
                    >
                      <Text style={{ fontSize: 20 }}>{number.label}</Text>
                      <Text style={{ color: "#444" }}>{number.number}</Text>
                    </View>
                  </TouchableNativeFeedback>
                ))}
              </View>
            </Dialog.Content>
          </Dialog>
        </Portal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  page: { height: "100%", backgroundColor: "white" },
  topContainer: {
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: "#f7f7f7",

    paddingHorizontal: 10,
    paddingBottom: 10,
    elevation: 2,
    // borderRadius: 10,
  },
  header: {
    height: 150,
    width: 150,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    // paddingBottom: 30,
    backgroundColor: primaryColor,
    marginBottom: 20,
    elevation: 10,
  },
  scrollheader: {
    height: 70,
    width: 70,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 50,
    color: "#ffffff",
    // paddingLeft: 30,
  },
  contactName: {
    width: "100%",
    textAlign: "center",
    fontSize: 25,
    borderBottomWidth: 1,
    paddingBottom: 20,
    borderBottomColor: "#aaa",
  },
  actionViews: {
    height: 70,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 40,
    marginTop: 10,
  },
  actionsContainer: {
    justifyContent: "center",
    flexDirection: "row",
    // borderBottomWidth: 1,
    width: "100%",
    // borderBottomColor: "#aaa",
  },
});
