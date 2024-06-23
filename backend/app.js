require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const models = require('./models/models');
const router = require('./routes/index');
const cors = require('cors');
const errorHandler = require('./middleware/ErrorHandling');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);

// Обработчик ошибок
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`server was started on port ${PORT}`));
    } catch(e) {
        console.log(e);
    }
};

start();