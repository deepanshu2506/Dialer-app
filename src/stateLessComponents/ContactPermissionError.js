import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Headline, Subheading } from "react-native-paper";
import settingsIcon from "../static/icons/settings.png";

const ContactPermissionError = (props) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image style={styles.image} source={settingsIcon} />
      <Headline
        style={{
          color: "#666",
          fontFamily: "sans-serif",
          fontSize: 30,
          marginTop: 20,
        }}
      >
        Permission denied
      </Headline>
      <Subheading>
        We Do not have permission {"\n"} to access your contacts.
      </Subheading>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 150,
  },
});

export default ContactPermissionError;
