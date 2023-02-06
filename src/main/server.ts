import express from 'express'

const SERVER_HOST = 'http://localhost'
const SERVER_PORT = 5050

const app = express()
app.listen(5050, () => console.log(`Server running at ${SERVER_HOST}:${SERVER_PORT}`))
