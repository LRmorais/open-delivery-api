import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../sequelizeInstance';

interface PaymentTypeAttributes {
    id: number;
    name: string;
}

interface PaymentTypeCreationAttributes extends Optional<PaymentTypeAttributes, 'id'> {}

class PaymentType extends Model<PaymentTypeAttributes, PaymentTypeCreationAttributes> implements PaymentTypeAttributes {
    public id!: number;
    public name!: string;
}

PaymentType.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(191),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'payment_types',
        timestamps: false,
    }
);

export default PaymentType;
