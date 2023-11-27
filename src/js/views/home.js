import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => (
	<div className="text-center mt-5">

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
