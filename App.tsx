import React from "react";
import { View } from "react-native";
import { Button, BottomNavigation, Text } from "react-native-paper";
import ContactsPage from "./src/ClassComponents/ContactsPage";
import Contact from "./src/ClassComponents/Contact";

const ContactsRoute = () => <ContactsPage />;
const callLogRoute = () => <Text>Call Logs page</Text>;
const PhoneScreenRoute = () => <Text>Phone Screen Route</Text>;

export default class App extends React.Component {
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
  };

  _handleIndexChange = (index) => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    callLog: callLogRoute,
    dialPad: PhoneScreenRoute,
    contacts: ContactsRoute,
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
