import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from "./routes/index.route";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';

dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', router);
app.get('/teste', (req, res) => {
    res.json({ message: 'Rota de teste funcionando!' });
});

export default app;
