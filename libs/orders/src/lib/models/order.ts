import { OrderItem } from './order-item';
import { User } from '@variant-bor-uz-frontend/users';

export class Order {
  id?: string;
  passportSeries?: string;
  phoneNumber?: string;
  date?: string;
  orderItems?: OrderItem[];
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status?: number;
  totalPrice?: string;
  user?: any;
  dateOrdered?: string;
}
