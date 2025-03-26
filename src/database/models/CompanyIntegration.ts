import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

interface CompanyIntegrationAttributes {
    id: number;
    company_id: number;
    integration_type: string;
    client_id: string;
    client_secret: string;
    access_token?: string;
    token_type?: string;
    token_expires_at?: Date;
    created_at: Date;
    updated_at: Date;
}

interface CompanyIntegrationCreationAttributes
    extends Optional<
        CompanyIntegrationAttributes,
        'id' | 'access_token' | 'token_type' | 'token_expires_at'
    > {}

class CompanyIntegration
    extends Model<CompanyIntegrationAttributes, CompanyIntegrationCreationAttributes>
    implements CompanyIntegrationAttributes
{
    public id!: number;
    public company_id!: number;
    public integration_type!: string;
    public client_id!: string;
    public client_secret!: string;
    public access_token?: string;
    public token_type?: string;
    public token_expires_at?: Date;
    public created_at!: Date;
    public updated_at!: Date;
}

CompanyIntegration.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        company_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        integration_type: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: 'OPEN_DELIVERY',
        },
        client_id: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        client_secret: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        access_token: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        token_type: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        token_expires_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'company_integrations',
        timestamps: false,
    }
);

export default CompanyIntegration;
