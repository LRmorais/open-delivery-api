import { Response } from 'express';

export const success = (res: Response, data: any, status = 200) => {
    return res.status(status).json(data);
};

export const error = (res: Response, message = 'Erro interno do servidor', status = 500) => {
    return res.status(status).json({
        error: true,
        message,
        status,
    });
};

export const problem = (res: Response, title: string, status: number) => {
    return res.status(status).type('application/problem+json').json({
        title,
        status,
    });
};
