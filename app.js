require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const {logger} = require('./utils/logger');
const sequelize = require('./models/index');

const PORT = process.env.PORT || 3000

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use( (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', '*');
    next();
});

app.use('/api', routes);

logger.info("APP START ----------");
app.get('*', (req, res) => {
    logger.error(`APP INVALID ROUTE ${req.originalUrl}`)
    res.status(404).json({
        message:`APP INVALID ROUTE  ${req.originalUrl}`
    })
});

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        logger.info(`Server has been started on port ${PORT}`)
        console.log('Connection has been established successfully.');
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
    }
});