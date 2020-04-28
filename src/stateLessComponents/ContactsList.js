import React from "react";

import { SectionList, View, StyleSheet, Text } from "react-native";
import { Searchbar } from "react-native-paper";

import Contact from "../ClassComponents/Contact";
import { primaryColor } from "../../AppStyles";

const renderItem = ({ item }) => <Contact {...item} />;

const renderSectionHeader = ({ section: { title } }) => (
  <SectionHeader title={title} />
);

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

const contactsList = (props) => {
  return (
    <View>
      <Searchbar
        style={{ margin: 10, marginTop: 20 }}
        onChangeText={(query) => {
          //   console.log(query);
          props.search(query);
        }}
        placeholder="search Contacts"
      />
      <SectionList
        style={{
          paddingHorizontal: 10,
          marginBottom: 0,
        }}
        sections={props.sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
    </View>
  );
};
export default contactsList;
