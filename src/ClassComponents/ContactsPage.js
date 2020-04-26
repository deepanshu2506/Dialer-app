import React from "react";
import { StyleSheet, Text, View, SectionList } from "react-native";
import { FAB } from "react-native-paper";

import contactsList from "../utils/Contacts";
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
    contacts: contactsList,
  };
  constructor(props) {
    super(props);
    contactsList.sort((a, b) => a.name > b.name);
    const data = contactsList.reduce((obj, contact) => {
      const firstLetter = contact.name[0].toUpperCase();
      return {
        ...obj,
        [firstLetter]: [...(obj[firstLetter] || []), contact],
      };
    }, {});

    this.sections = Object.keys(data)
      .sort()
      .map((letter) => ({ title: letter, data: data[letter] }));
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
    const firstLetter = contact.firstName[0].toUpperCase();
    const contactObj = {
      name: `${contact.firstName} ${contact.lastName}`,
      phone: contact.phone,
      key: contactsList.length,
    };
    const sectionIndex = this.sections.findIndex(
      (section) => section.title == firstLetter
    );
    if (sectionIndex > -1) {
      this.sections[sectionIndex].data = [
        ...this.sections[sectionIndex].data,
        contactObj,
      ];
      this.sections[sectionIndex].data.sort((a, b) => {
        console.log(`${a.name} ${b.name} ${a.name > b.name}`);
        return a.name > b.name;
      });
      this.sections[sectionIndex].data.map((data) => console.log(data));
    } else {
      this.sections = [
        ...this.sections,
        { title: firstLetter, data: [contactObj] },
      ];
      this.sections.sort((a, b) => a.title > b.title);
    }
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
              sections={this.sections}
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
