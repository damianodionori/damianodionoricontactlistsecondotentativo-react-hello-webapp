import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	const currentContact = store.contacts.find
		(contact => contact.id.toString() === params.contactId);

	const [editData, setEditData] = useState({
		full_name: "",
		address: "",
		phone: "",
		email: "",
	});

	useEffect(() => {
		if (currentContact) {
			setEditData({
				full_name: currentContact.full_name,
				address: currentContact.address,
				phone: currentContact.phone,
				email: currentContact.email,
			});
		}
	}, [currentContact]);

	const handleEditContact = (e) => {
		e.preventDefault();

		const updatedData = {
			full_name: e.target.elements.inputName.value,
			address: e.target.elements.inputAddress.value,
			phone: e.target.elements.inputPhone.value,
			email: e.target.elements.inputEmail.value,
		};

		actions.editContact(params.contactId, updatedData);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEditData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};



	return (
		<div className="jumbotron">
			<form onSubmit={handleEditContact} className="form ms-3">
				<div className="form-group col-4">
					<label htmlFor="inputName">Full Name</label>
					<input
						type="text"
						className="form-control"
						id="inputName"
						name="inputName"
						placeholder="Edit your name"
						value={editData.full_name}
						onChange={handleInputChange}
					/>
				</div>
				<div className="form-group col-4">
					<label htmlFor="inputAddress">Address</label>
					<input
						type="text"
						className="form-control"
						id="inputAddress"
						name="inputAddress"
						placeholder="Edit your Address"
						value={editData.address}
						onChange={handleInputChange}
					/>
				</div>
				<div className="form-group col-4">
					<label htmlFor="inputPhone">Phone</label>
					<input
						type="tel"
						className="form-control"
						id="inputPhone"
						name="inputPhone"
						placeholder="Edit your phone number"
						value={editData.phone}
						onChange={handleInputChange}
					/>
				</div>
				<div className="form-group col-4">
					<label htmlFor="inputEmail">Email</label>
					<input
						type="email"
						className="form-control"
						id="inputEmail"
						name="inputEmail"
						placeholder="Edit your email"
						value={editData.email}
						onChange={handleInputChange}
					/>
				</div>
				<button type="submit" className="btn btn-success mt-3">
					Submit
				</button>
			</form>

			<hr className="my-4" />

			<Link to="/">
				<span className="btn btn-primary btn-lg" role="button">
					Back home
				</span>
			</Link>
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object,
};