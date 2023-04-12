const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');


const usersRouter = require('./routes/users');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger_output.json');
const swaggerOptions = { customCssUrl: '/swagger-ui.css'};

const app = express();
require('dotenv').config();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.get('/', (req, res) => { /*swagger.ignore = true */ res.redirect('/doc');});
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile,this.options));


if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Servidor rodadndo na porta ${PORT}`));
}

module.exports = app;




