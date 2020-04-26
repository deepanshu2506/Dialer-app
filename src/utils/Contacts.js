import names from "./nameList";

const LIST_SIZE = 100;

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getFirstName = () => names[getRndInteger(0, names.length)].firstName;

const getLastName = () => names[getRndInteger(0, names.length)].lastName;

const generateName = () => `${getFirstName()} ${getLastName()}`;

const generatePhoneNumber = () => {
  return `${getRndInteger(100, 999)}-${getRndInteger(100, 999)}-${getRndInteger(
    1000,
    9999
  )}`;
};
const createContact = () => {
  return { name: generateName(), phone: generatePhoneNumber() };
};

export default Array.from(
  { length: LIST_SIZE },
  createContact
).map((contact, key) => ({ ...contact, key }));
