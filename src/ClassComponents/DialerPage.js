import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  LayoutAnimation,
  UIManager,
} from "react-native";
import { Portal, Dialog, Paragraph, Button, FAB } from "react-native-paper";
import Dialer from "./DialerComponent";
import ContactStore from "../utils/ContactsStore";
import Contact from "./Contact";
import { primaryColor } from "../../AppStyles";

export default class DialerComponent extends React.Component {
  state = {
    dialogVisible: false,
    dialogText: "",
    hideDialer: false,
  };
  componentDidMount() {
    if (Platform.OS === "android") {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
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
  pushDownDialer = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ hideDialer: true });
  };
  toggleDialer = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ hideDialer: false });
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
        <FAB
          style={[styles.fab, !this.state.hideDialer && styles.fabClose]}
          icon="chevron-up"
          onPress={this.toggleDialer}
        ></FAB>

        <Dialer
          // visible={!this.state.hideDialer}
          style={[
            styles.dialerOpen,
            this.state.hideDialer && styles.dialerClose,
          ]}
          permission={this.props.permissions}
          search={this.search}
          pushDownDialer={this.pushDownDialer}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dialerOpen: {
    position: "absolute",
    bottom: 0,
  },
  dialerClose: {
    bottom: "-60%",
  },
  fab: {
    position: "absolute",
    zIndex: 1,
    margin: 16,
    right: 5,
    bottom: 20,
    backgroundColor: primaryColor,
  },
  fabClose: {
    height: 0,
    width: 0,
  },
});
