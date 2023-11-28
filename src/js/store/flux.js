const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [],
			errorMessage: null,
		},
		actions: {
			getAgenda: async () => {
				try {
					const response = await fetch("https://playground.4geeks.com/apis/fake/contact/agenda/damianodionori");
					if (!response.ok) {
						throw new Error(`Failed to fetch contacts. Server returned ${response.status}`);
					}
					const jsonResponse = await response.json();
					setStore({ contacts: jsonResponse, errorMessage: null });
				} catch (error) {
					console.error("Error fetching contacts:", error);
					setStore({ errorMessage: 'Failed to fetch contacts. Please try again.' });
				}
			},

			deleteContact: async (id) => {
				const actions = getActions();
				try {
					await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
						method: "DELETE",
					});
					await actions.getAgenda();
				} catch (error) {
					console.error("Error deleting contact:", error);
					setStore({ errorMessage: 'Failed to delete contact. Please try again.' });
				}
			},

			editContact: async (id, updatedContactData) => {
				const { getStore, setStore } = getActions();
				const store = getStore();

				// Find the index of the contact to be updated
				const contactIndex = store.contacts.findIndex((contact) => contact.id === id);

				if (contactIndex !== -1) {
					// Create a copy of the contacts array
					const updatedContacts = [...store.contacts];

					// Update the contact with the new data
					updatedContacts[contactIndex] = {
						...updatedContacts[contactIndex],
						...updatedContactData,
					};

					// Update the store with the modified contacts array
					setStore({ contacts: updatedContacts, errorMessage: null });
				} else {
					console.error(`Contact with id ${id} not found.`);
					setStore({ errorMessage: 'Contact not found. Unable to edit.' });
				}
			},

			addContact: async (contactData) => {
				const { getStore, setStore } = getActions();
				const store = getStore();

				const newContact = {
					"full_name": `${contactData.firstName} ${contactData.lastName}`,
					"email": contactData.email,
					"agenda_slug": "damianodionori",
					"address": contactData.address,
					"phone": contactData.phone,
				};

				setStore({ contacts: [...store.contacts, newContact], errorMessage: null });

				try {
					const response = await fetch("https://playground.4geeks.com/apis/fake/contact", {
						method: "POST",
						headers: { "Content-type": "application/json" },
						body: JSON.stringify({
							"full_name": newContact.full_name,
							"email": newContact.email,
							"agenda_slug": newContact.agenda_slug,
							"address": newContact.address,
							"phone": newContact.phone,
						}),
					});

					if (!response.ok) {
						throw new Error(`Failed to add contact. Server returned ${response.status}`);
					}
				} catch (error) {
					console.error("Error adding contact:", error);
					setStore({ errorMessage: 'Failed to add contact. Please try again.' });

					// Rollback the store in case of an error
					setStore({ contacts: store.contacts, errorMessage: 'Failed to add contact. Please try again.' });
				}
			},
		}
	};
};

export default getState;
