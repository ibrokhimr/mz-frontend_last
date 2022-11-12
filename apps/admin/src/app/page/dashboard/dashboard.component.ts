import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@variant-bor-uz-frontend/products';
import { OrdersService } from 'libs/orders/src/lib/services/orders.service';
import { UsersService } from 'libs/users/src/lib/services/users.service';
import { combineLatest, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  statistics = [];
  endsubs$: Subject<any> = new Subject();

  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
      this.ordersService.getTotalSales(),
    ])
      .pipe(takeUntil(this.endsubs$))
      .subscribe((values) => {
        this.statistics = values;
      });
  }

  ngOnDestroy() {
    this.endsubs$.next(null);
    this.endsubs$.complete();
  }
}
