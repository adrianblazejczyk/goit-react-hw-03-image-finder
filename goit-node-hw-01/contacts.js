const fs = require("fs").promises;
const { Console } = require("console");
const { appendFile } = require("fs");
const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf-8");
    const contactsJson = JSON.parse(contactsData);
    console.table(contactsJson);
  } catch (error) {
    console.error(`Error reading or parsing JSON: ${error.message}`);
  }
}

async function getContactById(contactId) {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf-8");
    const contactsJson = JSON.parse(contactsData);

    const contactData = contactsJson.find(
      (contact) => contact.id === contactId
    );

    if (!contactData) {
      console.log(`Contact with ID ${contactId} not found.`);
      return;
    }

    console.table(contactData);
  } catch (error) {
    console.error(`Error reading or parsing JSON: ${error.message}`);
  }
}

async function removeContact(contactId) {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf-8");
    const contactsJson = JSON.parse(contactsData);

    const contactToRemove = contactsJson.find(
      (contact) => contact.id === contactId
    );

    if (!contactToRemove) {
      console.log(
        `Contact with ID ${contactId} not found. No changes were made.`
      );
      return;
    }

    const updatedContacts = contactsJson.filter(
      (contact) => contact.id !== contactId
    );

    await fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2),
      "utf-8"
    );

    console.log(
      `Contact information updated. Removed contact with id: ${contactId}`
    );
    console.table(updatedContacts);
  } catch (error) {
    console.error(`Error reading, parsing, or writing JSON: ${error.message}`);
  }
}

async function addContact(name, email, phone) {
  try {
    id = nanoid();
    const newContact = {
      id,
      name,
      email,
      phone,
    };
    const contactsData = await fs.readFile(contactsPath, "utf-8");
    const contactsJson = JSON.parse(contactsData);
    const updatedContacts = [...contactsJson, newContact];

    await fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2),
      "utf-8"
    );
    console.log("Add new contact:");
    console.table(updatedContacts);
  } catch (error) {
    console.error(`Error appending data to file: ${error.message}`);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
