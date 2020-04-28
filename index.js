import React from "react";
import { registerRootComponent } from "expo";
import { Provider } from "react-native-paper";

import App from "./App";

root = (props) => (
  <Provider>
    <App />
  </Provider>
);
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(root);
