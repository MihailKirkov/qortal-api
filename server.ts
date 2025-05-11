import dotenv from 'dotenv';
dotenv.config();
import express, {Express, Request, Response} from 'express';
import bodyParser from 'body-parser';
import subscribeRoutes from './routes/subscribeRoutes';
import blurbRoutes from './routes/blurbRoutes'; 
import { handleGetAllBlurbs } from './controllers/blurbController';
import { authenticateWithToken } from './middleware/authMiddleware';

const app: Express = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());

app.use('/api/subscribe', subscribeRoutes);
app.use('/api/submit-blurb', blurbRoutes)
app.get('/api/get-blurbs', authenticateWithToken, handleGetAllBlurbs);

app.get('/', (req: Request, res: Response) => {
    res.send('API is running! ')
});

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));
