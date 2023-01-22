import React, { useContext } from "react";
import { Toast } from "react-bootstrap";
import useFetch from "react-fetch-hook";
import { useNavigate } from "react-router-dom";
import { ADRESS, Navbool, Team } from "../../context/context";
import { Logging } from "../../context/context";
import { Authentification } from "../../context/context";
import "./TeamResultPage.css"

function TeamResultPage() {

    const { alternateNav, setNav } = useContext(Navbool)

    setNav(false)

    const { teamName, setTeam } = useContext(Team)
    const { loggedIn, setLoggedIn } = useContext(Logging)
    const { userID, setUserID } = useContext(Authentification)

    const navigate = useNavigate();

    const { isLoading, data, error } = useFetch(ADRESS + "/api/user/getteamresult/" + teamName);

    if (isLoading) {
        return <div>IS loading</div>
    }

    if (error) {
        return <h1>Fehler beim laden der Userdaten. Bitte starte den React Server oder melde dich an!</h1>
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

        <div class="container-fluid">
            <div class="row">
                <div class="col" id="col-info-1">
                    <h2>Hier siehst du, wie du in das Team passt.</h2>
                </div>
                <div class="col" id="col-info-2">
                    <h2>TeamID: <b>{teamName}</b></h2>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="row" id="row-auspraegung">
                        <h2>Rote Ausprägung - Dominant:</h2>
                        {getAuspraegung("rot")}
                    </div>
                </div>
                <div class="col">
                    <div class="row" id="row-auspraegung">
                        <h2>Gelbe Ausprägung - Initiativ:</h2>
                        {getAuspraegung("gelb")}
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="row" id="row-auspraegung">
                        <h2>Blaue Ausprägung - Gewissenhaft:</h2>
                        {getAuspraegung("blau")}
                    </div>
                </div>
                <div class="col">
                    <div class="row" id="row-auspraegung">
                        <h2>Grüne Ausprägung - Stetig:</h2>
                        {getAuspraegung("grün")}

                    </div>
                </div>
            </div>
        </div>
    )

}

export default TeamResultPage