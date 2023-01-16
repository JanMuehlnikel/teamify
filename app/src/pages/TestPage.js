import React, { useContext, useEffect, useState } from "react";
import "../css/TestPage.css"

function TestPage() {

    const [responseGroup, setGroup] = useState([])

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
            .then(function (res) { })
            .catch(function (res) { })
    }

    function getGroup(gruppe) {
        fetch("http://localhost:8080/api/users/getgroup?" +
            "userID=" + "user1" +
            "&gruppe=" + gruppe,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
            })
            .then(res => res.json())
            .then(res => {

                setGroup(res)
            })
            .catch(function (res) { console.log(res) })

        return responseGroup
    }


    function showcards(gruppe, searchedGroup) {
        return (
            gruppe.sort((a, b) => a.id > b.id ? -1 : 1).map(eigenschaft => {
                return (

                    <div class="row">
                        <div class="col" id="col-text">
                            <a id="a-input">{eigenschaft.id}.</a>
                        </div>
                        <div class="col" id="col-text">
                            <a id="a-input">{eigenschaft.name}</a>
                        </div>
                        <div class="col" id="col-text">
                            <button type="button" class="float-end" id="btn-updown" onClick={() => buttonUp(searchedGroup, eigenschaft.id)}>▲</button>
                            <button type="button" class="float-end" id="btn-updown">▼</button>
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
                    {showcards(getGroup("group1"), "group1")}
                </div>
                <div class="col" id="col-input">

                </div>
                <div class="col" id="col-input">

                </div>
            </div>

            <div class="row">
                <div class="col" id="col-input">

                </div>
                <div class="col" id="col-input">

                </div>
                <div class="col" id="col-input">

                </div>
            </div>

            <div class="row">
                <div class="col" id="col-input">

                </div>
                <div class="col" id="col-input">

                </div>
                <div class="col" id="col-input">

                </div>
            </div>

        </div>
    )

}

export default TestPage