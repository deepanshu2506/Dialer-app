import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";

export default class AddContactForm extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    phone: "",
    errors: {
      firstName: false,
      lastName: false,
      phone: false,
    },
    keyBoardOpen: false,
    canSubmit: false,
  };
  componentDidMount() {
    if (Platform.OS === "android") {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
    this.keyBoardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyBoardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }
  componentWillUnmount() {
    this.keyBoardDidShowListener.remove();
    this.keyBoardDidHideListener.remove();
  }
  _keyboardDidShow = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ keyBoardOpen: true });
  };
  _keyboardDidHide = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ keyBoardOpen: false });
  };
  validateForm = () => {
    const firstName = this.state.firstName.length < 3;
    const lastName = this.state.lastName.length < 3;
    const phone = this.state.phone.length < 10;
    const canSubmit = !(firstName || lastName || phone);
    this.setState({
      errors: { firstName, lastName, phone },
      canSubmit,
    });
  };

  handleSubmit = () => {
    this.props.save({
      ...this.state,
    });
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="height" style={styles.form}>
        <View
          style={[
            styles.header,
            this.state.keyBoardOpen && styles.headerMinimized,
          ]}
        >
          <Text style={styles.headerText}>Add Contact</Text>
        </View>
        <KeyboardAvoidingView behavior="height">
          <TextInput
            style={styles.textInput}
            error={this.state.errors.firstName}
            label="First Name"
            mode="flat"
            value={this.state.firstName}
            onChangeText={(firstName) => {
              this.setState({ firstName }, this.validateForm);
            }}
          />
          <HelperText type="error" visible={this.state.errors.firstName}>
            Not a valid name
          </HelperText>
          <TextInput
            style={styles.textInput}
            error={this.state.errors.lastName}
            label="Last Name"
            mode="flat"
            value={this.state.lastName}
            onChangeText={(lastName) => {
              this.setState({ lastName }, this.validateForm);
            }}
          />
          <HelperText type="error" visible={this.state.errors.lastName}>
            Not a valid name
          </HelperText>
          <TextInput
            error={this.state.errors.phone}
            style={styles.textInput}
            label="Mobile Number"
            mode="flat"
            maxLength={10}
            keyboardType="numeric"
            value={this.state.phone}
            onChangeText={(phone) => {
              if (+phone && !phone.includes("."))
                this.setState({ phone }, this.validateForm);
            }}
          />
          <HelperText type="error" visible={this.state.errors.firstName}>
            Not a valid phone Number
          </HelperText>
        </KeyboardAvoidingView>
        <View style={styles.buttonPane}>
          <Button
            color="#1d6ccc"
            // labelStyle={{ color: "#1d6ccc" }}
            mode="outlined"
            contentStyle={[styles.button]}
            onPress={this.props.cancel}
          >
            Cancel
          </Button>
          {this.state.canSubmit ? (
            <Button
              //   disabled={!this.state.canSubmit}
              mode="contained"
              contentStyle={[styles.button, { backgroundColor: "#1d6ccc" }]}
              onPress={this.handleSubmit}
            >
              Save
            </Button>
          ) : (
            <Button
              disabled={true}
              color="#1d6ccc"
              // labelStyle={{ color: "#1d6ccc" }}
              mode="outlined"
              contentStyle={[styles.button]}
              onPress={this.props.cancel}
            >
              Save
            </Button>
          )}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 150,
    justifyContent: "flex-end",
    paddingBottom: 30,
    backgroundColor: "#1d6ccc",
    marginBottom: 20,
  },
  headerMinimized: {
    height: 60,
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 30,
    color: "#ffffff",
    paddingLeft: 30,
  },
  form: {},
  textInput: {
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: "transparent",
  },
  buttonPane: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "stretch",
    // backgroundColor: "red",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    // backgroundColor: "red",
  },
});
