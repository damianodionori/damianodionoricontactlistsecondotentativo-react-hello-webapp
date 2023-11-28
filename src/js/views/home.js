import React, { useState } from "react";
import { Link } from "react-router-dom";
import getState from "../store/flux";

export const Home = () => {
	const { store, actions } = useStore();
	const [editMode, setEditMode] = useState(null);

	const handleDeleteContact = (id) => {
		actions.deleteContact(id);
	};

	const handleEditContact = (index) => {
		setEditMode((prevIndex) => (prevIndex === index ? null : index));
	};

	const handleEditChange = (e, index, field) => {
		
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
									<button className="btn btn-warning" onClick={() => handleEditContact(index)}>
										Edit
									</button>
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
			<button className="btn btn-primary" onClick={() => setShowForm(true)}>
				Create a new contact!
			</button>
		</div>
	);
};