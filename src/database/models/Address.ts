import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../sequelizeInstance';
import City from "./City";

interface AddressAttributes {
    id: number;
    city_id: number;
    address: string;
    number: string;
    complement?: string;
    neighborhood?: string;
    postal_code?: string;
    latitude?: number;
    longitude?: number;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

interface AddressCreationAttributes extends Optional<AddressAttributes, 'id' | 'complement' | 'neighborhood' | 'postal_code' | 'latitude' | 'longitude' | 'created_at' | 'updated_at' | 'deleted_at'> {}

class Address extends Model<AddressAttributes, AddressCreationAttributes> implements AddressAttributes {
    public id!: number;
    public city_id!: number;
    public address!: string;
    public number!: string;
    public complement?: string;
    public neighborhood?: string;
    public postal_code?: string;
    public latitude?: number;
    public longitude?: number;
    public created_at?: Date;
    public updated_at?: Date;
    public deleted_at?: Date;
    public city?: City;
}

Address.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        city_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(191),
            allowNull: false,
        },
        number: {
            type: DataTypes.STRING(191),
            allowNull: false,
        },
        complement: {
            type: DataTypes.STRING(191),
            allowNull: true,
        },
        neighborhood: {
            type: DataTypes.STRING(191),
            allowNull: true,
        },
        postal_code: {
            type: DataTypes.STRING(8),
            allowNull: true,
        },
        latitude: {
            type: DataTypes.DECIMAL(8, 6),
            allowNull: true,
        },
        longitude: {
            type: DataTypes.DECIMAL(9, 6),
            allowNull: true,
        },
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: 'addresses',
        timestamps: false,
    }
);

export default Address;
