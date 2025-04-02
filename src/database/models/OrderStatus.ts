import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../sequelizeInstance';

interface OrderStatusAttributes {
    id: number;
    name: string;
    step_order: number;
}

interface OrderStatusCreationAttributes extends Optional<OrderStatusAttributes, 'id'> {}

class OrderStatus extends Model<OrderStatusAttributes, OrderStatusCreationAttributes> implements OrderStatusAttributes {
    public id!: number;
    public name!: string;
    public step_order!: number;
}

OrderStatus.init(
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
        step_order: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            defaultValue: 0,
        }
    },
    {
        sequelize,
        tableName: 'order_status',
        timestamps: false,
    }
);

export default OrderStatus;
