const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const isAuthentificated = require('./api/middlewares');

const auth = require('./api/routes/auth');
const users = require('./api/routes/users');

const PORT = 3000;

// Initialisation de Express 4
const app = express();

// Activation de CORS pour les CORS...
app.use(cors());
// Activation de Morgan pour les logs
app.use(morgan('tiny'));
// Activation du raw (json)
app.use(express.json());
// Activation de x-wwww-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/auth', auth);
app.use('/users', isAuthentificated, users);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
