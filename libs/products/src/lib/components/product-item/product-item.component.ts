import { Component, Input, OnInit } from '@angular/core';
import { CartItem, CartService } from '@variant-bor-uz-frontend/orders';

import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styles: [],
})
export class ProductItemComponent implements OnInit {
  products: Product[];
  category: Category[];
  productName : string;

  @Input() product: Product;
  constructor(
    private productService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this._getProduct();
    this.productName = this.shortProductName(this.product.name);
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1,
    };
    this.cartService.setCartItem(cartItem);
  }

  private _getProduct() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;

    });
  }

  shortProductName(name) {
    if (name.length > 30) {
      name = name.slice(0, 30) + "...";
    }

    return name;
  }
}
