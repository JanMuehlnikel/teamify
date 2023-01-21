import React, { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./AlternativeNavigation.css"

import { Nav, Navbar } from 'react-bootstrap'

import { Link } from "react-router-dom";

import { Logging } from "../../context/context";
import { Authentification } from '../../context/context';
import { Team } from '../../context/context';
import { Name } from '../../context/context';
import { useNavigate } from "react-router-dom";


function AlternativeNavigation() {

    const { loggedIn, setLoggedIn } = useContext(Logging)
    const { userID, setUserID } = useContext(Authentification)
    const { userName, setName } = useContext(Name)
    const { teamName, setTeam } = useContext(Team)

    function logOut() {
        setLoggedIn(false)
        setUserID("")
        setName("")
        setTeam("")
    }

    const navigate = useNavigate();


    return (

        <Navbar bg="light" expand="lg" id="navbar-normal">
            <container className="container-fluid">

                <Nav className="mx-auto">
                    <Navbar.Brand href="/">Teamify</Navbar.Brand>
                </Nav>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {loggedIn && userID != "" ?
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link class="nav-link" to="/test">Test durchführen</Link>
                            <Link class="nav-link" to="/ergebnis">Ergebnis ansehen</Link>
                            <Link class="nav-link" to="/teamergebnis">Team-Ergebnis ansehen</Link>
                        </Nav>
                        <Nav className="mr-auto">
                            <Nav className="mr-auto"></Nav>
                            {/*<Navbar.Text><a href="#login">Account</a></Navbar.Text>*/}
                            <Link class="nav-link" onClick={() => logOut()}>Ausloggen</Link>
                        </Nav>
                    </Navbar.Collapse>
                    :
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav className="mr-auto">
                            <Link class="nav-link" to="/login">Anmelden</Link>
                            <Link class="nav-link" to="/login">Registrieren</Link>
                        </Nav>
                    </Navbar.Collapse>
                }

            </container>
        </Navbar>


    )
}

export default AlternativeNavigation