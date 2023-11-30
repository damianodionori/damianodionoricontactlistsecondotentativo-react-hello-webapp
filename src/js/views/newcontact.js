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
        actions.addContact(createData)
    }



    return (


        <form onSubmit={handleSubmit}>
            <div className="form-group col-4">
                <label for="inputName">Full Name</label>
                <input type="text" className="form-control" id="inputName" name="inputName" placeholder="Enter full name"></input>
            </div>
            <div className="form-group col-4">
                <label for="inputAddress">Address</label>
                <input type="text" className="form-control" id="inputAddress" name="inputAddress" placeholder="Enter Address"></input>
            </div>
            <div className="form-group col-4">
                <label for="inputPhone">Phone</label>
                <input type="tel" className="form-control" id="inputPhone" name="inputPhone" placeholder="Enter phone number"></input>
            </div>
            <div className="form-group col-4">
                <label for="inputEmail">Email</label>
                <input type="email" className="form-control" id="inputEmail" name="inputEmail" placeholder="Enter email"></input>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>


        </form>

    )

}

NewContact.propTypes = {
    match: PropTypes.object
};