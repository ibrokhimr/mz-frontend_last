import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProductsListComponent } from './page/products/products-list/products-list.component';
import { ProductsFormComponent } from './page/products/products-form/products-form.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoriesService } from '@variant-bor-uz-frontend/products';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { UsersListComponent } from './page/users/users-list/users-list.component';
import { UsersFormComponent } from './page/users/users-form/users-form.component';
import {
  AuthGuard,
  JwtInterceptor,
  UsersModule,
  UsersService,
} from '@variant-bor-uz-frontend/users';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { TagModule } from 'primeng/tag';
import { AccordionModule } from 'primeng/accordion';
import { FileUploadModule } from 'primeng/fileupload';
import { DillersComponent } from './page/dillers/dillers.component';
import { HrComponent } from './page/hr/hr.component';
import { RegionsComponent } from './page/regions/regions.component';
import { DillersFormComponent } from './page/dillers-form/dillers-form.component';
import { DillersFullTableComponent } from './page/dillers-full-table/dillers-full-table.component';
import { FilialFormComponent } from './page/filial-form/filial-form.component';
import {FieldsetModule} from 'primeng/fieldset';
import {TabViewModule} from 'primeng/tabview';
import { CallCenterListComponent } from './page/call-center/call-center-list/call-center-list.component';
import { CallCenterFormComponent } from './page/call-center/call-center-form/call-center-form.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import { ZakupListComponent } from './page/zakup/zakup-list/zakup-list.component';
import { ZakupFormComponent } from './page/zakup/zakup-form/zakup-form.component';
import { BannerImageComponent } from './page/banner-image/banner-image.component';
import { BannerFormComponent } from './page/banner-form/banner-form.component';
import {GMapModule} from 'primeng/gmap';
import { PurchaseFormComponent } from './page/call-center/purchase-form/purchase-form.component';
import { PurchaseListComponent } from './page/call-center/purchase-list/purchase-list.component';
import { OrdersDetailComponent } from './page/orders-detail/orders-detail.component';
import { OrdersListComponent } from './page/orders-list/orders-list.component';
import {SidebarModule} from 'primeng/sidebar';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LogisticsComponent } from './page/logistics/logistics.component';
import { ScoringComponent } from './page/scoring/scoring.component';
import { ScoringFormComponent } from './page/scoring-form/scoring-form.component';
import { MyScoringComponent } from './page/my-scoring/my-scoring.component';
import { ShopsListComponent } from './page/shops/shops-list/shops-list.component';
import { ShopsFormComponent } from './page/shops/shops-form/shops-form.component';

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
  EditorModule,
  TagModule,
  SidebarModule
];

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'categories',
        component: CategoriesListComponent,
      },
      {
        path: 'categories/form',
        component: CategoriesFormComponent,
      },
      {
        path: 'categories/form/:id',
        component: CategoriesFormComponent,
      },
      {
        path: 'users',
        component: UsersListComponent,
      },
      {
        path: 'users/form',
        component: UsersFormComponent,
      },
      {
        path: 'users/form/:id',
        component: UsersFormComponent,
      },
      {
        path: 'products',
        component: ProductsListComponent,
      },
      {
        path: 'products/form',
        component: ProductsFormComponent,
      },
      {
        path: 'products/form/:id',
        component: ProductsFormComponent,
      },
      {
        path: 'dillers',
        component: DillersComponent,
      },
      {
        path: 'dillers/form',
        component: DillersFormComponent,
      },
      {
        path: 'dillers/full',
        component: DillersFullTableComponent,
      },
      {
        path: 'dillers/formsFilial',
        component: FilialFormComponent,
      },
      {
        path: 'dillers/full/formsFilial',
        component: FilialFormComponent,
      },
      {
        path: 'dillers/formsFilial/:id',
        component: FilialFormComponent,
      },
      {
        path: 'dillers/form/:id',
        component: DillersFormComponent,
      },
      {
        path: 'hr',
        component: HrComponent,
      },
      {
        path: 'regions',
        component: RegionsComponent,
      },


      {
        path: 'callcenter',
        component: CallCenterListComponent,
      },
      {
        path: 'callcenter/form',
        component: CallCenterFormComponent,
      },
      {
        path: 'callcenter/form/:id',
        component: CallCenterFormComponent,
      },
      {
        path: 'purchase',
        component: PurchaseListComponent,
      },
      {
        path: 'zakup',
        component: ZakupListComponent,
      },
      {
        path: 'zakup/form',
        component: ZakupFormComponent,
      },
      {
        path: 'zakup/form/:id',
        component: ZakupFormComponent,
      },

      {
        path: 'banner',
        component: BannerImageComponent,
      },
      {
        path: 'banner/form',
        component: BannerFormComponent,
      },
      {
        path: 'banner/form/:id',
        component: BannerFormComponent,
      },
      {
        path: 'orders',
        component: OrdersListComponent
      },
      {
        path: 'orders/:id',
        component: OrdersDetailComponent
      },
      {
        path: 'logistics',
        component: LogisticsComponent
      },
      {
        path: 'newScoring',
        canActivate: [AuthGuard],
        component: ScoringComponent
      },
      {
        path: 'myScoring',
        canActivate: [AuthGuard],
        component: MyScoringComponent
      },
      // {
      //   path: 'scoring/form',
      //   component: ScoringFormComponent,
      // },
      {
        path: 'scoring/:id',
        component: ScoringFormComponent,
      },
      {
        path: 'shops',
        component: ShopsListComponent,
      },
      {
        path: 'shops/form',
        component: ShopsFormComponent,
      },
      {
        path: 'shops/form/:id',
        component: ShopsFormComponent,
      },
    ],
  },
    // agar berilgan route topilmasa, boshlangich routega yonaltiradi
  {
    path:'**',
    redirectTo: '',
    pathMatch:'full'
  }
];
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ShellComponent,
    SidebarComponent,
    CategoriesListComponent,
    CategoriesFormComponent,
    UsersFormComponent,
    UsersListComponent,
    ProductsListComponent,
    ProductsFormComponent,
    DillersComponent,
    HrComponent,
    RegionsComponent,
    DillersFormComponent,
    DillersFullTableComponent,
    FilialFormComponent,
    CallCenterListComponent,
    CallCenterFormComponent,
    ZakupListComponent,
    ZakupFormComponent,
    BannerImageComponent,
    BannerFormComponent,
    PurchaseFormComponent,
    PurchaseListComponent,
    OrdersDetailComponent,
    OrdersListComponent,
    LogisticsComponent,
    ScoringComponent,
    ScoringFormComponent,
    MyScoringComponent,
    ShopsListComponent,
    ShopsFormComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    UsersModule,
    TabViewModule,
    GMapModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    ...UX_MODULE,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    FormsModule,
    RadioButtonModule,
    ReactiveFormsModule,
    FieldsetModule
  ],
  providers: [
    CategoriesService,
    MessageService,
    ConfirmationService,
    UsersService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: [
    DillersComponent,
    HrComponent,
    RegionsComponent,
    DillersFormComponent,
    DillersFullTableComponent,
    FilialFormComponent,
    CallCenterListComponent,
    CallCenterFormComponent,
    ZakupListComponent,
    ZakupFormComponent,
    PurchaseFormComponent,
    PurchaseListComponent,
    OrdersDetailComponent,
    OrdersListComponent,
    LogisticsComponent,
    ScoringComponent,
    MyScoringComponent,
    ShopsListComponent,
    ShopsFormComponent,

  ],
})
export class AppModule {}
