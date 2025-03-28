import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
    client?: {
        client_id: string;
        company_id: number;
        integration_type: string;
    };
}
