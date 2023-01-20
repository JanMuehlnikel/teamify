import React, { useContext, useEffect, useState } from "react";
import useFetch from "react-fetch-hook";
import "./ErgebnisPage.css"
import { Logging, Navbool } from "../../context/context";
import { Authentification } from "../../context/context";
import { Navbar } from "react-bootstrap";

function ErgebnisPage() {

    const { loggedIn, setLoggedIn } = useContext(Logging)
    const { userID, setUserID } = useContext(Authentification)
    const { isLoading, data, error } = useFetch("http://localhost:8080/api/user/getresult/" + userID);
    const { alternateNav, setNav } = useContext(Navbool)

    setNav(false)

    if (isLoading) {
        return <div>IS loading</div>
    }

    if (error) {
        return <div>Fehler beim laden der Userdaten! Bitte starte den Rest Server</div>
    }

    function getResultColor(resultArray) {
        var resultColor = Object.entries(resultArray).sort((a, b) => b[1] - a[1]).map(el => el[0])

        return resultColor[0]
    }


    return (

            <div class="container">
                <div class="row">
                    <div class="col col-6" id="col-info-1">
                        <h3>Erklärung:</h3>
                        <p>Jeder Block mit jeweils vier Adjektiven gehört einer Farbe an. Die Zahlen, die Du
                            eingetragen hast, werden addiert und der Farbe zugeordnet. Nun wird dieser entsprechende Wert auf einer Skala in einem Netzdiagramm
                            visualisiert.</p>
                    </div>
                    <div class="col" id="col-info-2">
                        <h4>Bist Du dir unsicher? Wiederhole den Test</h4>
                    </div>
                </div>

                <div class="row">
                    <div class="col" id="col-ergebnis">
                        <div class="row">
                            <div class="col" id="col-red">
                                <h1>{data["rot"]}</h1>
                            </div>
                            <div class="col" id="col-yellow">
                                <h1>{data["gelb"]}</h1>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col" id="col-green">
                                <h1>{data["grün"]}</h1>
                            </div>
                            <div class="col" id="col-blue">
                                <h1>{data["blau"]}</h1>
                            </div>
                        </div>

                    </div>
                    <div class="col" id="col-input">
                        <h1>Was bedeutet das jetzt?</h1>
                        <div class="row">
                            Die Farbe {getResultColor(data)} ist bei dir besonders ausgeprägt.
                        </div>
                    </div>
                </div>
            </div>


    )

}

export default ErgebnisPage