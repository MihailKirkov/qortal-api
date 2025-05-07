import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import subscribeRoutes from './routes/subscribeRoutes.js';  // .js is important
import blurbRoutes from './routes/blurbRoutes.js';  // .js is important

dotenv.config();  // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/subscribe', subscribeRoutes); // recieves {name, email}. saves user to db and sends an email with ebook link
app.use('/api/submit-blurb', blurbRoutes)

app.get('/', (req, res) => res.send('API is running! '));

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));
