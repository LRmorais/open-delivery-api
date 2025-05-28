import { sequelize } from './sequelizeInstance';
import './loadModels';
import {associateModels} from "./associateModels";

associateModels();

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexão com o banco de dados foi bem-sucedida!');
    } catch (error) {
        console.error('❌ Erro ao conectar ao banco de dados:', error);
    }
};

export { sequelize, testConnection };
