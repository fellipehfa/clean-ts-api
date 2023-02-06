import app from './config/app'

const SERVER_HOST = 'http://localhost'
const SERVER_PORT = 5050

app.listen(5050, () => console.log(`Server running at ${SERVER_HOST}:${SERVER_PORT}`))
