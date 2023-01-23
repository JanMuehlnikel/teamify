import React, { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Navigation.css"

import { Nav, Navbar } from 'react-bootstrap'

import { Link } from "react-router-dom";

import { Logging } from "../../context/context";
import { Authentification } from '../../context/context';
import { Navbool } from '../../context/context';
import { Name } from '../../context/context';
import AlternativeNavigation from "./AlternativeNavigation";

import logo from "./logo.jpeg"


function Navigation() {

    const { loggedIn, setLoggedIn } = useContext(Logging)
    const { userID, setUserID } = useContext(Authentification)
    const { userName, setName } = useContext(Name)
    const { alternateNav, setNav } = useContext(Navbool)


    if (alternateNav) {
        return (
            <AlternativeNavigation></AlternativeNavigation>
            )
    } else {

        return (

            <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-custom">
                <div class="container-fluid nav1">
                    <a href="/" class="navbar-brand mid">Teamify</a>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <a id="a-navbar">Hallo, {userName}!</a>
                        </ul>
                        <form class="d-flex">
                            <img height="50px" width="50px" src="https://cdn-icons-png.flaticon.com/512/4128/4128244.png" />
                        </form>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navigation