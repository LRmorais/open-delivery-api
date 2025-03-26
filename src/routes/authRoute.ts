import {Router} from "express";
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import CompanyIntegration from "../database/models/CompanyIntegration";
import { success, error, problem } from '../utils/responseHelper';

const router = Router();

router.post('/token', async (req, res) => {
    try {
        const contentType = req.headers['content-type'];
        if (!contentType?.includes('application/x-www-form-urlencoded')) {
            problem(res, 'Content-Type deve ser application/x-www-form-urlencoded', 400);
            return
        }

        const { client_id, client_secret, grant_type } = req.body;

        if (!client_id || !client_secret || !grant_type) {
            problem(res, 'client_id, client_secret e grant_type são obrigatórios', 400);
            return
        }

        if (grant_type !== 'client_credentials') {
            problem(res, 'grant_type inválido. Use "client_credentials"', 400);
            return
        }

        const integration = await CompanyIntegration.findOne({
            where: {
                client_id,
                client_secret,
                integration_type: 'OPEN_DELIVERY',
            },
        });

        if (!integration) {
            problem(res, 'Credenciais inválidas', 401);
            return
        }

        const expiresIn = 3600;

        const token = jwt.sign(
            {
                client_id: integration.client_id,
                company_id: integration.company_id,
                integration_type: integration.integration_type,
            },
            process.env.JWT_SECRET as string,
            { expiresIn }
        );

        integration.access_token = token;
        integration.token_type = 'bearer';
        integration.token_expires_at = new Date(Date.now() + expiresIn * 1000);
        integration.updated_at = new Date();
        await integration.save();

        success(res, {
            access_token: token,
            token_type: 'bearer',
            expires_in: expiresIn,
        });
        return
    } catch (err) {
        console.error('Erro ao gerar token:', err);
        problem(res, 'Serviço temporariamente indisponível', 503);
        return
    }
});

router.post('/generate-credentials', async (req, res) => {
    try {
        const { company_id } = req.body;

        if (!company_id) {
            res.status(400).json({ error: 'company_id é obrigatório' });
            return
        }

        const client_id = uuidv4();
        const client_secret = randomBytes(32).toString('hex');

        const integration = await CompanyIntegration.create({
            company_id,
            integration_type: 'OPEN_DELIVERY',
            client_id,
            client_secret,
            created_at: new Date(),
            updated_at: new Date(),
        });

         res.status(201).json({
            id: integration.id,
            company_id: integration.company_id,
            client_id: integration.client_id,
            client_secret: integration.client_secret,
        });
        return
    } catch (error) {
        console.error('Erro ao gerar credenciais:', error);
        res.status(500).json({ error: 'Erro interno ao gerar credenciais' });
        return
    }
});

export default router;
