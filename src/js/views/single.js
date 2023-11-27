import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	const currentContact = store.contacts.find(contact => contact.id.toString() === params.contactId);

	const handleSaveEditedContact = () => {
		actions.editContact({
			id,
		})
	}

	return (
		<div className="jumbotron">
			{currentContact && (<p>{currentContact.full_name}</p>)}

			<Link to="/">
				<span className="btn btn-primary btn-lg" href="#" role="button">
					Back home
				</span>
			</Link>
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
