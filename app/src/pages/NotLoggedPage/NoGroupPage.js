import React, { useContext, useState } from "react";
import { Logging, Navbool } from "../../context/context";
import { Authentification } from "../../context/context";
import { useNavigate } from "react-router-dom";
import useFetch from "react-fetch-hook";
import "./NotLogged.css"
import Footer from "../../components/Footer/Footer";

function NoGroupPage() {

    const { loggedIn, setLoggedIn } = useContext(Logging)
    const { userID, setUserID } = useContext(Authentification)
    const { alternateNav, setNav } = useContext(Navbool)

    setNav(true)


    return (
        <div className="container-fluid">
            <h1 className="fehler">Ups, Du hast dich bisher noch in keine Gruppe eingetragen! Gehe dafür auf die Test durchführen Seite und trage eine Team-ID ein.</h1>

            <div className="el-footer">
                <Footer></Footer>
            </div>
        </div>
    )
}

export default NoGroupPage