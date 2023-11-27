// demo.js
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Demo = () => {
	const { store, actions } = useContext(Context);

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [address, setAddress] = useState('');
	const [phone, setPhone] = useState('');

	// State variable to track whether the form should be displayed
	const [showForm, setShowForm] = useState(false);

	const handleCreateContact = async () => {
		if (!firstName || !lastName || !email || !address || !phone) {
			alert('Please fill in all required fields.');
			return;
		}

		actions.addContact({
			firstName,
			lastName,
			email,
			address,
			phone,
		});

		setFirstName('');
		setLastName('');
		setEmail('');
		setAddress('');
		setPhone('');

		// Hide the form after creating the contact
		setShowForm(false);
	};

	return (
		<div className="container">
			{/* Conditional rendering of the form */}
			{showForm && (
				<form>
					<label className="input-group">
						<span className="input-group-text">First and last name</span>
						<input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} aria-label="First name" className="form-control" placeholder="First Name" />
						<input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} aria-label="Last name" className="form-control" placeholder="Last Name" />
					</label>
					<br />
					<label class="input-group flex-nowrap">
						<span class="input-group-text" id="addon-wrapping">Email</span>
						<input type="text" value={email} onChange={(e) => setEmail(e.target.value)} class="form-control" placeholder="Email address" aria-label="Email address" aria-describedby="addon-wrapping" />
					</label>
					<br />
					<label class="input-group flex-nowrap">
						<span class="input-group-text" id="addon-wrapping">Address</span>
						<input type="text" value={address} onChange={(e) => setAddress(e.target.value)} class="form-control" placeholder="Address" aria-label="Address" aria-describedby="addon-wrapping" />
					</label>
					<br />
					<label class="input-group flex-nowrap">
						<span class="input-group-text" id="addon-wrapping">Phone</span>
						<input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} class="form-control" placeholder="Phone number" aria-label="Phone number" aria-describedby="addon-wrapping" />
					</label>
					<br />
					<button type="button" className="btn btn-primary" onClick={handleCreateContact}>
						Create your contact
					</button>
				</form>
			)}

			<ul className="list-group">
				{store.contacts.length === 0 ? (
					<span>No contacts so far</span>
				) : (
					store.contacts.map((item, index) => {
						return (
							<li key={index} className="list-group-item d-flex justify-content-between">
								{/* ... (your existing contact list rendering) */}
								<Link to={`/contact/edit/${item.id}`}>
									<button className="btn btn-secondary" onClick={() => handleEditContact(item.id)}>
										Edit this contact
									</button>
								</Link>
								<button className="btn btn-danger" onClick={() => handleDeleteContact(item.id)}>
									Delete this contact
								</button>
							</li>
						);
					})
				)}
			</ul>
			<br />
			<button className="btn btn-primary" onClick={() => setShowForm(true)}>
				Create a new contact!
			</button>
		</div>
	);
};
