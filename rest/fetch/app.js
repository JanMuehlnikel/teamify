const express = require('express');
const app = express();
const path = require('path');

let users = [
    {
        userID: "user1", prename: "Jan", name: "Mühlnikel", email: "jan.muehlnikel@gmx.de", password: "jan2001",
        team: "",
        groups:
        {
            group1: [{ color: "yellow", name: "Optimistisch", id: 2 }, { color: "red", name: "Selbstsicher", id: 1 }, { color: "blue", name: "Genau", id: 4 }, { color: "green", name: "Harmonisch", id: 3 }],
            group2: [{ color: "blue", name: "Nachdenken", id: 1 }, { color: "yellow", name: "Kontaktfreudig", id: 2 }, { color: "green", name: "Zuhörend", id: 4 }, { color: "red", name: "Wagemutig", id: 3 }],
            group3: [{ color: "green", name: "Geduldig", id: 1 }, { color: "yellow", name: "Spontan", id: 2 }, { color: "red", name: "Entscheidungsfreudig", id: 4 }, { color: "blue", name: "Kontrolliert", id: 3 }],
            group4: [{ color: "red", name: "Bestimmend", id: 1 }, { color: "blue", name: "Sorgfältig", id: 2 }, { color: "green", name: "Teamfähig", id: 4 }, { color: "yellow", name: "Begeistert", id: 3 }],
            group5: [{ color: "green", name: "Vertrauensvoll", id: 1 }, { color: "blue", name: "Analytisch", id: 2 }, { color: "yellow", name: "Beliebt", id: 4 }, { color: "red", name: "Kraftvoll", id: 3 }],
            group6: [{ color: "red", name: "Ergebnisorientiert", id: 1 }, { color: "green", name: "Beständig", id: 2 }, { color: "yellow", name: "Enthusiastisch", id: 4 }, { color: "blue", name: "Selbstdiszipliniert", id: 3 }],
            group7: [{ color: "yellow", name: "Positiv", id: 1 }, { color: "red", name: "Risikofreudig", id: 2 }, { color: "blue", name: "Zurückhaltend", id: 4 }, { color: "green", name: "Unterstützend", id: 3 }],
            group8: [{ color: "blue", name: "Kritisch", id: 1 }, { color: "yellow", name: "Impulsiv", id: 2 }, { color: "green", name: "Zuverlässig", id: 4 }, { color: "red", name: "Zielorientiert", id: 3 }],
            group9: [{ color: "yellow", name: "Gesellig", id: 1 }, { color: "green", name: "Unauffällig", id: 2 }, { color: "red", name: "Furchtlos", id: 4 }, { color: "blue", name: "Struckturiert", id: 3 }],
            group10: [{ color: "red", name: "Hardnäckig", id: 1 }, { color: "yellow", name: "Überzeugend", id: 2 }, { color: "blue", name: "Planend", id: 4 }, { color: "green", name: "Vermittelnd", id: 3 }],

        }
    },
    {
        userID: "user2", prename: "x", name: "y", email: "jan.muehlnikel@gmx.de", password: "jan2001",
        team: "team2",
        groups:
        {
            group1: [{ color: "yellow", name: "Optimistisch", id: 2 }, { color: "red", name: "Selbstsicher", id: 1 }, { color: "blue", name: "Genau", id: 4 }, { color: "green", name: "Harmonisch", id: 3 }],
            group2: [{ color: "blue", name: "Nachdenken", id: 1 }, { color: "yellow", name: "Kontaktfreudig", id: 2 }, { color: "green", name: "Zuhörend", id: 4 }, { color: "red", name: "Wagemutig", id: 3 }],
            group3: [{ color: "green", name: "Geduldig", id: 1 }, { color: "yellow", name: "Spontan", id: 2 }, { color: "red", name: "Entscheidungsfreudig", id: 4 }, { color: "blue", name: "Kontrolliert", id: 3 }],
            group4: [{ color: "red", name: "Bestimmend", id: 1 }, { color: "blue", name: "Sorgfältig", id: 2 }, { color: "green", name: "Teamfähig", id: 4 }, { color: "yellow", name: "Begeistert", id: 3 }],
            group5: [{ color: "green", name: "Vertrauensvoll", id: 1 }, { color: "blue", name: "Analytisch", id: 2 }, { color: "yellow", name: "Beliebt", id: 4 }, { color: "red", name: "Kraftvoll", id: 3 }],
            group6: [{ color: "red", name: "Ergebnisorientiert", id: 1 }, { color: "green", name: "Beständig", id: 2 }, { color: "yellow", name: "Enthusiastisch", id: 4 }, { color: "blue", name: "Selbstdiszipliniert", id: 3 }],
            group7: [{ color: "yellow", name: "Positiv", id: 1 }, { color: "red", name: "Risikofreudig", id: 2 }, { color: "blue", name: "Zurückhaltend", id: 4 }, { color: "green", name: "Unterstützend", id: 3 }],
            group8: [{ color: "blue", name: "Kritisch", id: 1 }, { color: "yellow", name: "Impulsiv", id: 2 }, { color: "green", name: "Zuverlässig", id: 4 }, { color: "red", name: "Zielorientiert", id: 3 }],
            group9: [{ color: "yellow", name: "Gesellig", id: 1 }, { color: "green", name: "Unauffällig", id: 2 }, { color: "red", name: "Furchtlos", id: 4 }, { color: "blue", name: "Struckturiert", id: 3 }],
            group10: [{ color: "red", name: "Hardnäckig", id: 1 }, { color: "yellow", name: "Überzeugend", id: 2 }, { color: "blue", name: "Planend", id: 4 }, { color: "green", name: "Vermittelnd", id: 3 }],

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
            group1: [{ color: "red", name: "Hartnäckig", id: 2 }, { color: "yellow", name: "Überzeugend", id: 1 }, { color: "blue", name: "Planend", id: 4 }, { color: "green", name: "Vermittelnd", id: 3 }],

        })
        res.status(200).json({ message: "success" })
    }
})

// POST LOGIN
app.post("/api/login", (req, res) => {
    try {
        userEmail = users.find(u => u.email == req.query.email)["email"]
        userPassword = users.find(u => u.password == req.query.password)["password"]
        userID = users.find(u => u.email == req.query.email)["userID"]

        res.send({ auth: userID })

    } catch (error) {
        console.error(error)
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

    let red = 0
    let yellow = 0
    let blue = 0
    let green = 0

    Object.keys(group_array).map((key, value) => {
        red = red + group_array[key].find(c => c.color == "red")["id"]
        yellow = yellow + group_array[key].find(c => c.color == "yellow")["id"]
        blue = blue + group_array[key].find(c => c.color == "blue")["id"]
        green = green + group_array[key].find(c => c.color == "green")["id"]

    })

    const result = { red: red, yellow: yellow, blue: blue, green: green }
    console.log(result)

    res.send(result)
});

// GET TEAMERGEBNIS

app.get('/api/user/getteamresult/:team', (req, res) => {

    let team_array = []
    users.map(user => {
        if (user.team == req.params.team) {

            const group_array = user["groups"]

            let red = 0
            let yellow = 0
            let blue = 0
            let green = 0

            Object.keys(group_array).map((key, value) => {
                red = red + group_array[key].find(c => c.color == "red")["id"]
                yellow = yellow + group_array[key].find(c => c.color == "yellow")["id"]
                blue = blue + group_array[key].find(c => c.color == "blue")["id"]
                green = green + group_array[key].find(c => c.color == "green")["id"]

            })

            const result = { red: red, yellow: yellow, blue: blue, green: green }

            var resultColor = Object.entries(result).sort((a,b)=>b[1]-a[1]).map(el=>el[0])

            team_array.push({ name: user.name, color: resultColor[0]})
            console.log(user.prename, resultColor)
        }
    })

    res.send(team_array)
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

module.exports = app;