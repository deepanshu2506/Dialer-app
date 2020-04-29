import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { Portal, Dialog, Paragraph, Button } from "react-native-paper";
import Dialer from "./DialerComponent";
import ContactStore from "../utils/ContactsStore";
import Contact from "./Contact";

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
  search = (phoneNumber) => {
    const contacts = ContactStore.searchContactByPhoneNumber(phoneNumber);
    contacts.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    this.setState({
      contacts: [...contacts],
    });
  };
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
        <FlatList
          data={this.state.contacts}
          renderItem={({ item }) => <Contact {...item} />}
        />

        <Dialer
          style={styles.dialer}
          permission={this.props.permissions}
          search={this.search}
        />
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
