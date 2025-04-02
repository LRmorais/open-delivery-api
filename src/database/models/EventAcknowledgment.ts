import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../sequelizeInstance';
import {EventAcknowledgmentAttributes} from "../../interfaces/EventAcknowledgment";


interface EventAcknowledgmentCreationAttributes
    extends Optional<EventAcknowledgmentAttributes, 'acknowledged_at'> {}

class EventAcknowledgment
    extends Model<EventAcknowledgmentAttributes, EventAcknowledgmentCreationAttributes>
    implements EventAcknowledgmentAttributes
{
    public id!: string;
    public order_id!: number;
    public event_type!: string;
    public acknowledged_at?: Date;
    public client_id!: string;
    public company_id!: number;
}

EventAcknowledgment.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        order_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        event_type: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        acknowledged_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
        client_id: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        company_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'event_acknowledgments',
        timestamps: false,
    }
);

export default EventAcknowledgment;
