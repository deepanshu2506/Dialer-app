import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { primaryColor } from "../../AppStyles";
import Dialer from "./DialerComponent";

export default class DialerComponent extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView></ScrollView>
        <Dialer style={styles.dialer} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dialer: {
    position: "absolute",
    bottom: 0,
  },
});
