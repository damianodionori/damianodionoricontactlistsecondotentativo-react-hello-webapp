import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	const currentContact = store.contacts.find(contact => contact.id.toString() === params.contactId);

	const handleEditContact = () => {
		const updatedContactData = {
			full_name: "Updated Name",
			email: "updated@email.com",
			address: "Updated Address",
			phone: "Updated Phone",
		};

		actions.editContact(currentContact.id, updatedContactData);

		history.push(`/contact/${currentContact.id}`);
	};

	const handleDeleteContact = () => {
		const isConfirmed = window.confirm("Are you sure you want to delete this contact?");
		if (isConfirmed) {
			actions.deleteContact(currentContact.id);
		}
	};

	return (
		<div className="container">
			<div className="jumbotron">
				{currentContact && (
					<div>
						<p>{currentContact.full_name}</p>
						<p>{currentContact.email}</p>
						<p>{currentContact.address}</p>
						<p>{currentContact.phone}</p>
						<button className="btn btn-secondary" onClick={handleEditContact}>
							Edit this contact
						</button>
						<button className="btn btn-danger" onClick={handleDeleteContact}>
							Delete this contact
						</button>
					</div>
				)}

				<Link to="/">
					<span className="btn btn-primary btn-lg" role="button">
						Back home
					</span>
				</Link>
			</div>
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object
};