const getState = ({ getStore, getActions, setStore }) => {


	return {

		store: {
			contacts: []
		},


		actions: {

			getAgenda: async () => {
				const response = await fetch("https://playground.4geeks.com/apis/fake/contact/agenda/damianodionori");
				const jsonContact = await response.json();
				setStore({ contacts: jsonContact });
			},
			addContact: async (contacts) => {
				const newContact = {
				  full_name: contacts.full_name,
				  email: contacts.email,
				  agenda_slug: "damianodionori",
				  address: contacts.address,
				  phone: contacts.phone,
				};
			  
				const store = getStore();
				try {
				  const response = await fetch("https://playground.4geeks.com/apis/fake/contact", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(newContact),
				  });
			  
				  if (!response.ok) {
					console.error("Failed to add contact", response.statusText);
					return;
				  }
			  
				  const actions = getActions();
				  actions.getAgenda();
				  setStore({ contacts: [...store.contacts, newContact] });
				} catch (error) {
				  console.error("Error during fetch:", error);
				}
			  },
			  
		},

		//deleteContact:
	};
};


export default getState;