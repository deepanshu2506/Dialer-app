import React from "react";
import {
  Text,
  View,
  TouchableNativeFeedback,
  StyleSheet,
  LayoutAnimation,
  NativeModules,
} from "react-native";
import { IconButton, FAB } from "react-native-paper";
import { primaryColor } from "../../AppStyles";
import RNImmediatePhoneCall from "react-native-immediate-phone-call";

export default class DialerComponent extends React.Component {
  state = {
    phone: "",
    // dualSim: true,
    displayNumber: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.phone != prevState.phone) {
      this.props.search(this.state.phone);
    }
  }

  _backspacePress = () => {
    this.setState((prevState) => {
      if (prevState.phone.length > 0) {
        return {
          phone: prevState.phone.slice(0, prevState.phone.length - 1),
        };
      }
    }, this.toggleInputField);
  };
  typeNumber = (digit) => {
    if (this.validatePhone()) {
      this.setState(
        (prevState) => ({ phone: prevState.phone + digit }),
        this.toggleInputField
      );
    }
  };

  toggleInputField = () => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (!this.state.displayNumber && this.state.phone.length > 0) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ displayNumber: true });
    }

    if (this.state.displayNumber && this.state.phone.length == 0) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ displayNumber: false });
    }
  };

  validatePhone = () => {
    if (this.state.phone.length > 11) {
      return false;
    }
    return true;
  };

  makeCall = () => {
    RNImmediatePhoneCall.immediatePhoneCall(this.state.phone);
  };

  render() {
    return (
      <View style={[styles.backgroundView, this.props.style]}>
        {this.state.displayNumber && (
          <View style={styles.numberDisplayView}>
            <Text style={styles.numberDisplayText}>{this.state.phone}</Text>
            <IconButton
              style={styles.backButton}
              icon="backspace"
              color={primaryColor}
              size={30}
              onPress={this._backspacePress}
            />
          </View>
        )}
        <View style={styles.numPad}>
          <NumPadRow start={1} end={3} onPress={this.typeNumber} />
          <NumPadRow start={4} end={6} onPress={this.typeNumber} />
          <NumPadRow start={7} end={9} onPress={this.typeNumber} />
          <NumPadRow
            chars={["*", 0, "#"]}
            start={10}
            special={true}
            onPress={this.typeNumber}
          />
        </View>
        <View style={{ justifyContent: "center", flexDirection: "row" }}>
          <FAB
            small
            color="white"
            label="CALL"
            style={[
              styles.callButtonStyle,
              this.state.dualSim && styles.leftCallButton,
            ]}
            icon="phone"
            onPress={this.makeCall}
          />

          {this.state.dualSim && (
            <FAB
              small
              color="white"
              label="SIM 2"
              style={[
                styles.callButtonStyle,
                this.state.dualSim && styles.rightCallButton,
              ]}
              icon="phone"
            />
          )}
          <IconButton
            style={{ position: "absolute", right: 0, alignSelf: "center" }}
            size={35}
            color={primaryColor}
            icon="chevron-down-circle-outline"
            onPress={() => {
              console.log("pressed");
              this.props.pushDownDialer();
            }}
          />
        </View>
      </View>
    );
  }
}

const letters = [
  " \uAA6C ",
  "abc",
  "def",
  " ghi",
  " jkl",
  "mno",
  "pqrs",
  "tuv",
  "wxyz",
  ",",
  "+",
];

const NumPadRow = (props) => {
  const { start, end, chars } = props;
  let array;
  if (!chars) {
    array = [...Array(1 + end - start).keys()].map((v, index) => start - 1 + v);
  } else {
    array = chars;
  }

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        {array.map((i, index) => (
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#999")}
            onPress={() => {
              props.onPress(chars ? i : new String(index + start));
            }}
          >
            <View style={styles.numArea}>
              <Text style={styles.numpadNumber}>
                {chars ? i : index + start}
              </Text>
              <Text style={styles.numpadLetters}>
                {chars ? letters[index + start - 1] : letters[i]}
              </Text>
            </View>
          </TouchableNativeFeedback>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundView: {
    backgroundColor: "white",
    // height: "60%",
    width: "100%",

    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.9,
    shadowRadius: 25.0,
    elevation: 30,
  },
  numberDisplayText: {
    width: "85%",
    borderColor: "black",
    paddingLeft: 50,
    // borderWidth: 1,
    textAlign: "center",
    paddingVertical: 10,
    fontSize: 30,
    letterSpacing: 5,
    fontWeight: "bold",
    color: "#555",
  },
  numberDisplayView: { flexDirection: "row" },
  backButton: {
    position: "relative",
    right: 0,
    alignSelf: "center",
    // elevation: 5,
  },
  numPad: {
    // flexGrow: 1,
    flexDirection: "column",
    paddingBottom: 10,
  },
  numArea: {
    height: 60,
    flexGrow: 1,
  },
  numpadNumber: {
    fontSize: 26,
    fontWeight: "900",

    textAlign: "center",
  },
  numpadLetters: { fontSize: 16, textAlign: "center", marginTop: -5 },
  callButtonStyle: {
    alignItems: "center",
    backgroundColor: primaryColor,
    position: "relative",
    padding: 0,
    marginVertical: 5,
  },
  leftCallButton: {
    borderTopRightRadius: 0,
    borderBottomEndRadius: 0,
  },
  rightCallButton: {
    borderLeftColor: "#0000",
    borderLeftWidth: 1,
    borderRadius: 50,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
});
