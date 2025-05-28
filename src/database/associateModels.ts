import Company from './models/Company';
import Customer from './models/Customer';
import Address from './models/Address';
import Order from "./models/Order";
import OrderStatus from "./models/OrderStatus";
import PaymentType from "./models/PaymentType";
import City from "./models/City";

export const associateModels = () => {
    Company.belongsTo(Address, { as: 'address', foreignKey: 'address_id' });
    Customer.belongsTo(Address, { as: 'address', foreignKey: 'address_id' });

    Address.hasMany(Company, { foreignKey: 'address_id' });
    Address.hasMany(Customer, { foreignKey: 'address_id' });

    Address.belongsTo(City, { foreignKey: 'city_id', as: 'city' });
    City.hasMany(Address, { foreignKey: 'city_id' });

    Order.belongsTo(Company, { foreignKey: 'company_id', as: 'company' });
    Order.belongsTo(Customer, { foreignKey: 'customer_id', as: 'customer' });

    Order.belongsTo(OrderStatus, { foreignKey: 'order_status_id', as: 'status' });
    OrderStatus.hasMany(Order, { foreignKey: 'order_status_id' });

    Order.belongsTo(PaymentType, {
        foreignKey: 'payment_type_id',
        as: 'payment_type',
    });

};
