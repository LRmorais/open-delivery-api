import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from "./routes/index.route";

dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/authentication/', router);
app.get('/teste', (req, res) => {
    res.json({ message: 'Rota de teste funcionando!' });
});

export default app;
