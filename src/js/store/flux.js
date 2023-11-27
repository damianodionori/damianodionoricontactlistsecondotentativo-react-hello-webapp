const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: []
		},
		actions: {
			getAgenda: async () => {
				const store = getStore();

				const response = await fetch("https://playground.4geeks.com/apis/fake/contact/agenda/damianodionori");
				const jsonResponse = await response.json();

				setStore({ contacts: jsonResponse});
			},
			
			addContact: (contactData) => {

			
			
			}
		}
	};
};

export default getState;
