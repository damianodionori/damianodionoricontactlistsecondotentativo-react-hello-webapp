import React, { useContext , useState} from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

	const navigate = useNavigate();

	const currentContact = store.contacts.find(contact => contact.id.toString() === params.contactId);

	const handleEditContact = (e) => {
		e.preventDefault();
		const updatedContactData = {
				full_name: `${firstName} ${lastName}`,
				email: email,
				address: address,
				phone: phone,
				agenda_slug: "damianodionori",
		};

		actions.editContact(currentContact.id, updatedContactData);

		navigate("/");
	};

	const handleDeleteContact = () => {
		const isConfirmed = window.confirm("Are you sure you want to delete this contact?");
		if (isConfirmed) {
			actions.deleteContact(currentContact.id);
		}
	};

	return (
		<div className="container">
			<form onSubmit={(e) => handleEditContact(e)}>
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
				<input type="submit" className="btn btn-primary" value={"Create your contact"}></input>
			</form>
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