import React, { useContext, useState } from "react";
import loginImage from "./team.jpeg"
import "./LoginPage.css"
import { useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Logging, Name, Navbool } from "../../context/context";
import { Authentification } from "../../context/context";
import { useNavigate } from "react-router-dom";
import { Team } from "../../context/context";
import Footer from "../../components/Footer/Footer";
import { ADRESS } from "../../context/context";
import AlternativeNavigation from "../../components/Navbar/AlternativeNavigation";

function LoginPage() {

    const { alternateNav, setNav } = useContext(Navbool)

    setNav(true)

    const { loggedIn, setLoggedIn } = useContext(Logging)
    const { userID, setUserID } = useContext(Authentification)
    const { teamName, setTeam } = useContext(Team)
    const { userName, setName } = useContext(Name)

    const [warnMessage, setLoginMessage] = useState("")

    const navigate = useNavigate();

    const [warnRegisterMessage, setRegisterMessage] = useState("")



    const { register, handleSubmit, formState: { errors } } = useForm();

    const onLogin = loginData => {
        fetch(ADRESS + "/api/login?" +
            "email=" + loginData.loginEmail +
            "&password=" + loginData.loginPassword,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
            })
            .then(res => res.json())
            .then(res => {

                if (res.auth != "error") {
                    console.log("auth")
                    setUserID(res.auth)
                    setLoginMessage("Erfolgreich angemeldet!")
                    setLoggedIn(true)
                    setTeam(res.team)
                    navigate("/test")
                    setName(res.name)
                } else {
                    setLoginMessage("Die Email Adresse oder das Passwort sind falsch!")
                }

            })
            .catch(function (res) { console.log(res) })
    }


    // generate a userID from tiem string and a random string 
    const generatedID = "user:" + (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2)

    const onRegister = registerData => {

        if (
            registerData.prename.replace(/\s/g, '') != "" &&
            registerData.name.replace(/\s/g, '') != "" &&
            registerData.email.replace(/\s/g, '') != "" &&
            registerData.password.replace(/\s/g, '') != ""
        ) {

            fetch(ADRESS + "/api/register?" +
                "userID=" + generatedID +
                "&prename=" + registerData.prename +
                "&name=" + registerData.name +
                "&email=" + registerData.email +
                "&password=" + registerData.password,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                })
                .then(res => res.json())
                .then(res => {

                    if (res.message == "success") {
                        setUserID(generatedID)
                        setLoggedIn(true)
                        navigate("/test")
                        setTeam("")
                        setName(registerData.prename + " " + registerData.name)
                    } else {
                        setRegisterMessage(res.message)
                    }

                })
                .catch(function (res) { console.log(res) })
        } else {
            setRegisterMessage("Bitte fülle jedes Feld aus!")
        }
    }

    return (
        
        <div className="main">
            <div class="container-fluid background">
                <div class="row">
                    <div class="col" id="col-image">

                        <img class="img-team" src={loginImage} />

                        <h2 class="effizienter">Gleich haben Sie es
                            geschafft ihr Team
                            noch effizienter zu
                            gestalten.</h2>

                    </div>
                    <div class="col" id="col-login" justify-content-center>
                        <h2 id="h1-bold">Einloggen</h2>
                        <form onSubmit={handleSubmit(onLogin)} >
                            <div className="row justify-content-center">
                                <div className="col">
                                    <label for="input-email">Email</label>
                                    <input {...register("loginEmail")} type="email" class="form-control" id="input-email" aria-describedby="emailHelp" placeholder="Email Adresse" />
                                </div>
                                <div className="col">
                                    <label for="input-password">Passwort</label>
                                    <input {...register("loginPassword")} type="password" class="form-control" id="input-password" placeholder="Passwort" />
                                </div>
                                <p class="txt-warnMessage" id="txt-warn">{warnMessage}</p>
                                <button type="submit" class="btn btn-light btn-primary" id="btn-login">Einloggen</button>
                            </div>
                        </form>

                        <h2 id="h1-bold">oder Registrieren</h2>

                        <form onSubmit={handleSubmit(onRegister)} >
                            <div className="row justify-content-center">
                                <div className="col">
                                    <label for="input-prename">Vorname</label>
                                    <input {...register("prename")} type="text" class="form-control" id="input-prename" placeholder="Vorname" />
                                </div>
                                <div className="col">
                                    <label for="input-name">Nachname</label>
                                    <input {...register("name")} type="text" class="form-control" id="input-name" placeholder="Nachname" />
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col">
                                    <label for="input-email">Email</label>
                                    <input {...register("email")} type="email" class="form-control" id="input-email" aria-describedby="emailHelp" placeholder="Email Adresse" />
                                </div>
                                <div className="col">
                                    <label for="input-password">Passwort</label>
                                    <input {...register("password")} type="password" class="form-control" id="input-password" placeholder="Passwort" />
                                </div>
                                <p class="txt-warnMessage" id="txt-warn">{warnRegisterMessage}</p>
                                <button type="submit" class="btn btn-light btn-primary justify-content-center" id="btn-register">Registrieren</button>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </div>


    )
}

export default LoginPage