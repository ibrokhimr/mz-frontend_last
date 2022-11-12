import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { Product } from '../../models/product';

import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html',
  styles: [],
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
  featuredProducts:Product[]=[]
  endSubs$:Subject<any>=new Subject();
 constructor( private prodService:ProductsService) { }

 ngOnInit(): void {
   this._getFeaturedProducts()
 }


 private _getFeaturedProducts(){
   this.prodService.getFeaturedProduct(4).pipe(takeUntil(this.endSubs$ )).subscribe(products=>{
    this.featuredProducts=products
   })
 }
ngOnDestroy(): void {
this.endSubs$.next(null)
this.endSubs$.complete()

}
}


