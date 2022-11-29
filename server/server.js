const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
const Database = require('./Database')
const db = new Database()

app.post('/notes', (req, res) => {

    const body = req.body
    console.log("body : ", body)
    db.addNote(body).then(doc => {
        res.send(doc)
    }).catch(err => {
        res.status(500).send(err)
    })


})

app.get('/notes', (req, res) => {
    db.getNotes().then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send(err)
    })
})

app.get('/note/:id', (req, res) => {
    const {id} = req.params
    db.getNoteById(id).then(data => {
        if (!data) {
            res.status(404).send('there is no note with this id : ', id)
        } else {
            res.send(data)
        }

    }).catch(err => {
        res.status(500).send(err)
    })
})

const port = 3000
app.listen(port, () => {
    console.log(`the server has started on port : ${port}`)
    db.connect()
})