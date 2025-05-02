require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const subscribeRoute = require('./routes/subscribe');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/subscribe', subscribeRoute);

app.get('/', (req, res) => res.send('API is running! '));

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));
