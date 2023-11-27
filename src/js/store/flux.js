const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: []
		},
		actions: {
			getAgenda: async () => {
				const response = await fetch("https://playground.4geeks.com/apis/fake/contact/agenda/damianodionori");
				const jsonResponse = await response.json();

				setStore({ contacts: jsonResponse });
			},

			deleteContact: async (id) => {
				await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
					method: "DELETE",
				})
				await actions.getAgenda();
			},

			addContact: async (contactData) => {
				const store = getStore();

				const newContact = {
					"full_name": contactData.fullName,
					"email": contactData.email,
					"agenda_slug": contactData.agendaSlug,
					"address": contactData.address,
					"phone": contactData.phone,
				}

				await fetch("https://playground.4geeks.com/apis/fake/contact", {
					method: "POST",
					headers: { "Content-type": "application/json" },
					body: JSON.stringify({
						"full_name": contactData.fullName,
						"email": contactData.email,
						"agenda_slug": contactData.agendaSlug,
						"address": contactData.address,
						"phone": contactData.phone,
					})
				})

				setStore({ contacts: [...store.contacts, newContact] })
			}
		}
	};
};

export default getState;
