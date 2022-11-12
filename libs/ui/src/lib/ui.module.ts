import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { ButtonModule } from 'primeng/button';
import { GalleryComponent } from './components/gallery/gallery.component';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import {GalleriaModule} from 'primeng/galleria';
@NgModule({
  imports: [CommonModule,ButtonModule, CarouselModule, CardModule,GalleriaModule],
  declarations: [
    BannerComponent,
    GalleryComponent
  ],
  exports: [
    BannerComponent,
    GalleryComponent
  ],
})
export class UiModule {}
