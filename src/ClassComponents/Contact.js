import React from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";
import { Avatar } from "react-native-paper";

import { primaryColor } from "../../AppStyles";

export default class Contact extends React.Component {
  state = { expanded: false };

  componentDidMount() {
    const { firstName, lastName, namePrefix } = this.props;
    let avatarText = "",
      name = "";
    if (namePrefix) {
      name += namePrefix + " ";
    }

    if (firstName) {
      avatarText += firstName[0];
      name += firstName + " ";
    }
    if (lastName) {
      avatarText += lastName[0];
      name += lastName + " ";
    }
    this.setState({ avatarText, name });
  }
  render() {
    return (
      <View style={styles.contactCard}>
        <Avatar.Text
          size={40}
          style={styles.Avatar}
          label={this.state.avatarText}
        />
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple("#aaa")}
          onPress={() => {
            console.log(this.props);
          }}
        >
          <View style={styles.touchable}>
            <Text style={styles.nameText}>{this.state.name}</Text>
            {this.props.company ? (
              <Text style={styles.phoneText}>{this.props.company}</Text>
            ) : null}
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contactCard: {
    padding: 15,
    paddingRight: 0,
    paddingVertical: 0,
    flexDirection: "row",
    alignItems: "center",
    // borderWidth: 1,
    height: 70,
  },
  Avatar: {
    marginRight: 0,
    backgroundColor: primaryColor,
  },
  nameText: {
    fontSize: 18,
  },
  phoneText: {
    fontSize: 12,
  },
  touchable: {
    paddingLeft: 20,
    flexGrow: 1,
    height: 70,
    justifyContent: "center",
  },
});
