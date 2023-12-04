import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";


export const NewContact = props => {

  const { store, actions } = useContext(Context);
  const params = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    const createData = {
      full_name: e.target.elements.inputName.value,
      address: e.target.elements.inputAddress.value,
      phone: e.target.elements.inputPhone.value,
      email: e.target.elements.inputEmail.value
    };

    actions.addContact(createData);

  };


  return (
    <div className="container mt-5">
      <h2 className="mb-4">Please, enter contact details</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="inputName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputName"
              name="inputName"
              placeholder="Enter full name"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              name="inputEmail"
              placeholder="Enter email"
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              name="inputAddress"
              placeholder="Enter address"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="inputPhone" className="form-label">
              Phone
            </label>
            <input
              type="tel"
              className="form-control"
              id="inputPhone"
              name="inputPhone"
              placeholder="Enter phone number"
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );

}

NewContact.propTypes = {
  match: PropTypes.object
};