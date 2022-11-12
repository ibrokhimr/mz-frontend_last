import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Banner, Category } from '@variant-bor-uz-frontend/products';

import { ProductsService } from '@variant-bor-uz-frontend/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'banner-image',
  templateUrl: './banner-image.component.html',
  styles: [
  ]
})
export class BannerImageComponent implements OnInit {
  banners=[]
  constructor(
    private productService:ProductsService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private productsService:ProductsService
  ) { }

  ngOnInit(): void {
    this._getBanner()
  }

  private _getBanner(){
    this.productService.getBanners().subscribe(banner=>{
      this.banners=banner
    })
  }

  updateBanner(bannerid: string){

      this.router.navigateByUrl(`banner/form/${bannerid}`);

  }

  deleteBanner(bannerId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Banner Image?',
      header: 'Delete Banner',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteBanner(bannerId).subscribe(
          () => {
            this._getBanner();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Banner image is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Product is not deleted!'
            });
          }
        );
      }
    });
  }


}
