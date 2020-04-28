import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Portal, Dialog, Paragraph, Button } from "react-native-paper";
import { primaryColor } from "../../AppStyles";
import Dialer from "./DialerComponent";

export default class DialerComponent extends React.Component {
  state = {
    dialogVisible: false,
    dialogText: "",
  };
  componentDidMount() {
    if (this.props.permissions !== "granted") {
      this.setState({
        dialogVisible: true,
        dialogText: "You may not be able to place calls",
      });
    }
  }
  _hideDialog = () => this.setState({ dialogVisible: false });
  render() {
    console.log(this.props);
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Portal>
          <Dialog
            visible={this.state.dialogVisible}
            onDismiss={this._hideDialog}
          >
            <Dialog.Title>PERMISSION NOT GRANTED</Dialog.Title>
            <Dialog.Content>
              <Paragraph>{this.state.dialogText}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this._hideDialog}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <ScrollView></ScrollView>
        <Dialer style={styles.dialer} permission={this.props.permissions} />
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
