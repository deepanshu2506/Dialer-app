import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  PermissionsAndroid,
} from "react-native";
import { FAB } from "react-native-paper";
// import Contacts from "react-native-contacts";
import * as Contacts from "expo-contacts";

// import contactsList from "../utils/Contacts";
import Contact from "./Contact";
import AddContactForm from "./AddContactForm";
import { primaryColor } from "../../AppStyles";

const SectionHeader = (props) => {
  const sectionHeaderStyles = StyleSheet.create({
    sectionHeaderText: {
      fontSize: 22,
      fontWeight: "bold",
      paddingLeft: 20,
      color: primaryColor,
    },
    sectionHeader: {
      borderBottomColor: "#aaa",
      borderBottomWidth: 1,
      marginBottom: 4,
      //   padding: 10,
    },
  });
  return (
    <View style={sectionHeaderStyles.sectionHeader}>
      <Text style={sectionHeaderStyles.sectionHeaderText}>{props.title}</Text>
    </View>
  );
};

export default class ContactsPage extends React.Component {
  state = {
    showAddContactsForm: false,
    contacts: [],
  };
  constructor(props) {
    super(props);
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
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync();
      const contactsList = data.map((contact) => ({
        id: contact.id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        namePrefix: contact.namePrefix,
        name: `${contact.firstName && contact.firstName} ${
          contact.lastName && contact.lastName
        }`,
        phoneNumbers: contact.phoneNumbers,
        company: contact.company,
        key: contact.id,
      }));
      console.log(Object.keys(data[0]));
      this.setState({ contacts: contactsList }, this.divide);
    }
  }

  renderItem = ({ item }) => <Contact {...item} />;

  renderSectionHeader = ({ section: { title } }) => (
    <SectionHeader title={title} />
  );

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

  handleAddContact = (contact) => {
    this.hideAddContactsForm();
    //   console.log(contact);
    this.setState((prevState) => {
      const contactObj = {
        name: `${contact.firstName} ${contact.lastName}`,
        phone: contact.phone,
        key: this.state.contacts.length,
      };
      return {
        contacts: [...prevState.contacts, contactObj],
      };
    }, this.divide);
  };

  render() {
    return (
      <View>
        {this.state.showAddContactsForm ? (
          <AddContactForm
            cancel={this.hideAddContactsForm}
            save={this.handleAddContact}
          />
        ) : (
          <View style={{ height: "100%", marginTop: 10 }}>
            <SectionList
              style={{
                paddingHorizontal: 10,
                marginBottom: 0,
              }}
              sections={this.state.sections}
              renderItem={this.renderItem}
              renderSectionHeader={this.renderSectionHeader}
            />
            <FAB
              style={styles.fab}
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
    backgroundColor: primaryColor,
  },
});
