class Contact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.address = address;
      this.city = city;
      this.state = state;
      this.zip = zip;
      this.phone = phone;
      this.email = email;
    }
  
    toString() {
      return `${this.firstName} ${this.lastName} - ${this.address}, ${this.city}, ${this.state} ${this.zip} - ${this.phone}, ${this.email}`;
    }
  }
  
  class AddressBook {
    constructor() {
      this.contacts = [];
    }
  
    addContact(contact) {
      this.validateContact(contact);
      if (this.isDuplicate(contact)) {
        throw new Error("Duplicate entry: This person already exists in the address book.");
      }
      this.contacts.push(contact);
    }
  
    validateContact(contact) {
      if (
        !/^[A-Z][a-z]{2,}$/.test(contact.firstName) ||
        !/^[A-Z][a-z]{2,}$/.test(contact.lastName) ||
        contact.address.length < 4 ||
        contact.city.length < 4 ||
        contact.state.length < 4 ||
        !/^\d{5}$/.test(contact.zip) ||
        !/^\d{10}$/.test(contact.phone) ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)
      ) {
        throw new Error("Invalid contact details. Please check the input and try again.");
      }
    }
  
    isDuplicate(newContact) {
      return this.contacts.some(
        (contact) => contact.firstName === newContact.firstName && contact.lastName === newContact.lastName
      );
    }
  
    findContactByName(firstName, lastName) {
      return this.contacts.find(
        (contact) => contact.firstName === firstName && contact.lastName === lastName
      );
    }
  
    editContact(firstName, lastName, updatedContact) {
      const contactToEdit = this.findContactByName(firstName, lastName);
      if (!contactToEdit) {
        throw new Error("Contact not found. Unable to edit.");
      }
  
      this.validateContact(updatedContact);

      if (
        contactToEdit.firstName !== updatedContact.firstName ||
        contactToEdit.lastName !== updatedContact.lastName
      ) {
        if (this.isDuplicate(updatedContact)) {
          throw new Error("Duplicate entry: This person already exists in the address book.");
        }
      }

      Object.assign(contactToEdit, updatedContact);
    }
  
    deleteContactByName(firstName, lastName) {
      const indexToDelete = this.contacts.findIndex(
        (contact) => contact.firstName === firstName && contact.lastName === lastName
      );
  
      if (indexToDelete === -1) {
        throw new Error("Contact not found. Unable to delete.");
      }
      this.contacts.splice(indexToDelete, 1);
    }
  
    getContactCount() {
      return this.contacts.length;
    }
  
    getContactsByCityOrState(cityOrState) {
      return this.contacts.filter((contact) => contact.city === cityOrState || contact.state === cityOrState);
    }
  
    viewContactsByCityOrState(cityOrState) {
      const filteredContacts = this.getContactsByCityOrState(cityOrState);
      filteredContacts.forEach((contact) => console.log(contact.toString()));
    }
  
    getContactCountByCityOrState(cityOrState) {
      return this.getContactsByCityOrState(cityOrState).length;
    }
  
    sortContactsAlphabetically() {
      this.contacts.sort((a, b) =>
        a.firstName.localeCompare(b.firstName) || a.lastName.localeCompare(b.lastName)
      );
    }
  
    sortContactsBy(criteria) {
      if (criteria === "city") {
        this.contacts.sort((a, b) => a.city.localeCompare(b.city));
      } else if (criteria === "state") {
        this.contacts.sort((a, b) => a.state.localeCompare(b.state));
      } else if (criteria === "zip") {
        this.contacts.sort((a, b) => a.zip.localeCompare(b.zip));
      }
    }
}
  
  // Create an instance of AddressBook
  const addressBook = new AddressBook();

  const contact1 = new Contact("Savita", "Tekale", "Pune", "City1", "State1", "12345", "1234567890", "savita@example.com");
  const contact2 = new Contact("Yogesh", "Gunde", "Mumbai", "City2", "State2", "54321", "9876543210", "yogesh@example.com");
  
  addressBook.addContact(contact1);
  addressBook.addContact(contact2);

  const updatedContact1 = new Contact("Savita", "Tekale", "Nashik", "City3", "State3", "67890", "9876543210", "savitaS@example.com");
  addressBook.editContact("Savita", "Tekale", updatedContact1);
  
  addressBook.viewContactsByCityOrState("City1");
  const stateContactCount = addressBook.getContactCountByCityOrState("State1");
  console.log(`Number of contacts in State1: ${stateContactCount}`);

  addressBook.sortContactsAlphabetically();

  addressBook.sortContactsBy("city");
  
  addressBook.deleteContactByName("Yogesh", "Gunde");
  
  const totalContactCount = addressBook.getContactCount();
  console.log(`Total number of contacts: ${totalContactCount}`);
  
  //-------output------//

 // Number of contacts in State1: 0
 // Total number of contacts: 1