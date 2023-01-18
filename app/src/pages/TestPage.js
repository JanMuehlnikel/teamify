import React, { useContext, useEffect, useState } from "react";
import useFetch from "react-fetch-hook";
import "../css/TestPage.css"
import { useNavigate } from "react-router-dom";

function TestPage() {

    const navigate = useNavigate();
    

    function buttonUp(gruppe, old_id) {
        fetch("http://localhost:8080/api/users/buttonUP?" +
            "userID=" + "user1" +
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

    function buttonDown(gruppe, old_id) {
        console.log(gruppe, old_id)
        fetch("http://localhost:8080/api/users/buttonDown?" +
            "userID=" + "user1" +
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


    const { isLoading, data, error } = useFetch("http://localhost:8080/api/user/getgroup/" + "user1");

    function getResult() {
        navigate("/ergebnis")
    }

    function getTeamResult(gruppe, old_id) {
        fetch("http://localhost:8080/api/users/team?" +
            "userID=" + "user1" +
            "&team=" + "team1",
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

    if (isLoading) {
        return <div>IS loading</div>
    }

    if (error) {
        return <div>Fehler beim laden der Userdaten! Bitte starte den Rest Server</div>
    }


    function showcards(gruppen, searchedGroup) {
        return (

            gruppen[searchedGroup].sort((a, b) => a.id > b.id ? -1 : 1).map(eigenschaft => {
                return (

                    <div class="row">
                        <div class="col" id="col-number">
                            <a id="a-input">{eigenschaft.id}</a>
                        </div>
                        <div class="col" id="col-text">
                            <a id="a-input">{eigenschaft.name}</a>
                        </div>
                        <div class="col" id="col-text">
                            <button type="button" class="float-end" id="btn-updown" onClick={() => buttonUp(searchedGroup, eigenschaft.id)}>▲</button>
                            <button type="button" class="float-end" id="btn-updown" onClick={() => buttonDown(searchedGroup, eigenschaft.id)}>▼</button>
                        </div>
                    </div>

                )
            })
        )
    }


    return (

        <div class="container">
            <div class="row">
                <div class="col col-6" id="col-info-1">
                    <h2>Wie es funktioniert:</h2>
                    <p>Sortiere die Adjektive so, dass das Adjektiv das Dich am besten beschreibt ganz oben steht. Diesem
                        Adjektiv gibst Du dann 4 Punkte. Dem Adjektiv, dass Dich am zweitbesten beschreibt navigierst Du
                        mit den Pfeilen unter dem Ersten, diesem Adjektiv gibst Du dann 3 Punkte. Und so geht es immer
                        weiter.</p>
                </div>
                <div class="col" id="col-info-2">
                    <h3>Gefällt dir der Test? Empfehle uns weiter!</h3>
                </div>
            </div>

            <div class="row">
                <div class="col" id="col-input">
                    {showcards(data, "group1")}
                </div>
                <div class="col" id="col-input">
                    {showcards(data, "group2")}
                </div>
                <div class="col" id="col-input">
                    {showcards(data, "group3")}
                </div>
            </div>

            <div class="row">
                <div class="col" id="col-input">
                    {showcards(data, "group4")}
                </div>
                <div class="col" id="col-input">
                    {showcards(data, "group5")}
                </div>
                <div class="col" id="col-input">
                    {showcards(data, "group6")}
                </div>
            </div>

            <div class="row">
                <div class="col" id="col-input">
                    {showcards(data, "group7")}
                </div>
                <div class="col" id="col-input">
                    {showcards(data, "group8")}
                </div>
                <div class="col" id="col-input">
                    {showcards(data, "group9")}
                </div>
            </div>

            <div class="row">
                <div class="col" id="col-input">
                    {showcards(data, "group10")}
                </div>
                <div class="col" id="col-abgabe">
                    <h3>Erfahre jetzt deine Persönlichkeit, um im Team zu arbeiten:</h3>
                    <button type="button" class="btn btn-primary" id="button-lg" onClick={() => getResult()}>Los gehts!</button>

                </div>
                <div class="col" id="col-abgabe">
                    <h3>Oder möchtest Du gleich deine Ergebnisse im Team vergleichen:</h3>
                    <button type="button" class="btn btn-primary" id="button-lg" onClick={() => getTeamResult()}>Los gehts!</button>

                </div>
            </div>

        </div>


    )

}

export default TestPage