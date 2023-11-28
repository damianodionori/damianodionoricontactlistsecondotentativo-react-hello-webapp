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
				const store = getStore();

				try {
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(updatedContactData),
					});

					if (!response.ok) {
						throw new Error(`Failed to update contact. Server returned ${response.status}`);
					}

					setStore({ contacts: store.contacts, errorMessage: null });
				} catch (error) {
					console.error('Error updating contact:', error);
					setStore({ errorMessage: 'Failed to update contact. Please try again.' });
				}
			},

			addContact: async (contactData) => {
			
				console.log('Current contacts:', store.contacts);
			
				const newContact = {
					"full_name": `${contactData.firstName} ${contactData.lastName}`,
					"email": contactData.email,
					"agenda_slug": "damianodionori",
					"address": contactData.address,
					"phone": contactData.phone,
				};
			
				try {
					const response = await fetch("https://playground.4geeks.com/apis/fake/contact", {
						method: "POST",
						headers: { "Content-type": "application/json" },
						body: JSON.stringify(newContact),
					});
			
					if (!response.ok) {
						throw new Error(`Failed to add contact. Server returned ${response.status}`);
					}
			
					// Log the updated state after adding the contact
					console.log('Updated contacts:', getStore().contacts);
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
