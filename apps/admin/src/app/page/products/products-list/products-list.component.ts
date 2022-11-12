import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@variant-bor-uz-frontend/products';

import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subscription, interval, Subject } from 'rxjs';
@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit {
  products = [];

  private updateSubscription: Subscription;

  constructor(
    private productService: ProductsService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.updateSubscription = interval(1000).subscribe((val) => {
      this._getProduct();
    });
  }

  private _getProduct() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  updateProduct(productid: string) {
    this.router.navigateByUrl(`products/form/${productid}`);
  }

  deleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId).subscribe(
          () => {
            this._getProduct();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product is deleted!',
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Product is not deleted!',
            });
          }
        );
      },
    });
  }




}
