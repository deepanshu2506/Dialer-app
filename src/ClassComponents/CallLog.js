import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  LayoutAnimation,
} from "react-native";
import { IconButton, Surface, Avatar } from "react-native-paper";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import { primaryColor } from "../../AppStyles";

export default class CallLog extends React.Component {
  state = {
    showOptions: false,
  };
  toggleOptions = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(200, "easeInEaseOut", "opacity")
    );
    this.setState((prevState) => ({
      showOptions: !prevState.showOptions,
    }));
  };
  getCallType = () => {
    let typeColor = "";
    let type = "";
    if (this.props.type == "OUTGOING") {
      typeColor = primaryColor;
      type = "call-made";
    } else if (this.props.type == "INCOMING") {
      typeColor = "green";
      type = "call-received";
    } else if (this.props.type == "MISSED") {
      typeColor = "red";
      type = "call-missed";
    }
    return { typeColor, type };
  };

  getCallTime = () => {
    let timeStamp = new Date(this.props.dateTime);
    let time = `${timeStamp
      .getHours()
      .toString()
      .padStart(2, "0")}:${timeStamp.getMinutes().toString().padStart(2, "0")}`;
    if (isToday(timeStamp)) {
      return `today , ${time}`;
    } else if (isYesterday(timeStamp)) {
      return `Yesterday , ${time}`;
    } else {
      return `${timeStamp.getDate().toString().padStart(2, "0")}/${(
        timeStamp.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}, ${time}`;
    }
  };

  makeCall = () => {
    RNImmediatePhoneCall.immediatePhoneCall(this.props.number);
    if (this.state.dialogVisible) {
      this._hideDialog();
    }
  };

  openMessenger = () => {
    Linking.openURL(`sms:${this.props.number}`);
  };
  render() {
    const { type, typeColor } = this.getCallType();

    return (
      <Surface style={styles.CallLogCard}>
        <View style={styles.contactCard}>
          {this.props.name ? (
            <Avatar.Text
              size={40}
              style={styles.Avatar}
              label={this.props.name[0].toUpperCase()}
            />
          ) : (
            <Avatar.Icon style={styles.Avatar} icon="account" size={40} />
          )}
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#aaa")}
            onPress={this.toggleOptions}
          >
            <View style={styles.touchable}>
              <Text style={styles.nameText}>
                {this.props.name || this.props.phoneNumber}
              </Text>
              {/* <Text style={styles.phoneText}>65656565656</Text> */}
              <Text style={[styles.TimeText]}>{this.getCallTime()}</Text>
            </View>
          </TouchableNativeFeedback>
          <MaterialCommunityIcons
            name={type}
            color={typeColor}
            size={30}
            style={[styles.callStatusIcon, {}]}
          />
        </View>
        {this.state.showOptions && (
          <View style={styles.optionsView}>
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
            {!this.props.name && (
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple("#aaa")}
                onPress={this.openMessenger}
              >
                <View style={styles.actionViews}>
                  <MaterialCommunityIcons
                    size={30}
                    name="account-plus"
                    color={primaryColor}
                  />
                  <Text>Message</Text>
                </View>
              </TouchableNativeFeedback>
            )}
          </View>
        )}
      </Surface>
    );
  }
}

const styles = StyleSheet.create({
  CallLogCard: {
    // borderWidth: 1,
    marginHorizontal: 10,
    elevation: 10,
    marginVertical: 7,
    borderRadius: 6,
  },
  contactCard: {
    padding: 15,
    paddingRight: 0,
    paddingVertical: 0,
    flexDirection: "row",
    alignItems: "center",
    // borderWidth: 1,
    height: 80,
    elevation: 4,
    marginHorizontal: 5,
    // borderWidth: 1,
  },
  Avatar: {
    marginRight: 0,
    backgroundColor: primaryColor,
  },
  nameText: {
    fontSize: 18,
  },
  phoneText: {
    paddingTop: 3,
    fontSize: 15,
  },
  touchable: {
    paddingLeft: 20,
    flexGrow: 1,
    height: 70,
    justifyContent: "center",
  },
  optionsView: {
    marginHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  actionViews: {
    // borderWidth: 1,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 5,
  },
  callStatusIcon: {
    // color: primaryColor,
    marginRight: 10,
  },
});

const isToday = (someDate) => {
  const today = new Date();
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
};

const isYesterday = (someDate) => {
  const today = new Date(new Date() - 86400000);
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
};
