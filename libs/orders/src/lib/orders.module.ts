import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route, Routes } from '@angular/router';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import {DropdownModule} from 'primeng/dropdown';
import {InputMaskModule} from 'primeng/inputmask';
import {InputTextModule} from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TagModule } from 'primeng/tag';
import { AccordionModule } from 'primeng/accordion';
import { FileUploadModule } from 'primeng/fileupload';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { AuthGuard } from '@variant-bor-uz-frontend/users';

const UX_MODULE = [
  ButtonModule,
  FileUploadModule,
  InputTextareaModule,
  ToolbarModule,
  CardModule,
  TableModule,
  InputTextModule,
  ToastModule,
  ConfirmDialogModule,
  ColorPickerModule,
  InputMaskModule,
  InputSwitchModule,
  AccordionModule,
  InputNumberModule,
  DropdownModule,
  TagModule,
];



export const ordersRoutes: Route[] = [];
const routes: Routes = [
  {
    path: 'cart',
    component: CartPageComponent,
  },
  {
    path: 'checkout',
    canActivate:[AuthGuard],
    component: CheckoutPageComponent,
  },
  {
    path: 'success',
    component: ThankYouComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BadgeModule,
    FormsModule,
    ...UX_MODULE,
    ReactiveFormsModule,


  ],
  declarations: [CartIconComponent, CartPageComponent, OrderSummaryComponent, CheckoutPageComponent, ThankYouComponent],
  exports: [CartIconComponent, CartPageComponent, OrderSummaryComponent, CheckoutPageComponent, ThankYouComponent],
})
export class OrdersModule {
  constructor(private cartService: CartService) {
    cartService.initCartLocalStorage();
  }



}
