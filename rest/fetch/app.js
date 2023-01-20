const express = require('express');
const app = express();
const path = require('path');
const { send } = require('process');

let users = [
    {
        userID: "user1", prename: "Jan", name: "Mühlnikel", email: "jan.muehlnikel@gmx.de", password: "jan2001",
        team: "",
        groups:
        {
            group1: [{ color: "gelb", name: "Optimistisch", id: 2 }, { color: "rot", name: "Selbstsicher", id: 1 }, { color: "blau", name: "Genau", id: 4 }, { color: "grün", name: "Harmonisch", id: 3 }],
            group2: [{ color: "blau", name: "Nachdenken", id: 1 }, { color: "gelb", name: "Kontaktfreudig", id: 2 }, { color: "grün", name: "Zuhörend", id: 4 }, { color: "rot", name: "Wagemutig", id: 3 }],
            group3: [{ color: "grün", name: "Geduldig", id: 1 }, { color: "gelb", name: "Spontan", id: 2 }, { color: "rot", name: "Entscheidungsfreudig", id: 4 }, { color: "blau", name: "Kontrolliert", id: 3 }],
            group4: [{ color: "rot", name: "Bestimmend", id: 1 }, { color: "blau", name: "Sorgfältig", id: 2 }, { color: "grün", name: "Teamfähig", id: 4 }, { color: "gelb", name: "Begeistert", id: 3 }],
            group5: [{ color: "grün", name: "Vertrauensvoll", id: 1 }, { color: "blau", name: "Analytisch", id: 2 }, { color: "gelb", name: "Beliebt", id: 4 }, { color: "rot", name: "Kraftvoll", id: 3 }],
            group6: [{ color: "rot", name: "Ergebnisorientiert", id: 1 }, { color: "grün", name: "Beständig", id: 2 }, { color: "gelb", name: "Enthusiastisch", id: 4 }, { color: "blau", name: "Selbstdiszipliniert", id: 3 }],
            group7: [{ color: "gelb", name: "Positiv", id: 1 }, { color: "rot", name: "Risikofreudig", id: 2 }, { color: "blau", name: "Zurückhaltend", id: 4 }, { color: "grün", name: "Unterstützend", id: 3 }],
            group8: [{ color: "blau", name: "Kritisch", id: 1 }, { color: "gelb", name: "Impulsiv", id: 2 }, { color: "grün", name: "Zuverlässig", id: 4 }, { color: "rot", name: "Zielorientiert", id: 3 }],
            group9: [{ color: "gelb", name: "Gesellig", id: 1 }, { color: "grün", name: "Unauffällig", id: 2 }, { color: "rot", name: "Furchtlos", id: 4 }, { color: "blau", name: "Struckturiert", id: 3 }],
            group10: [{ color: "rot", name: "Hardnäckig", id: 1 }, { color: "gelb", name: "Überzeugend", id: 2 }, { color: "blau", name: "Planend", id: 4 }, { color: "grün", name: "Vermittelnd", id: 3 }],

        }
    },
    {
        userID: "user2", prename: "Max", name: "Mustermann", email: "max.mustermann@mail.de", password: "jan2001",
        team: "team2",
        groups:
        {
        

        }
    },

]

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    next();
});

// POST REGISTER
app.post("/api/register", (req, res) => {
    let existendEmail = false

    // check if email exists in users array
    for (var i = 0; i < users.length; i++) {
        if (users[i]['email'] == req.query.email) {
            existendEmail = true
        }
    }
    if (existendEmail) {
        res.send({ message: "Diese Email Adresse existiert bereits!" })
    } else {
        // push new user in users
        users.push({
            userID: req.query.userID,
            prename: req.query.prename,
            name: req.query.name,
            email: req.query.email,
            password: req.query.password,
            team: "",
            groups:
            {
                group1: [{ color: "gelb", name: "Optimistisch", id: 2 }, { color: "rot", name: "Selbstsicher", id: 1 }, { color: "blau", name: "Genau", id: 4 }, { color: "grün", name: "Harmonisch", id: 3 }],
                group2: [{ color: "blau", name: "Nachdenken", id: 1 }, { color: "gelb", name: "Kontaktfreudig", id: 2 }, { color: "grün", name: "Zuhörend", id: 4 }, { color: "rot", name: "Wagemutig", id: 3 }],
                group3: [{ color: "grün", name: "Geduldig", id: 1 }, { color: "gelb", name: "Spontan", id: 2 }, { color: "rot", name: "Entscheidungsfreudig", id: 4 }, { color: "blau", name: "Kontrolliert", id: 3 }],
                group4: [{ color: "rot", name: "Bestimmend", id: 1 }, { color: "blau", name: "Sorgfältig", id: 2 }, { color: "grün", name: "Teamfähig", id: 4 }, { color: "gelb", name: "Begeistert", id: 3 }],
                group5: [{ color: "grün", name: "Vertrauensvoll", id: 1 }, { color: "blau", name: "Analytisch", id: 2 }, { color: "gelb", name: "Beliebt", id: 4 }, { color: "rot", name: "Kraftvoll", id: 3 }],
                group6: [{ color: "rot", name: "Ergebnisorientiert", id: 1 }, { color: "grün", name: "Beständig", id: 2 }, { color: "gelb", name: "Enthusiastisch", id: 4 }, { color: "blau", name: "Selbstdiszipliniert", id: 3 }],
                group7: [{ color: "gelb", name: "Positiv", id: 1 }, { color: "rot", name: "Risikofreudig", id: 2 }, { color: "blau", name: "Zurückhaltend", id: 4 }, { color: "grün", name: "Unterstützend", id: 3 }],
                group8: [{ color: "blau", name: "Kritisch", id: 1 }, { color: "gelb", name: "Impulsiv", id: 2 }, { color: "grün", name: "Zuverlässig", id: 4 }, { color: "rot", name: "Zielorientiert", id: 3 }],
                group9: [{ color: "gelb", name: "Gesellig", id: 1 }, { color: "grün", name: "Unauffällig", id: 2 }, { color: "rot", name: "Furchtlos", id: 4 }, { color: "blau", name: "Struckturiert", id: 3 }],
                group10: [{ color: "rot", name: "Hardnäckig", id: 1 }, { color: "gelb", name: "Überzeugend", id: 2 }, { color: "blau", name: "Planend", id: 4 }, { color: "grün", name: "Vermittelnd", id: 3 }],
    
            }

        })
        res.status(200).json({ message: "success" })
    }
})

// POST LOGIN
app.post("/api/login", (req, res) => {
    console.log("login")

    let existsAccount = false

    // check if email exists in users array
    for (var i = 0; i < users.length; i++) {
        if (users[i]['email'] == req.query.email && users[i]['password'] === req.query.password) {
            existsAccount = true
            break
        }
    }

    if (existsAccount) {

        try {
            userID = users.find(u => u.email == req.query.email)["userID"]
            team_id = users.find(u => u.team == req.query.team)
            prename = users.find(u => u.userID == userID)["prename"]
            lastname = users.find(u => u.userID == userID)["name"]

            fullname = prename + " " + lastname   

            res.send({ auth: userID, team: team_id, name: fullname})

        } catch (error) {
            console.log("error")
            res.send({ auth: "error" })
        }
    }else{
        res.send({ auth: "error" })
    }
    
})

// POST Team
app.post("/api/users/team", (req, res) => {
    userID = req.query.userID
    team = req.query.team

    if (team != "") {

        users.find(u => u.userID == userID)["team"] = team

        res.send(200)
    } else {
        res.send(400)
    }
})

// POST BUTTON UP
app.post("/api/users/buttonUP", (req, res) => {

    userID = req.query.userID
    gruppe = req.query.gruppe
    id = req.query.id
    id_upper = parseInt(id) + 1

    const group_array = users.find(u => u.userID == userID)["groups"][gruppe]

    c_id = group_array.find(i => i.id == id)["color"]
    c_id2 = group_array.find(i => i.id == id_upper)["color"]

    group_array.find(c => c.color == c_id2)["id"] = parseInt(id)
    group_array.find(c => c.color == c_id)["id"] = parseInt(id_upper)

    res.send(200)
})

// POST BUTTON Down
app.post("/api/users/buttonDown", (req, res) => {

    userID = req.query.userID
    gruppe = req.query.gruppe
    id = req.query.id
    id_upper = parseInt(id) - 1

    const group_array = users.find(u => u.userID == userID)["groups"][gruppe]

    c_id = group_array.find(i => i.id == id)["color"]
    c_id2 = group_array.find(i => i.id == id_upper)["color"]

    group_array.find(c => c.color == c_id2)["id"] = parseInt(id)
    group_array.find(c => c.color == c_id)["id"] = parseInt(id_upper)

    res.send(200)
})


// DELETE ITEM
app.delete('/api/users/items/:UserIDItemID', (req, res) => {
    const { UserIDItemID } = req.params

    userID = UserIDItemID.split("@")[0]
    itemID = UserIDItemID.split("@")[1]

    // check if item is in array
    const item_array = users.find(u => u.userID == userID)["items"]
    const deleted = item_array.find(i => i.itemID == itemID)

    if (deleted) {
        // filter out the deleted id and create new array without the id
        users.find(u => u.userID == userID)['items'] = item_array.filter(i => i.itemID != itemID)
        res.status(200).json(deleted)
    } else {
        res.status(404).json({ message: + " ID" + itemID + " was not found!" })
    }
})

// GET
app.get('/api/users', (req, res) => res.json(users));
app.get('/api/user/:userID', (req, res) => {
    const item_array = users.find(u => u.userID == req.params.userID)

    res.json(item_array)
});

// Get Group
app.get('/api/user/getgroup/:userID', (req, res) => {

    const group_array = users.find(u => u.userID == req.params.userID)["groups"]

    res.send(group_array)
});

// Get Result
app.get('/api/user/getresult/:userID', (req, res) => {

    const group_array = users.find(u => u.userID == req.params.userID)["groups"]

    let rot = 0
    let gelb = 0
    let blau = 0
    let grün = 0

    Object.keys(group_array).map((key, value) => {
        rot = rot + group_array[key].find(c => c.color == "rot")["id"]
        gelb = gelb + group_array[key].find(c => c.color == "gelb")["id"]
        blau = blau + group_array[key].find(c => c.color == "blau")["id"]
        grün = grün + group_array[key].find(c => c.color == "grün")["id"]

    })

    const result = { rot: rot, gelb: gelb, blau: blau, grün: grün }
    console.log(result)

    res.send(result)
});

// GET TEAMERGEBNIS

app.get('/api/user/getteamresult/:team', (req, res) => {

    let team_array = []
    users.map(user => {
        if (user.team == req.params.team) {

            const group_array = user["groups"]

            let rot = 0
            let gelb = 0
            let blau = 0
            let grün = 0

            Object.keys(group_array).map((key, value) => {
                rot = rot + group_array[key].find(c => c.color == "rot")["id"]
                gelb = gelb + group_array[key].find(c => c.color == "gelb")["id"]
                blau = blau + group_array[key].find(c => c.color == "blau")["id"]
                grün = grün + group_array[key].find(c => c.color == "grün")["id"]

            })

            const result = { rot: rot, gelb: gelb, blau: blau, grün: grün }

            var resultColor = Object.entries(result).sort((a,b)=>b[1]-a[1]).map(el=>el[0])

            team_array.push({ prename: user.prename, name: user.name, color: resultColor[0]})
            console.log(user.prename, resultColor)
        }
    })

    res.send(team_array)
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

module.exports = app;