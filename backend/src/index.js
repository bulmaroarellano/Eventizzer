const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const db = require('./db/models');
const config = require('./config');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');

const menuRoutes = require('./routes/menu');

const ordersRoutes = require('./routes/orders');

const administratorRoutes = require('./routes/administrator');

const companiesRoutes = require('./routes/companies');

const customersRoutes = require('./routes/customers');

const employesRoutes = require('./routes/employes');

const eventsRoutes = require('./routes/events');

const usersRoutes = require('./routes/users');

const options = {
  definition: {
    openapi: "3.0.0",
      info: {
        version: "1.0.0",
        title: "myapp",
        description: "myapp Online REST API for Testing and Prototyping application. You can perform all major operations with your entities - create, delete and etc.",
      },
    servers: [
      {
        url: config.swaggerUrl,
        description: "Development server",
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      },
      responses: {
        UnauthorizedError: {
          description: "Access token is missing or invalid"
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use('/api-docs', function (req, res, next) {
    swaggerUI.host = req.get('host');
    next()
  }, swaggerUI.serve, swaggerUI.setup(specs))

app.use(cors({origin: true}));
require('./auth/auth');

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);

app.use('/api/menu', passport.authenticate('jwt', {session: false}), menuRoutes);

app.use('/api/orders', passport.authenticate('jwt', {session: false}), ordersRoutes);

app.use('/api/administrator', passport.authenticate('jwt', {session: false}), administratorRoutes);

app.use('/api/companies', passport.authenticate('jwt', {session: false}), companiesRoutes);

app.use('/api/customers', passport.authenticate('jwt', {session: false}), customersRoutes);

app.use('/api/employes', passport.authenticate('jwt', {session: false}), employesRoutes);

app.use('/api/events', passport.authenticate('jwt', {session: false}), eventsRoutes);

app.use('/api/users', passport.authenticate('jwt', {session: false}), usersRoutes);

const publicDir = path.join(
  __dirname,
  '../public',
);

if (fs.existsSync(publicDir)) {
  app.use('/', express.static(publicDir));

  app.get('*', function(request, response) {
    response.sendFile(
      path.resolve(publicDir, 'index.html'),
    );
  });
}

const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

module.exports = app;
