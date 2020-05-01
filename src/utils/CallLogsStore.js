import CallLogs from "react-native-call-log";

import ContactsStore from "./ContactsStore";

class CallLogsStore {
  constructor() {
    this.callLogs = [];
  }

  init() {
    return new Promise((resolve, reject) => {
      CallLogs.loadAll()
        .then((data) => {
          this.callLogs = data;
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  getCallLogs() {
    return this.callLogs;
  }
}

export default new CallLogsStore();
