import React from "react";
import "../css/TestPage.css"

function TestPage() {

    let group1 = [{ color: "red", name: "Hartnäckig", id: 2 }, { color: "yellow", name: "Überzeugend", id: 1 }, { color: "blue", name: "Planend", id: 4 }, { color: "green", name: "Vermittelnd", id: 3 }]

    function showcards(gruppe) {
        console.log(gruppe)
        return (
            gruppe.sort((a, b) => a.id > b.id ? -1 : 1).map(eigenschaft => {
                return (

                    <div class="row">
                        <div class="col" id="col-input">
                            <a id="a-input">{eigenschaft.id}. {eigenschaft.name}</a>
                        </div>
                        <div class="col" id="col-input">
                            <button type="button"  class="float-end" id="btn-updown">▲</button>
                            <button type="button"  class="float-end" id="btn-updown">▼</button>
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
            <div>
            </div>
            <div class="row">
                <div class="col" id="col-input">
                    {showcards(group1)}
                </div>
                <div class="col" id="col-input">
                    {showcards(group1)}
                </div>
                <div class="col" id="col-input">
                    {showcards(group1)}
                </div>
            </div>

        </div>
    )

}

export default TestPage