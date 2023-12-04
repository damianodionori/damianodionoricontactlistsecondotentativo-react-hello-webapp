import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	const currentContact = store.contacts.find(contact => contact.id.toString() === params.contactId)


	const [fullName, setFullName] = useState('');
	const [address, setAddress] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');

	useEffect(() => {
		if (currentContact) {
			setFullName(currentContact.full_name);
			setAddress(currentContact.address);
			setPhone(currentContact.phone);
			setEmail(currentContact.email);
		}
	}, [currentContact]);

	const handleChangeFullName = (e) => {
		setFullName(e.target.value)
	};
	const handleChangeAddress = (e) => {
		setAddress(e.target.value)
	};
	const handleChangePhone = (e) => {
		setPhone(e.target.value)
	};
	const handleChangeEmail = (e) => {
		setEmail(e.target.value)
	};


	const handleEditContact = (e) => {
		e.preventDefault();

		const editData = {
			full_name: fullName,
			address: address,
			phone: phone,
			email: email,
		};

		actions.editContact(params.contactId, editData);
	};

	return (
		<div className="container mt-5">
			<h2 className="mb-4">What do you need to change?</h2>
			<form onSubmit={handleEditContact} className="form ms-3">
				<div className="row">
					<div className="col-md-6 mb-3">
						<label htmlFor="inputName">Full Name</label>
						<input
							type="text"
							className="form-control"
							id="inputName"
							name="inputName"
							placeholder="Edit your name"
							value={fullName}
							onChange={handleChangeFullName}
						></input>
					</div>
					<div className="col-md-6 mb-3">
						<label htmlFor="inputEmail">Email</label>
						<input
							type="email"
							className="form-control"
							id="inputEmail"
							name="inputEmail"
							placeholder="Edit your email"
							value={email}
							onChange={handleChangeEmail}
						></input>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6 mb-3">
						<label htmlFor="inputAddress">Address</label>
						<input
							type="text"
							className="form-control"
							id="inputAddress"
							name="inputAddress"
							placeholder="Edit your Address"
							value={address}
							onChange={handleChangeAddress}
						></input>
					</div>
					<div className="col-md-6 mb-3">
						<label htmlFor="inputPhone">Phone</label>
						<input
							type="tel"
							className="form-control"
							id="inputPhone"
							name="inputPhone"
							placeholder="Edit your phone number"
							value={phone}
							onChange={handleChangePhone}
						></input>
					</div>
				</div>
				<button type="submit" className="btn btn-success mt-3">
					Save changes
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