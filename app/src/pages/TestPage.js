import React from "react";
import "../css/TestPage.css"

function TestPage() {

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
                <div class="col col-6" id="col-info-1">
                </div>
                <div class="col" id="col-info-2">
                </div>
            </div>

        </div>
    )

}

export default TestPage