import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from './../../../../libs/ui/src/lib/ui.module';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './shared/nav/nav.component';
import { ProductsModule } from '@variant-bor-uz-frontend/products';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OrdersModule } from '@variant-bor-uz-frontend/orders';
import { MessagesComponent } from './shared/messages/messages.component';
import { ToastModule } from 'primeng/toast';
import { GmapComponent } from './shared/gmap/gmap.component';
import { JwtInterceptor, UsersModule } from '@variant-bor-uz-frontend/users';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import {GMapModule} from 'primeng/gmap';
import {CarouselModule} from 'primeng/carousel';
import { ServiceOfferComponent } from './shared/service-offer/service-offer.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
];
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,

    HeaderComponent,
    FooterComponent,
    NavComponent,
    MessagesComponent,
    GmapComponent,
    ServiceOfferComponent,
  ],
  imports: [
    ProductsModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    UiModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    AccordionModule,
    UiModule,
    GMapModule,
    HttpClientModule,
    OrdersModule,
    ToastModule,
    UsersModule,
    CarouselModule
  ],
  providers: [MessageService, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },],
  bootstrap: [AppComponent],
  exports: [
    MessagesComponent,
    GmapComponent,
    ServiceOfferComponent
  ],
})
export class AppModule {}
