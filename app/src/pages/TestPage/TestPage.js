import React, { useContext, useEffect, useState } from "react";
import useFetch from "react-fetch-hook";
import "./TestPage.css"
import { useNavigate } from "react-router-dom";
import { ADRESS, Navbool, Team } from "../../context/context";
import { useForm } from "react-hook-form";
import { Logging } from "../../context/context";
import { Authentification } from "../../context/context";
import NotLoggedPage from "../NotLoggedPage/NotLoggedPage";

function TestPage() {

    const { alternateNav, setNav } = useContext(Navbool)

    setNav(false)

    const { teamName, setTeam } = useContext(Team)
    const { loggedIn, setLoggedIn } = useContext(Logging)
    const { userID, setUserID } = useContext(Authentification)

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    function buttonUp(gruppe, old_id) {
        if (old_id != 4) {
            fetch(ADRESS + "/api/users/buttonUP?" +
                "userID=" + userID +
                "&gruppe=" + gruppe +
                "&id=" + old_id,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                })
                .then(function (res) { window.location.reload() })
                .catch(function (res) { })
        }
    }

    function buttonDown(gruppe, old_id) {
        if (old_id != 1) {

            fetch(ADRESS + "/api/users/buttonDown?" +
                "userID=" + userID +
                "&gruppe=" + gruppe +
                "&id=" + old_id,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                })
                .then(function (res) { window.location.reload() })
                .catch(function (res) { })
        }
    }


    const { isLoading, data, error } = useFetch(ADRESS + "/api/user/getgroup/" + userID);

    function getResult() {
        navigate("/ergebnis")
    }

    const onSubmit = data => {

        if (data.team.replaceAll(' ', '') != "") {
            setTeam(data.team)


            fetch(ADRESS + "/api/users/team?" +
                "userID=" + userID +
                "&team=" + data.team,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                })
                .then(function (res) {
                    window.location.reload()
                })
                .catch(function (res) { })

            navigate("/teamergebnis")
        } else {
            document.getElementById("warnTeam").innerHTML = "Bitte gebe ein valides Team an!";
        }
    }

    if (isLoading) {
        return <h2>Loading ...</h2>
    }

    if (error) {
        if (loggedIn == "false") {
            return <NotLoggedPage></NotLoggedPage>
        } else {
            return <h2>Loading ... If the process takes too long please try to refresh the page!</h2>
        }
    }

    function shownums(gruppen, searchedGroup) {
        return (

            gruppen[searchedGroup].sort((a, b) => a.id > b.id ? -1 : 1).map(eigenschaft => {
                return (

                    <div class="row">
                        <div class="col" id="col-number">
                            <h2 id="a-input">{eigenschaft.id}</h2>
                        </div>
                    </div>

                )
            })
        )
    }
    function showcards(gruppen, searchedGroup) {
        return (

            gruppen[searchedGroup].sort((a, b) => a.id > b.id ? -1 : 1).map(eigenschaft => {
                return (

                    <div class="row">
                        <div class="col" id="col-text">
                            <h2 id="a-input">{eigenschaft.name}</h2>
                        </div>
                        <div class="col" id="col-buttons">
                            {/*<button type="button" class="float-end" id="btn-updown" onClick={() => buttonDown(searchedGroup, eigenschaft.id)}><h3>???</h3></button>*/}
                            {eigenschaft.id != 4 ?
                                <button type="button" class="float-end" id="btn-updown" onClick={() => buttonUp(searchedGroup, eigenschaft.id)}><h3>???</h3></button>
                                :
                                <a></a>
                            }

                        </div>
                    </div>

                )
            })
        )
    }

    function teamButtonError() {
        if (teamName == "") {
            return (
                <a id="warnTeam"></a>
            )
        } else {
            return (
                <a id="warnTeam">Du hast berits <b>{teamName}</b> als Team angegeben. Falls du das Team ??nderst, wirst du aus deinem alten Team entfernt!</a>
            )
        }
    }


    return (

        <div class="container-fluid">
            <div class="row rowinfo1">
                <div class="col col-6" id="col-info-1">
                    <h2 class="b">Wie es funktioniert:</h2>
                    <p>Sortiere die Adjektive so, dass das Adjektiv das dich am besten beschreibt ganz oben steht. Die Adjektive werden dann von oben nach unten mit vier bis einem Punkt bewertet. 
                        Jedes Adjektiv eines Kastens, ist mit einer anderen Pers??nlichkeit verbunden.</p>
                </div>
                <div class="col" id="col-info-2">
                    <h2 class="b">Gef??llt dir der Test? <br />Empfehle uns weiter!</h2>
                </div>
            </div>

            <div class="row erg">
                <div class="col" id="col-gesamt">
                    <div class="row justify-content-center">
                        <div class="col col-1 " id="col-nums">
                            {shownums(data, "group1")}
                        </div>
                        <div class="col col-7" id="col-input">
                            {showcards(data, "group1")}
                        </div>
                    </div>
                </div>

                <div class="col" id="col-gesamt">
                    <div class="row justify-content-center">
                        <div class="col col-1 " id="col-nums">
                            {shownums(data, "group2")}
                        </div>
                        <div class="col col-7" id="col-input">
                            {showcards(data, "group2")}
                        </div>
                    </div>
                </div>

                <div class="col" id="col-gesamt">
                    <div class="row justify-content-center">
                        <div class="col col-1 " id="col-nums">
                            {shownums(data, "group3")}
                        </div>
                        <div class="col col-7" id="col-input">
                            {showcards(data, "group3")}
                        </div>
                    </div>
                </div>
            </div>

            <div class="row erg">
                <div class="col" id="col-gesamt">
                    <div class="row justify-content-center">
                        <div class="col col-1 " id="col-nums">
                            {shownums(data, "group4")}
                        </div>
                        <div class="col col-7" id="col-input">
                            {showcards(data, "group4")}
                        </div>
                    </div>
                </div>

                <div class="col" id="col-gesamt">
                    <div class="row justify-content-center">
                        <div class="col col-1 " id="col-nums">
                            {shownums(data, "group5")}
                        </div>
                        <div class="col col-7" id="col-input">
                            {showcards(data, "group5")}
                        </div>
                    </div>
                </div>

                <div class="col" id="col-gesamt">
                    <div class="row justify-content-center">
                        <div class="col col-1 " id="col-nums">
                            {shownums(data, "group6")}
                        </div>
                        <div class="col col-7" id="col-input">
                            {showcards(data, "group6")}
                        </div>
                    </div>
                </div>
            </div>

            <div class="row erg">
                <div class="col" id="col-gesamt">
                    <div class="row justify-content-center">
                        <div class="col col-1 " id="col-nums">
                            {shownums(data, "group7")}
                        </div>
                        <div class="col col-7" id="col-input">
                            {showcards(data, "group7")}
                        </div>
                    </div>
                </div>

                <div class="col" id="col-gesamt">
                    <div class="row justify-content-center">
                        <div class="col col-1 " id="col-nums">
                            {shownums(data, "group8")}
                        </div>
                        <div class="col col-7" id="col-input">
                            {showcards(data, "group8")}
                        </div>
                    </div>
                </div>

                <div class="col" id="col-gesamt">
                    <div class="row justify-content-center">
                        <div class="col col-1 " id="col-nums">
                            {shownums(data, "group9")}
                        </div>
                        <div class="col col-7" id="col-input">
                            {showcards(data, "group9")}
                        </div>
                    </div>
                </div>
            </div>



            <div class="row erg">
                <div class="col" id="col-gesamt">
                    <div class="row justify-content-center">
                        <div class="col col-1 " id="col-nums">
                            {shownums(data, "group10")}
                        </div>
                        <div class="col col-7" id="col-input">
                            {showcards(data, "group10")}
                        </div>
                    </div>
                </div>

                <div class="col" id="col-abgabe">
                    <div class="row">
                        <h2 className="cta">Erfahre jetzt deine individuelle Team-Pers??nlichkeit:</h2>
                    </div>
                    <div class="row justify-content-center">
                        <button type="button" class="btn btn-primary btn-cta" id="button-lg" onClick={() => getResult()}>Los gehts!</button>
                    </div>
                </div>
                <div class="col" id="col-abgabe">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h2 className="cta">Oder m??chtest du gleich deine Ergebnisse im Team vergleichen:</h2>
                        <div class="row">
                            <div class="col teamEingabe justify-content-center">
                                <input {...register("team")} type="text" class="form-control einagbe" placeholder="TeamID" aria-label="TeamID" aria-describedby="basic-addon1" />
                            </div>
                            <div class="col justify-content-center">
                                <button class="btn btn-primary btn-cta1" id="button-lg" type="submit button">Los gehts!</button>
                            </div>
                        </div>
                        {teamButtonError()}
                    </form>

                </div>
            </div>

        </div>


    )

}

export default TestPage