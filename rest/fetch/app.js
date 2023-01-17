const express = require('express');
const app = express();
const path = require('path');

let users = [
    {
        userID: "user1", prename: "Jan", name: "Mühlnikel", email: "jan.muehlnikel@gmx.de", password: "jan2001",
        group1: [{ color: "red", name: "Hartnäckig", id: 2 }, { color: "yellow", name: "Überzeugend", id: 1 }, { color: "blue", name: "Planend", id: 4 }, { color: "green", name: "Vermittelnd", id: 3 }]
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
            group1: [{ color: "red", name: "Hartnäckig", id: 2 }, { color: "yellow", name: "Überzeugend", id: 1 }, { color: "blue", name: "Planend", id: 4 }, { color: "green", name: "Vermittelnd", id: 3 }]
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

// POST BUTTON UP
app.post("/api/users/buttonUP", (req, res) => {

    userID = req.query.userID
    gruppe = req.query.gruppe
    id = req.query.id
    id_upper = parseInt(id)+1

    const group_array = users.find(u => u.userID == userID)[gruppe]

    c_id = group_array.find(i => i.id == id)["color"]
    c_id2 = group_array.find(i => i.id == id_upper)["color"]

    group_array.find(c => c.color == c_id2)["id"] = parseInt(id)
    group_array.find(c => c.color == c_id)["id"] = parseInt(id_upper)

    console.log(group_array.find(i => i.id == parseInt(id)))
    console.log(group_array.find(i => i.id == parseInt(id_upper)))

    res.send(200)
})

// POST BUTTON UP
app.post("/api/users/buttonDown", (req, res) => {

    userID = req.query.userID
    gruppe = req.query.gruppe
    id = req.query.id
    id_upper = parseInt(id)-1

    const group_array = users.find(u => u.userID == userID)[gruppe]

    c_id = group_array.find(i => i.id == id)["color"]
    c_id2 = group_array.find(i => i.id == id_upper)["color"]

    group_array.find(c => c.color == c_id2)["id"] = parseInt(id)
    group_array.find(c => c.color == c_id)["id"] = parseInt(id_upper)

    console.log(group_array.find(i => i.id == parseInt(id)))
    console.log(group_array.find(i => i.id == parseInt(id_upper)))

    res.send(200)
})

// POST GET GROUP
app.post("/api/users/getgroup", (req, res) => {

    userID = req.query.userID
    gruppe = req.query.gruppe

    const group_array = users.find(u => u.userID == userID)[gruppe]

    res.send(group_array)
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
app.get('/api/user/group/:userID', (req, res) => {
    const item_array = users.find(u => u.userID == req.params.userID)

    res.json(item_array)
});
app.get('/api/user/plan/:userID', (req, res) => {
    const planner_array = users.find(u => u.userID == req.params.userID)["planner"]

    res.json(planner_array)
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

module.exports = app;