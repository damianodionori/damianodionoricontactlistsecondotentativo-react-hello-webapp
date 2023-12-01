import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Contacts = () => {
	const { store, actions } = useContext(Context);
	useEffect(() => { actions.getAgenda() }, []);

	const handleDeleteContact = (id) => {
		if (window.confirm('Are you sure you want to delete this contact?')) {
			actions.deleteContact(id);
		}
	};

	return (
		<div className="container">
			<div className="card" >
				<ul className="list-group">
					{store.contacts.length === 0 ? (<span>No contacts so far</span>) :
						store.contacts.map((item, index) => {
							return (

								<li key={index}
									className="list-group-item">

									<div className="d-flex">
										<div className="col-2 mx-4 my-3"> <img className="card-img-left" src="https://placehold.co/60x60" alt="Card image cap"></img> </div>
										<div className="col-8">
											<p><strong > {item.full_name} </strong></p>
											<p> {item.address} </p>
											<p> {item.phone} </p>
											<p> {item.email} </p>
										</div>
										<div className="icons col-3 justify-content-end mt-2" >
										<Link to={`/single/${item.contactId}`}>
												<button type="button" className="btn btn-warning">
													Edit
												</button>
											</Link>
											<button type="button" className="btn btn-danger mx-3" onClick={() => handleDeleteContact(item.id)}>
												Delete
											</button>
										</div>
									</div>
								</li>
							);
						})}
				</ul></div>
			<br />
			<div className="d-flex justify-content-center mt-2">
				<Link to="/newcontact">
					<button type="button" className="btn btn-success">Add a new contact</button>
				</Link>
				<br />
				<Link to="/">
					<button className="btn btn-primary ms-4">Go back home</button>
				</Link>
			</div>
		</div>
	);
};