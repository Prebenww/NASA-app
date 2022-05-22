const http = require('http');
const mongoose = require('mongoose');

require('dotenv').config();

const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;

const MONGO_URL = 'mongodb+srv://nasa-api:antidoteX123@cluster0.73lym.mongodb.net/nasa?retryWrites=true&w=majority'

const server = http.createServer(app);

async function startServer() {

    mongoose.connection.once('open', () => {
        console.log('MongoDB connection ready!')
    })

    mongoose.connection.on('error', (err) => {
        console.error(err);
    })

    await mongoose.connect(MONGO_URL);

    await loadPlanetsData();


    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
}

startServer()






