import React, { useContext, useEffect, useState } from "react";
import useFetch from "react-fetch-hook";
import "./ErgebnisPage.css"
import { Logging, Navbool } from "../../context/context";
import { Authentification } from "../../context/context";
import { useNavigate } from "react-router-dom";
import { ADRESS } from "../../context/context";

function ErgebnisPage() {

    const { loggedIn, setLoggedIn } = useContext(Logging)
    const { userID, setUserID } = useContext(Authentification)
    
    const { isLoading, data, error } = useFetch(ADRESS + "/api/user/getresult/" + userID);

    const { alternateNav, setNav } = useContext(Navbool)

    setNav(false)

    const navigate = useNavigate();

    if (isLoading) {
        return <h2>Loading ...</h2>
    }

    if (error) {
        return <h2>Loading ... If the process takes too long please try to refresh the page!</h2>
    }

    function getResultColor(resultArray) {
        var resultColor = Object.entries(resultArray).sort((a, b) => b[1] - a[1]).map(el => el[0])

        return resultColor[0]
    }

    function getWord(color) {
        if ((color == "rot")) {
            return "Dominant"
        }
        if ((color == "gelb")) {
            return "Initiativ"
        }
        if ((color == "blau")) {
            return "Gewissenhaft"
        }
        if ((color == "grün")) {
            return "Stetig"
        }
    }

    function getEigenschaften(color) {
        if ((color == "rot")) {
            return ["- Tendiert dazu einen starken Willen zu zeigen", "- Gibt nicht nach", "- Bevorzugt es eigene Regeln aufzustellen"]
        }
        if ((color == "gelb")) {
            return ["- Mag es bekannt zu sein und viele Freunde zu haben", "- Ist normalerweise fröhlich", "- Es fällt ihm/ihr leicht Gefühle auszudrücken"]
        }
        if ((color == "blau")) {
            return ["- Möchte Dinge genaustens tun", "- Verlässlich für andere", "- Hat das Gefühl, dass andere nicht im gleichen Maße um Qualität bemüht sind"]
        }
        if ((color == "grün")) {
            return ["- Möchte zum Wohl anderer handlen", "- Ist ein guter Zuhörer und sehr sensibel für Menschen im eigenen Umfeld", "- Bevorzugt es mit den Menschen gut auszukommen, statt mit ihnen zu diskutieren"]
        }
    }

    if (!loggedIn) {
        return (
            navigate("/notloggedin")
        )
    } else {

        return (

            <div class="container-fluid">
                <div class="row">
                    <div class="col" id="col-info-1">
                        <h3>Erklärung:</h3>
                        <p>Jeder Block mit jeweils vier Adjektiven gehört einer Farbe an. Die Zahlen, die Du
                            eingetragen hast, werden addiert und der Farbe zugeordnet. Nun wird dieser entsprechende Wert auf einer Skala in einem Netzdiagramm
                            visualisiert.</p>
                    </div>
                    <div class="col justify-content-center" id="col-info-2">
                        <div class="col justify-content-center">
                            <h2>Bist Du dir unsicher? <br />Wiederhole den Test!</h2>
                        </div>
                        <div class="col justify-content-center">
                            <button type="submit" class="btn btn-light btn-primary" id="btn-wiederholen" onClick={() => navigate("/test")}>Test Wiederholen</button>
                        </div>
                    </div>
                </div>

                <div class="row row-ergebnis">
                    <div class="col" id="col-ergebnis">
                        <h2>Dein persönliches Ergebnis:</h2>
                        <div class="row">
                            <div class="col" id="col-red">
                                <h2>Dominant</h2>
                                <h1>{data["rot"]}</h1>
                            </div>
                            <div class="col" id="col-yellow">
                                <h2>Initiativ</h2>
                                <h1>{data["gelb"]}</h1>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col" id="col-green">
                                <h2>Stetig</h2>
                                <h1>{data["grün"]}</h1>
                            </div>
                            <div class="col" id="col-blue">
                                <h2>Gewissenhaft</h2>
                                <h1>{data["blau"]}</h1>
                            </div>
                        </div>

                    </div>
                    <div class="col" id="col-bedeutung">
                        <h2>Was bedeutet das jetzt?</h2>
                        <div class="row">
                            <div class="col col-txt1">
                                <h3>Das Ergebnis zeigt dass die Farbe <b>{getResultColor(data)}</b> bei dir besonders ausgeprägt ist.</h3>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-txt1">
                                <h3>Das Wort, dass dich am beste beschreibt ist: <b>{getWord(getResultColor(data))}</b></h3>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-txt1">
                                <h3>Eigneschaften von dir sind unter anderem:
                                    <br /> {getEigenschaften(getResultColor(data))[0]}
                                    <br /> {getEigenschaften(getResultColor(data))[1]}
                                    <br /> {getEigenschaften(getResultColor(data))[2]}</h3>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-txt1">
                                <h3>Allerdings sind die anderen Farben ebenfalls ausgeprägt und sollten berücksichtigt werden.</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div >


        )
    }

}

export default ErgebnisPage