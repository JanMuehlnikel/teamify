import React, { useContext, useState } from "react";
import { Logging, Navbool } from "../../context/context";
import { Authentification } from "../../context/context";
import { useNavigate } from "react-router-dom";
import "./NotLogged.css"
import Footer from "../../components/Footer/Footer";

function NotLoggedPage() {

    const { loggedIn, setLoggedIn } = useContext(Logging)
    const { userID, setUserID } = useContext(Authentification)
    const { alternateNav, setNav } = useContext(Navbool)
    const navigate = useNavigate();

    setNav(true)


    return (
        <div className="container-fluid">
            <h1 className="fehler">Ups, Du bist anscheinend noch nicht angemeldet oder registriert!</h1>

            <button type="submit" class="btn btn-light btn-primary register" id="btn-test" onClick={() => navigate("/login")}>Hier registrieren</button>
            <div className="el-footer">
                <Footer></Footer>
            </div>
        </div>
    )
}

export default NotLoggedPage