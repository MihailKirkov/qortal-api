import dotenv from 'dotenv';
dotenv.config();  // Load environment variables
import express from 'express';
import bodyParser from 'body-parser';
import subscribeRoutes from './routes/subscribeRoutes.js';  // .js is important
import blurbRoutes from './routes/blurbRoutes.js';  // .js is important
// import { initializeFirebaseApp } from './config/firebaseConfig.js';


const app = express();
const PORT = process.env.PORT || 3000;
// initializeFirebaseApp();


app.use(bodyParser.json());

app.use('/api/subscribe', subscribeRoutes); // recieves {name, email}. saves user to db and sends an email with ebook link
app.use('/api/submit-blurb', blurbRoutes)

app.get('/', (req, res) => res.send('API is running! '));

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));
