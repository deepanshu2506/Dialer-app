import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  LayoutAnimation,
  UIManager,
} from "react-native";

import CallLogStore from "../utils/CallLogsStore";
import CallLog from "./CallLog";

export default class CallLogPage extends React.Component {
  state = {
    callLogs: [],
  };

  componentDidMount() {
    console.log("page");
    this.setState({ callLogs: CallLogStore.getCallLogs() });
    if (Platform.OS === "android") {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }

  renderCallLog = ({ item }) => (
    <CallLog {...item} onAddContact={this.showAddContactForm} />
  );
  render() {
    return !this.state.showAddContactForm ? (
      <View>
        <FlatList
          style={styles.List}
          data={this.state.callLogs}
          renderItem={this.renderCallLog}
          keyExtractor={(item) => item.timestamp}
        />
      </View>
    ) : (
      <View></View>
    );
  }
}

const styles = StyleSheet.create({
  List: { marginTop: 20 },
});
