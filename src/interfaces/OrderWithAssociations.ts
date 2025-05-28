import Order from "../database/models/Order";
import Company from "../database/models/Company";
import Address from "../database/models/Address";
import Customer from "../database/models/Customer";
import OrderStatus from "../database/models/OrderStatus";
import PaymentType from "../database/models/PaymentType";

export interface OrderWithAssociations extends Order {
    company?: Company & { address?: Address };
    customer?: Customer & { address?: Address };
    status?: OrderStatus;
    payment_type?: PaymentType;
}
