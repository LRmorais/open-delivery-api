import Company from './models/Company';
import Customer from './models/Customer';
import Address from './models/Address';
import Order from "./models/Order";

export const associateModels = () => {
    Company.belongsTo(Address, { as: 'address', foreignKey: 'address_id' });
    Customer.belongsTo(Address, { as: 'address', foreignKey: 'address_id' });

    Address.hasMany(Company, { foreignKey: 'address_id' });
    Address.hasMany(Customer, { foreignKey: 'address_id' });

    Order.belongsTo(Company, { foreignKey: 'company_id', as: 'company' });
    Order.belongsTo(Customer, { foreignKey: 'customer_id', as: 'customer' });
};
