import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

interface OrderAttributes {
    id: number;
    company_id: number;
    customer_id: number;
    order_status_id: number;
    payment_type_id: number;
    packet_type_id: number;
    amount: number;
    change: number;
    thermal_box?: boolean;
    get_sign?: boolean;
    cpf?: string;
    return?: boolean;
    distance?: number;
    delivery_cost?: number;
    local_fee?: number;
    scheduled?: Date;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
    dynamic_cost?: boolean;
}

interface OrderCreationAttributes extends Optional<
    OrderAttributes,
    'id' | 'thermal_box' | 'get_sign' | 'cpf' | 'return' | 'distance' |
    'delivery_cost' | 'local_fee' | 'scheduled' | 'deleted_at' | 'dynamic_cost'
> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
    public id!: number;
    public company_id!: number;
    public customer_id!: number;
    public order_status_id!: number;
    public payment_type_id!: number;
    public packet_type_id!: number;
    public amount!: number;
    public change!: number;
    public thermal_box?: boolean;
    public get_sign?: boolean;
    public cpf?: string;
    public return?: boolean;
    public distance?: number;
    public delivery_cost?: number;
    public local_fee?: number;
    public scheduled?: Date;
    public created_at!: Date;
    public updated_at!: Date;
    public deleted_at?: Date;
    public dynamic_cost?: boolean;
}

Order.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        company_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        customer_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        order_status_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        payment_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        packet_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        change: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },
        thermal_box: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        get_sign: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        cpf: {
            type: DataTypes.STRING(11),
            allowNull: true,
        },
        return: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        distance: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        delivery_cost: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            defaultValue: 0,
        },
        local_fee: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true,
            defaultValue: 0,
        },
        scheduled: {
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
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        dynamic_cost: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'orders',
        timestamps: false,
    }
);

export default Order;
