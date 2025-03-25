import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Loocal Open Delivery API',
        version: '1.0.0',
        description: 'Documentação inicial da integração Open Delivery',
    },
    servers: [
        {
            url: 'http://localhost:3000/api',
            description: 'Servidor local',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['src/routes/**/*.ts'], // rotas com anotações JSDoc
};

export const swaggerSpec = swaggerJSDoc(options);
