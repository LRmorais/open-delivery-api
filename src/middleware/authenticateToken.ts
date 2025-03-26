import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { problem } from '../utils/responseHelper';

interface AuthenticatedRequest extends Request {
    client?: {
        client_id: string;
        company_id: number;
        integration_type: string;
    };
}

export const authenticateToken = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return problem(res, 'Token de autenticação não fornecido', 401);
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
        return problem(res, 'Token inválido ou expirado', 401);
    }
};
