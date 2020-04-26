import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";

export default class Contact extends React.Component {
  state = { expanded: false };
  render() {
    const [firstName, lastName] = this.props.name.split(" ");
    return (
      <View style={styles.contactCard}>
        <Avatar.Text
          size={40}
          style={styles.Avatar}
          label={`${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`}
        />
        <View>
          <Text style={styles.nameText}>{this.props.name}</Text>
          <Text style={styles.phoneText}>{this.props.phone}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contactCard: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  Avatar: {
    marginRight: 20,
    backgroundColor: "#1d6ccc",
  },
  nameText: {
    fontSize: 18,
  },
  phoneText: {
    fontSize: 12,
  },
});
