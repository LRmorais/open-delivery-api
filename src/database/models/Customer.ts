import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../sequelizeInstance';

interface CustomerAttributes {
    id: number;
    address_id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}

interface CustomerCreationAttributes extends Optional<CustomerAttributes, 'id' | 'deleted_at'> {}

class Customer extends Model<CustomerAttributes, CustomerCreationAttributes>
    implements CustomerAttributes {
    public id!: number;
    public address_id!: number;
    public name!: string;
    public created_at!: Date;
    public updated_at!: Date;
    public deleted_at?: Date;
}

Customer.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        address_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(191),
            allowNull: false,
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
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'customers',
        timestamps: false,
    }
);

export default Customer;
