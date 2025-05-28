import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../sequelizeInstance';

interface CityAttributes {
    id: number;
    state_id: number;
    name: string;
}

interface CityCreationAttributes extends Optional<CityAttributes, 'id'> {}

class City extends Model<CityAttributes, CityCreationAttributes> implements CityAttributes {
    public id!: number;
    public state_id!: number;
    public name!: string;
}

City.init(
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        state_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(191),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'cities',
        timestamps: false,
    }
);

export default City;
