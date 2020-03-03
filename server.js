const app = require('express')();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const clientHttpError = require('./utils/clientHttpError');

const routes = require('./routes');
require('dotenv').config();

const port = process.env.PORT || 3001;

(async function () {
  try {
    await mongoose.connect(process.env.MONGO_CONNECT_STRING, {
      useNewUrlParser: true,
    });

  } catch (e) {
    console.error(e);
  }

  app.use(bodyParser.json());
  app.use(routes);
  app.use(clientHttpError);

  app.listen(port, () => {
    console.log(`App listen on ${port}!`);
  });
})();
