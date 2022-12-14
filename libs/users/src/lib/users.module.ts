import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUsers from './state/users.reducer';
import { UsersEffects } from './state/users.effects';
import { UsersFacade } from './state/users.facade';

export const usersRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(usersRoutes),
    StoreModule.forFeature(fromUsers.USERS_FEATURE_KEY, fromUsers.reducer),
    EffectsModule.forFeature([UsersEffects]),
  ],
  exports: [LoginComponent],
  providers: [UsersFacade],
})
export class UsersModule {}
