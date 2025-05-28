import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { problem } from '../utils/responseHelper';
import {AuthenticatedRequest} from "../interfaces/AuthenticatedRequest";


export function authenticateToken(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): void {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
        problem(res, 'Token de autenticação não fornecido', 401);
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            client_id: string;
            company_id: number;
            integration_type: string;
        };

        req.client = decoded;
        next();
    } catch (err) {
        problem(res, 'Token inválido ou expirado', 401);
    }
}
