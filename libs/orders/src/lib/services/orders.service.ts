import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}
  url = 'https://mobilezone-shop.herokuapp.com/api/v1/';
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.url + `scoring/`);
  }

  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(
      `https://mobilezone-shop.herokuapp.com/api/v1/orders/${orderId}`
    );
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(
      `https://mobilezone-shop.herokuapp.com/api/v1/orders`,
      order
    );
  }

  updateOrder(
    orderStaus: { status: string },
    orderId: string
  ): Observable<Order> {
    return this.http.put<Order>(
      `https://mobilezone-shop.herokuapp.com/api/v1/orders/${orderId}`,
      orderStaus
    );
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<any>(
      `https://mobilezone-shop.herokuapp.com/api/v1/orders/${orderId}`
    );
  }

  getOrdersCount(): Observable<number> {
    return this.http
      .get<number>(
        `https://mobilezone-shop.herokuapp.com/api/v1/orders/get/count`
      )
      .pipe(map((objectValue: any) => objectValue.orderCount));
  }

  getTotalSales(): Observable<number> {
    return this.http
      .get<number>(
        `https://mobilezone-shop.herokuapp.com/api/v1/orders/get/totalsales`
      )
      .pipe(map((objectValue: any) => objectValue.totalsales));
  }

  getProduct(productId: string): Observable<any> {
    return this.http.get<any>(
      `https://mobilezone-shop.herokuapp.com/api/v1/products/${productId}`
    );
  }
}
