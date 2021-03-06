import React from "react";
import { View, PermissionsAndroid, Platform } from "react-native";
import { Button, BottomNavigation, Text } from "react-native-paper";
import ContactsPage from "./src/ClassComponents/ContactsPage";
import DialerPage from "./src/ClassComponents/DialerPage";
import CallLogPage from "./src/ClassComponents/CallLogPage";

import ContactStore from "./src/utils/ContactsStore";
import CallLogStore from "./src/utils/CallLogsStore";

export default class App extends React.Component {
  ContactsRoute = () => <ContactsPage permissions={this.state.permissions} />;
  callLogRoute = () => <CallLogPage />;
  PhoneScreenRoute = () => {
    return (
      <DialerPage
        permissions={this.state.permissions["android.permission.CALL_PHONE"]}
      />
    );
  };

  state = {
    index: 0,
    routes: [
      {
        key: "callLog",
        title: "",
        icon: "history",
        badge: false,
      },
      {
        key: "dialPad",
        title: "",
        icon: "dialpad",
        badge: false,
      },
      {
        key: "contacts",
        title: "",
        icon: "account",
        badge: false,
      },
    ],
    permissions: {},
  };
  componentDidMount() {
    if (Platform.OS === "android") {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
      ])
        .then(async (result) => {
          this.setState({ permissions: result });
          if (result["android.permission.READ_CONTACTS"] == "granted") {
            ContactStore.init();
          }

          if (result["android.permission.READ_CALL_LOG"] == "granted") {
            await CallLogStore.init();
          }
          this.setState({ index: 1 });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  _handleIndexChange = (index) => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    callLog: this.callLogRoute,
    dialPad: this.PhoneScreenRoute,
    contacts: this.ContactsRoute,
  });

  render() {
    return (
      <BottomNavigation
        shifting
        labeled={false}
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
        barStyle={{
          backgroundColor: "#1d6ccc",
        }}
      />
    );
  }
}
