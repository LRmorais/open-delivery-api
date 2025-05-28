# Loocal Open Delivery API

API de integração para o sistema Open Delivery da Loocal.

## 🚀 Tecnologias

- Node.js
- TypeScript
- Express
- Serverless Framework
- PostgreSQL
- Sequelize
- Swagger/OpenAPI

## 📋 Pré-requisitos

- Node.js (versão recomendada: 14.x ou superior)
- npm ou yarn
- PostgreSQL
- Conta AWS (para deploy)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd api-open_delivery-2025
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
JWT_SECRET=seu_jwt_secret
DATABASE_URL=sua_url_do_postgres
LOOCAL_API_URL=url_da_api_loocal
```

## 🚀 Executando o projeto

### Desenvolvimento Local
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Deploy
```bash
# Deploy para ambiente de desenvolvimento
npm run deploy:dev

# Deploy para ambiente de produção
npm run deploy:prd
```

## 📚 Documentação da API

A documentação completa da API está disponível via Swagger nos seguintes endpoints:

- Local: http://localhost:8080/api/docs
- Dev: https://b8763zoo2l.execute-api.us-east-1.amazonaws.com/dev/api/docs
- Prod: https://zr8i2xsbkg.execute-api.us-east-1.amazonaws.com/prd/api/docs

### Autenticação

A API utiliza autenticação JWT (Bearer Token). Para obter um token:

1. Gere credenciais:
```http
POST /auth/generate-credentials
Content-Type: application/json

{
    "company_id": "seu_company_id"
}
```

2. Obtenha o token:
```http
POST /auth/token
Content-Type: application/x-www-form-urlencoded

client_id=seu_client_id&client_secret=seu_client_secret&grant_type=client_credentials
```

### Endpoints Principais

#### Autenticação
- `POST /auth/token` - Gera token de acesso
- `POST /auth/generate-credentials` - Gera novas credenciais de integração

#### Pedidos
- Endpoints relacionados a pedidos (consultar documentação Swagger)

#### Eventos
- Endpoints para polling e acknowledgment de eventos (consultar documentação Swagger)

## 🔒 Segurança

- Autenticação via JWT
- Validação de credenciais
- Tokens com expiração de 1 hora
- Integração segura com a API Loocal

## 🛠️ Estrutura do Projeto

```
src/
├── docs/           # Documentação Swagger
├── enums/          # Enumerações
├── interfaces/     # Interfaces TypeScript
├── middleware/     # Middlewares
├── routes/         # Rotas da API
├── service/        # Serviços
├── utils/          # Utilitários
├── app.ts          # Configuração do Express
├── server.ts       # Servidor
└── swagger.ts      # Configuração do Swagger
```

## 📝 Licença

Este projeto está sob a licença ISC.

## 🤝 Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
