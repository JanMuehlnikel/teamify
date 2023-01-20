import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./LandingPage.css"

import pic_testvorschau from "./test_vorschau.png"
import pic_sicher from "./sicher.png"

function LandingPage() {

    return (
        <div className="main">
            <div class="container-fluid" id="con-head">
                <div class="row">
                    <div class="col">
                        <h1 class="t1">Das perfekte Team gibt es nicht?<br /> Falsch!</h1>

                        <h2 class="t2">Durch unsere intelligenten Tools finden wir Ihr
                            perfektes Team, das genau auf ihre Bedürfnisse
                            angepasst ist.</h2>

                        <button type="submit" class="btn btn-light btn-primary" id="btn-login">Jetzt das perfekte Team finden</button>
                    </div>
                </div>
            </div>
            <div class="row row-c1 justify-content-center">
                <div class="card">
                    <img class="card-img-top" src="https://media.istockphoto.com/id/1322842973/photo/diverse-business-people-putting-their-hands-together-in-cirle.jpg?s=612x612&w=0&k=20&c=9BAYCv8tAsgYPQdTsFxLzLJsmt6tGYE5Etwd63OccxQ=" alt="Card image cap" />
                    <div class="card-body">
                        <h5 class="card-title">Direkter Vergleich</h5>
                        <p class="card-text">Sie können Ihr Ergebnis direkt mit Ihren
                            Teamkollegen vergleichen und somit das
                            perfekte Team finden.</p>
                    </div>
                </div>
                <div class="card">
                    <img class="card-img-top" src="https://media.istockphoto.com/id/1322842973/photo/diverse-business-people-putting-their-hands-together-in-cirle.jpg?s=612x612&w=0&k=20&c=9BAYCv8tAsgYPQdTsFxLzLJsmt6tGYE5Etwd63OccxQ=" alt="Card image cap" />
                    <div class="card-body">
                        <h5 class="card-title">Direktes Ergebnis</h5>
                        <p class="card-text">Unsere Software wird Ihnen sofort ein
                            Ergebnis präsentieren, dass Ihnen sofort
                            einen Mehrwert bietet.</p>
                    </div>
                </div>
                <div class="card">
                    <img class="card-img-top" src="https://media.istockphoto.com/id/1322842973/photo/diverse-business-people-putting-their-hands-together-in-cirle.jpg?s=612x612&w=0&k=20&c=9BAYCv8tAsgYPQdTsFxLzLJsmt6tGYE5Etwd63OccxQ=" alt="Card image cap" />
                    <div class="card-body">
                        <h5 class="card-title">Direkter Vergleich</h5>
                        <p class="card-text">Der Test kann jederzeit wiederholt
                            werden, wenn Sie sich bei einigen
                            Angaben unsicher sind..</p>
                    </div>
                </div>
            </div>
            <hr />
            <div class="row row-c1 justify-content-center">
                <div class="row justify-content-center">
                    <div class="col col-6 col-info1">
                        <h2 class="txt2">Ausschnitt aus dem Test</h2>
                        <div class="row">
                            <div class="col pic2">
                                <img src={pic_testvorschau} height="auto" width="auto"></img>
                            </div>
                            <div class="col des2">
                                <h3 class="des2">
                                    Der Test ist in mehrere
                                    Blöcke eingeteilt, die Sie
                                    hierarchisch sortieren
                                    können, wobei die Ziffern zu
                                    vergebene Punkte sind.
                                    Am Ende ergibt sich aus den
                                    Ziffern eine Summe aus der
                                    ein Diagramm abgeleitet
                                    werden kann.
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div class="col col-info2">
                        <h2 class="txt2">Vergleiche Deine Ergebnisse mit Deinem Team.</h2>
                    </div>
                </div>
            </div>
            <hr />
            <div class="row row-c1 justify-content-center">
                <div class="col col-info1">
                    <div class="row">
                        <div class="col col-ses col-info1">
                            <div class="col col-ses">
                                <h1 className="txt-ses">
                                    Schnell.<br />
                                    Einfach.<br />
                                    Sicher.
                                </h1>
                            </div>
                        </div>
                        <div class="col">
                            <img src={pic_sicher} height="auto" width="auto"></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LandingPage