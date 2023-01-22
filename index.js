var express = require("express");
var app = express();
var port = 4000;

app.get( "/", async(rew, res) => {
    res.end(JSON.stringify({Name: "Jan", Country:"Deutschland", Hobby:"Fussball"}));
});

app.listen( port, () => {
    console.log("server running https://localhost:" + port);
    console.log("press CTRL+C to stop server");
});
