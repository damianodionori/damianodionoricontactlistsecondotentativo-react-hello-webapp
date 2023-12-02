import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const currentContact = store.contacts.find(contact => contact.id.toString() === params.id);

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

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEditData((prevData) => {
			const updatedData = {
				...prevData,
				[name]: value,
			};
			console.log(updatedData);
			return updatedData;
		});
	};

	console.log(params.id);

	const handleEditContact = (e) => {
		e.preventDefault();

		const { full_name, address, phone, email } = editData;
		if (!full_name && !address && !phone && !email) {
			alert('Please edit at least one field.');
			return;
		}

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
							name="full_name"
							placeholder="Edit your name"
							value={editData.full_name}
							defaultValue={editData.full_name}
							onChange={handleInputChange}
						/>
					</div>
					<div className="col-md-6 mb-3">
						<label htmlFor="inputEmail">Email</label>
						<input
							type="email"
							className="form-control"
							id="inputEmail"
							name="email"
							placeholder="Edit your email"
							value={editData.email}
							defaultValue={editData.email}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6 mb-3">
						<label htmlFor="inputAddress">Address</label>
						<input
							type="text"
							className="form-control"
							id="inputAddress"
							name="address"
							placeholder="Edit your Address"
							value={editData.address}
							defaultValue={editData.address}
							onChange={handleInputChange}
						/>
					</div>
					<div className="col-md-6 mb-3">
						<label htmlFor="inputPhone">Phone</label>
						<input
							type="tel"
							className="form-control"
							id="inputPhone"
							name="phone"
							placeholder="Edit your phone number"
							value={editData.phone}
							defaultValue={editData.phone}
							onChange={handleInputChange}
						/>
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