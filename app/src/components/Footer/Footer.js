import React, { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Footer.css"

import { Link } from "react-router-dom";

import { Logging } from "../../context/context";
import { Authentification } from '../../context/context';
import { Name } from '../../context/context';
import { useNavigate } from "react-router-dom";

function Footer() {

    const navigate = useNavigate();

    const { loggedIn, setLoggedIn } = useContext(Logging)
    const { userID, setUserID } = useContext(Authentification)
    const { userName, setName } = useContext(Name)


    return (
        <div class="container-fluid con-green">

            <h2 class="h1-header">Teamify</h2>
            <div class="row">
  
                <div class="col" />
                <div class="col" />
                <div class="col">
                    <button type="button" className="btn-navigate" onClick={() => navigate("/login")}>Log-In</button>
                </div>
                <div class="col">
                    <button type="button" className="btn-navigate" onClick={() => navigate("/test")}>Test</button>
                </div>
                <div class="col">
                    <button type="button" className="btn-navigate" onClick={() => navigate("/ergebnis")}>Ergebnis</button>
                </div>
                <div class="col">
                    <button type="button" className="btn-navigate" onClick={() => navigate("/teamergebnis")}>Team-Ergebns</button>
                </div>

                <div class="col" />
                <div class="col" />
            </div>
        </div>
    )
}

export default Footer