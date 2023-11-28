import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext"; // Make sure to adjust the path accordingly

export const Home = () => {
	const { store, actions } = useContext(Context); // Use useContext instead of useStore
	const [editMode, setEditMode] = useState(null);

	const handleDeleteContact = (id) => {
		actions.deleteContact(id);
	};

	const handleEditContact = (index) => {
		setEditMode((prevIndex) => (prevIndex === index ? null : index));
	};

	const handleEditChange = (e, index, field) => {
		const updatedValue = e.target.value;
		const updatedContacts = [...store.contacts];
		const editedContact = updatedContacts[index];
		editedContact[field] = updatedValue;
		// setActions({ contacts: updatedContacts });
	};

	const handleSaveContact = (id, updatedContact) => {
		actions.updateContact(id, updatedContact);
		setEditMode(null);
	};

	return (
		<div className="text-center mt-5">
			<ul className="list-group">
				{store.contacts.length === 0 ? (
					<span>No contacts so far</span>
				) : (
					store.contacts.map((item, index) => (
						<li key={index} className="list-group-item d-flex justify-content-between">
							{editMode === index ? (
								<>
									{/* Input fields for editing contact */}
									<input type="text" value={item.full_name} onChange={(e) => handleEditChange(e, index, "full_name")} />
									<input type="text" value={item.email} onChange={(e) => handleEditChange(e, index, "email")} />
									<input type="text" value={item.address} onChange={(e) => handleEditChange(e, index, "address")} />
									<input type="text" value={item.phone} onChange={(e) => handleEditChange(e, index, "phone")} />
									{/* Save button */}
									<button className="btn btn-success" onClick={() => handleSaveContact(item.id, editedContact)}>
										Save
									</button>
								</>
							) : (
								<>
									<p>{item.full_name}</p>
									<p>{item.email}</p>
									<p>{item.address}</p>
									<p>{item.phone}</p>
									{/* Edit button */}
									<Link to="/contact/edit/:contactId">
										<button className="btn btn-warning" onClick={() => handleEditContact(index)}>
											Edit
										</button>
									</Link>
									<button className="btn btn-danger" onClick={() => handleDeleteContact(item.id)}>
										Delete
									</button>
								</>
							)}
						</li>
					))
				)}
			</ul>
			<br />
			<Link to="/demo">
				<button className="btn btn-primary" onClick={() => setShowForm(true)}>
					Create a new contact!
				</button>
			</Link>
		</div>
	);
};