import React from "react";
import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  BackHandler,
} from "react-native";
import { FAB } from "react-native-paper";
// import Contacts from "react-native-contacts";

import { primaryColor } from "../../AppStyles";

import AddContactForm from "./AddContactForm";
import ContactDetails from "./contactDetailsScreen";
import PermissionError from "../stateLessComponents/ContactPermissionError";
import ContactsList from "../stateLessComponents/ContactsList";

import ContactStore from "../utils/ContactsStore";

export default class ContactsPage extends React.Component {
  constructor(props) {
    super(props);
    const readPermission =
      this.props.permissions["android.permission.READ_CONTACTS"] == "granted"
        ? true
        : false;

    const writePermission =
      this.props.permissions["android.permission.WRITE_CONTACTS"] == "granted";
    this.state = {
      showAddContactsForm: false,
      permissions: { readPermission, writePermission },
      contactScreenOpen: false,
      currentContact: {},
    };
  }

  divide = () => {
    let contacts = this.state.contacts;
    contacts = contacts.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
    const data = contacts.reduce((obj, contact) => {
      const firstLetter = contact.name[0].toUpperCase();
      return {
        ...obj,
        [firstLetter]: [...(obj[firstLetter] || []), contact],
      };
    }, {});

    const sections = Object.keys(data)
      .sort()
      .map((letter) => ({ title: letter, data: data[letter] }));
    this.setState({ sections: [...sections] });
  };

  async componentDidMount() {
    this.setState({ contacts: ContactStore.getContacts() }, this.divide);
    BackHandler.addEventListener("hardwareBackPress", this.closeContactPage);
  }

  showAddContactsForm = () => {
    this.setState((prevState) => ({
      showAddContactsForm: true,
    }));
  };
  hideAddContactsForm = () => {
    this.setState((prevState) => ({
      showAddContactsForm: false,
    }));
  };

  handleAddContact = async (contact) => {
    this.hideAddContactsForm();
    const contacts = await ContactStore.addContact(contact);
    // console.log(contacts);
    this.setState({ contacts }, this.divide);
  };
  search = (query) => {
    this.setState({ contacts: ContactStore.searchContact(query) }, this.divide);
  };

  openContactPage = (contact) => {
    this.setState({ contactScreenOpen: true, currentContact: contact });
  };

  closeContactPage = () => {
    this.setState((prevState) => {
      if (prevState.contactScreenOpen) {
        return {
          contactScreenOpen: false,
          contacts: ContactStore.getContacts(),
        };
      }
    }, this.divide);
    return true;
  };

  render() {
    // console.log(this.state.contacts.length);
    return (
      <View>
        {this.state.contactScreenOpen ? (
          <ContactDetails {...this.state.currentContact} />
        ) : this.state.showAddContactsForm ? (
          <AddContactForm
            cancel={this.hideAddContactsForm}
            save={this.handleAddContact}
          />
        ) : (
          <View style={{ height: "100%", marginTop: 0 }}>
            {this.state.permissions.readPermission ? (
              <ContactsList
                sections={this.state.sections}
                search={this.search}
                onContactPress={this.openContactPage}
              />
            ) : (
              <PermissionError />
            )}
            <FAB
              style={[
                styles.fab,
                this.state.permissions.writePermission
                  ? styles.fabEnabled
                  : styles.fabDisabled,
              ]}
              disabled={!this.state.permissions.writePermission}
              icon="plus"
              onPress={this.showAddContactsForm}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    zIndex: 1,
    margin: 16,
    right: 5,
    bottom: 30,
  },
  fabEnabled: { backgroundColor: primaryColor },
  fabDisabled: {
    backgroundColor: "white",
    color: "black",
    borderColor: "#aaa",
    borderWidth: 1,
  },
});
