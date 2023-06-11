const express = require('express');

const morgan = require('morgan');
const cors = require('cors');

const isAuthentificated = require('./api/middlewares');
const errorHandler = require('./api/middlewares/errorHandler');

const cron = require('node-cron');

// Routes
const auth = require('./api/routes/auth');
const users = require('./api/routes/users');
const birthdays = require('./api/routes/birthdays');
const status = require('./api/routes/status');

const PORT = 3000;

// Initialisation de Express 4
const app = express();

// Activation de CORS pour les CORS...
app.use(cors());
// Activation de Morgan pour les logs
app.use(morgan('tiny'));
// Activation du raw (json)

// Enabling the middleware to parse incoming requests with JSON payloads.
app.use(express.json());

//  Enablingnabling the middleware to parse incoming requests with urlencoded payloads.
app.use(express.urlencoded({ extended: true }));

cron.schedule('0 */1 * * *', () => {
  // Run the job every 1 hours
  processBirthdays();
});

// Routes
app.use('/auth', auth);
app.use('/status', isAuthentificated, status);
app.use('/users', isAuthentificated, users);
app.use('/birthdays', isAuthentificated, birthdays);

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
