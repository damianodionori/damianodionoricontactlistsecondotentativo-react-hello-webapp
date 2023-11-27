import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Demo = () => {
	const { store, actions } = useContext(Context);

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
							placeholder
						</li>
					);
				})}
			</ul>
			<br />
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
};
