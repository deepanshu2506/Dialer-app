import * as Contacts from "expo-contacts";

class ContactsStore {
  constructor() {
    this.contacts = [];
  }

  async init() {
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
    contactsList.map(
      (contact) =>
        contact.firstName == "ABB" && console.log(contact.phoneNumbers)
    );
    this.contacts = [...contactsList];
  }

  getContacts() {
    return this.contacts;
  }

  async addContact(contact) {
    const contactObjSave = {
      [Contacts.Fields.FirstName]: contact.firstName,
      [Contacts.Fields.LastName]: contact.lastName,
      phoneNumbers: [{ label: "mobile", number: contact.phone }],
    };
    const contactId = await Contacts.addContactAsync(contactObjSave);
    const contactObj = {
      key: contactId,
      id: contactId,
      firstName: contact.firstName,
      lastName: contact.lastName,
      name: `${contact.firstName} ${contact.lastName}`,
      phoneNumbers: contact.phone,
    };

    this.contacts = [...this.contacts, contactObj];
    return this.contacts;
  }

  searchContact(queryString) {
    if (queryString.trim() == "") {
      return this.contacts;
    }
    queryString = queryString.toLowerCase();
    return this.contacts.filter((contact) => {
      if (
        contact.firstName &&
        contact.firstName.toLowerCase().startsWith(queryString)
      ) {
        return true;
      }

      if (
        contact.lastName &&
        contact.lastName.toLowerCase().startsWith(queryString)
      ) {
        return true;
      }

      if (
        contact.company &&
        contact.company.toLowerCase().startsWith(queryString)
      ) {
        return true;
      }

      if (
        contact.namePrefix &&
        contact.namePrefix.toLowerCase().startsWith(queryString)
      ) {
        return true;
      }
    });
  }
}

export default new ContactsStore();
