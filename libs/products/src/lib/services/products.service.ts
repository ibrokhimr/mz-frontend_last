import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map, Observable } from 'rxjs';
import { Product } from '../models/product';
import { Form } from '@angular/forms';
import { Banner } from '../models/banner';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  url1 = 'https://mobilezone-shop.herokuapp.com/api/v1/';
  url = 'https://mzone.uz/api/v1/';

  getProducts(categoriesFilter?: string[]): Observable<Product[]> {
    let params = new HttpParams();
    if (categoriesFilter) {
      params = params.append('categories', categoriesFilter.join(','));
    }
    return this.http.get<Product[]>(this.url + `products/`, { params: params });
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.url + `products/`, productData);
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(this.url + `products/${productId}`);
  }

  updateProduct(productData: FormData, productid: string): Observable<Product> {
    return this.http.put<Product>(
      this.url + `products/` + productid,
      productData
    );
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(this.url + `products/${productId}`);
  }

  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      this.url + `products/get/featured/${count}`
    );
  }

  getFeaturedProduct(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      this.url + `products/get/featured/${count}`
    );
  }

  // Banners

  getBanners(): Observable<Banner[]> {
    return this.http.get<Banner[]>(this.url + `banner/`);
  }

  createBanner(bannerData: FormData): Observable<Banner> {
    return this.http.post<Banner>(this.url + `banner/`, bannerData);
  }

  deleteBanner(bannerId: string): Observable<any> {
    return this.http.delete<any>(this.url + `banner/${bannerId}`);
  }

  updateBanner(bannerData: FormData, bannerid: string): Observable<Banner> {
    return this.http.put<Banner>(this.url + `banner/` + bannerid, bannerData);
  }

  getBanner(bannerId: string): Observable<Banner> {
    return this.http.get<Banner>(this.url + `banner/${bannerId}`);
  }

  getProductsCount(): Observable<number> {
    return this.http
      .get<number>(this.url + `get/count`)
      .pipe(map((objectValue: any) => objectValue.productCount));
  }
}
