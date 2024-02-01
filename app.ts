import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './src/routes/authRoutes';
import accountRoutes from './src/routes/accountRoutes';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/account', accountRoutes);

app.get('/', (req: Request, res: Response) => res.send('Hello, Helper API!'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});