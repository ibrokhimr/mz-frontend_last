import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ORDER_STATUS } from '@variant-bor-uz-frontend/orders';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Order } from 'libs/orders/src/lib/models/order';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { OrdersService } from 'libs/orders/src/lib/services/orders.service';

import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-frontend-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  orderStatus = ORDER_STATUS;
  endsubs$: Subject<any> = new Subject();

  constructor(
    private ordersService: OrdersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getOrders();
  }
  ngOnDestroy() {
    this.endsubs$.next(null);
    this.endsubs$.complete();
  }

  _getOrders() {
    this.ordersService
      .getOrders()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((orders) => {
        this.orders = orders;
      });
  }

  showOrder(orderId) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }

  deleteOrder(orderId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService
          .deleteOrder(orderId)
          .pipe(takeUntil(this.endsubs$))
          .subscribe(
            () => {
              this._getOrders();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Order is deleted!'
              });
            },
            () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Order is not deleted!'
              });
            }
          );
      }
    });
  }

}
