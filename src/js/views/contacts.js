import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Contacts = () => {
	const { store, actions } = useContext(Context);
	useEffect(() => { actions.getAgenda() }, []);


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
											<strong > {item.full_name} </strong>
											<p className="text-primary" > {item.address} </p>
											<p className="text-primary" > {item.phone} </p>
											<p className="text-primary" > {item.email} </p>
										</div>
										<div className="icons col-3 justify-content-end mt-2" >
											<button type="button" className="btn btn-secondary">
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
													<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"></path>
												</svg>
											</button>
											<button type="button" className="btn btn-secondary mx-3">
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
													<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path>
													<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>
												</svg>
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
					<button type="button" className="btn btn-success">Create New Contact</button>
				</Link>
				<br />
				<Link to="/">
					<button className="btn btn-primary ms-4">Back home</button>
				</Link>
			</div>
		</div>
	);
};