import React, { useContext } from "react";
import useFetch from "react-fetch-hook";
import { useNavigate } from "react-router-dom";
import { Team } from "../../context/context";
import { Logging } from "../../context/context";
import { Authentification } from "../../context/context";
import "./TeamResultPage.css"

function TeamResultPage() {

    const { teamName, setTeam } = useContext(Team)
    const {loggedIn, setLoggedIn} = useContext(Logging)
    const {userID, setUserID} = useContext(Authentification)

    const navigate = useNavigate();

    const { isLoading, data, error } = useFetch("http://localhost:8080/api/user/getteamresult/" + teamName);

    if (isLoading) {
        return <div>IS loading</div>
    }

    if (error) {
        return <div>Fehler beim laden der Userdaten! Bitte starte den Rest Server</div>
    }

    function getAuspraegung(auspraegung) {
        return (
            data.map(user => {
                if (user.color == auspraegung) {
                    return (
                        <div class="col col-md-auto" id="col-name">

                            <h5>{user.prename} {user.name}</h5>
                        </div>


                    )
                }
            }))
    }

    return (

        <div class="container">
            <div class="row">
                <div class="col col-6" id="col-info-1">
                    <h2>Hier siehst Du, wie Du in das Team passt.</h2>
                </div>
                <div class="col" id="col-info-2">
                    <h3>TeamID: {teamName}</h3>
                </div>
            </div>

            <div class="row" id="row-r">
                <h2>Was bedeutet das jetzt?</h2>
                <div class="col" id="col-r">
                    <h2>Dein Diagramm zeigt, dass die
                        ??? Farbe besonders ausgeprägt
                        ist. </h2>
                </div>
                <div class="col" id="col-r">
                    <h3>Das Wort, dass Dich am besten
                        beschreibt ist: ???</h3>
                </div>
                <div class="col" id="col-r">
                    <h3>Deine Eigenschaften sind:
                        Analytisch, Reserviert, Präzise und
                        Systematisch</h3>
                </div>
                <div class="col" id="col-r">
                    <h3>Allerdings sind die anderen Farben
                        ebenfalls vorhanden, das sollte man
                        berücksichtigen. </h3>
                </div>
            </div>

            <div class="row" id="row-auspraegung">
                <h2>Rote Ausprägung</h2>
                {getAuspraegung("rot")}
            </div>
            <div class="row" id="row-auspraegung">
                <h2>Gelbe Ausprägung</h2>
                {getAuspraegung("gelb")}
            </div>
            <div class="row" id="row-auspraegung">
                <h2>Blaue Ausprägung</h2>
                {getAuspraegung("blau")}
            </div>
            <div class="row" id="row-auspraegung">
                <h2>Grüne Ausprägung</h2>
                {getAuspraegung("grün")}
            </div>
        </div>
    )

}

export default TeamResultPage