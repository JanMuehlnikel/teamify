import React, { useContext, useState } from "react";
import loginImage from "./team-fade.png"
import "./LoginPage.css"
import { useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Logging, Name, Navbool } from "../../context/context";
import { Authentification } from "../../context/context";
import { useNavigate } from "react-router-dom";
import { Team } from "../../context/context";
import Footer from "../../components/Footer/Footer";

function LoginPage() {

    const { alternateNav, setNav } = useContext(Navbool)

    setNav(true)

    const {loggedIn, setLoggedIn} = useContext(Logging)
    const {userID, setUserID} = useContext(Authentification)
    const { teamName, setTeam } = useContext(Team)
    const { userName, setName } = useContext(Name)

    const [warnMessage, setLoginMessage] = useState("")

    const navigate = useNavigate();

    const [warnRegisterMessage, setRegisterMessage] = useState("")

 
    
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onLogin = loginData => {
        fetch("http://localhost:8080/api/login?" +
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
       fetch("http://localhost:8080/api/register?" +
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
    }

    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col" id="col-image">

                    <img id="img-1" src={loginImage} />

                    <h1>Gleich haben Sie es
                        geschafft ihr Team
                        noch effizienter zu
                        machen.</h1>

                </div>
                <div class="col" id="col-login">
                    <h1 id="h1-bold">Einloggen</h1>
                    <form onSubmit={handleSubmit(onLogin)} >
                        <div class="form-group">
                            <label for="input-email">Email Adresse</label>
                            <input {...register("loginEmail")} type="email" class="form-control" id="input-email" aria-describedby="emailHelp" placeholder="Email Adresse" />
                        </div>
                        <div class="form-group">
                            <label for="input-password">Passwort</label>
                            <input {...register("loginPassword")} type="password" class="form-control" id="input-password" placeholder="Passwort" />
                        </div>
                        <p class="txt-warnMessage" id="txt-warn">{warnMessage}</p>
                        <button type="submit" class="btn btn-light btn-primary" id="btn-login">Einloggen</button>
                    </form>

                    <h1 id="h1-bold">oder Registrieren</h1>

                    <form onSubmit={handleSubmit(onRegister)} >
                     <div class="form-group">
                        <label for="input-prename">Vorname</label>
                        <input {...register("prename")} type="text" class="form-control" id="input-prename" placeholder="Vorname" />
                     </div>
                     <div class="form-group">
                        <label for="input-name">Nachname</label>
                        <input {...register("name")} type="text" class="form-control" id="input-name" placeholder="Nachname" />
                     </div>
                     <div class="form-group">
                        <label for="input-email">Email Adresse</label>
                        <input {...register("email")} type="email" class="form-control" id="input-email" aria-describedby="emailHelp" placeholder="Email Adresse" />
                     </div>
                     <div class="form-group">
                        <label for="input-password">Passwort</label>
                        <input {...register("password")} type="password" class="form-control" id="input-password" placeholder="Passwort" />
                     </div>
                     <p class="txt-warnMessage" id="txt-warn">{warnRegisterMessage}</p>
                     <button type="submit" class="btn btn-light btn-primary" id="btn-login">Hier registrieren</button>
                  </form>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )

}

export default LoginPage