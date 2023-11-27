import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Demo = () => {
	const { store, actions } = useContext(Context);

	const handleCreateContact = () => {
		actions.addContact({
			fullName: "Damiano Dionori",
			email: "d.dionori@gmail.com",
			agendaSlug: "damianodionori",
			address: "Italia",
			phone: "+39 123456789",
		})
	}

	const handleDeleteContact = (id) => actions.deleteContact(id);

	useEffect(() => actions.getAgenda(), []);
	
	return (
		<div className="container">
			<ul className="list-group">
				{store.contacts.length === 0 ? (<span>No contacts so far</span>) :
					store.contacts.map((item, index) => {
					return (
						<li
							key={index}
							className="list-group-item d-flex justify-content-between">
							<p>{item.fullName}</p>
							<button className="btn btn-danger" onClick={() => handleDeleteContact(item.id)}>Delete this contact</button>
						</li>
					);
				})}
			</ul>
			<br />
			<button className="btn btn-primary" onClick={handleCreateContact}>Create your first contact!</button>
		</div>
	);
};
