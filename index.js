require('dotenv').config({ path: __dirname + '/.env' })

const express = require('express')
const massive = require('massive')
const { SERVER_PORT, CONNECTION_STRING } = process.env
const products_controller = require('./controller')

const app = express()

app.use(express.json())

massive(CONNECTION_STRING)
    .then(db => {
        app.set('db', db)
        console.log('pulled data')
    // .catch(err => res.status(500).res.send(err))

        app.listen(SERVER_PORT, () => {
            console.log(`Server listening on port ${SERVER_PORT}`)
        })
    })

app.post('/api/products', products_controller.create);
app.get('/api/products', products_controller.getAll);
app.get('/api/products/:id', products_controller.getOne);
app.put('/api/products/:id', products_controller.update);
app.delete('/api/products/:id', products_controller.delete);

// app.listen(SERVER_PORT, () => {
//     console.log(`Server listening on port ${SERVER_PORT}` )
// })