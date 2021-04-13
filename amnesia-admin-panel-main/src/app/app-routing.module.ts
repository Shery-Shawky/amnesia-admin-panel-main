import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router'

import { AdminOrderDetailsComponent } from './components/admin-order-details/admin-order-details.component'
import { AdminUserComponent } from './components/admin-user/admin-user.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminUserOrdersComponent } from './components/admin-user-orders/admin-user-orders.component';
import { AdminAllOrdersComponent } from './components/admin-all-orders/admin-all-orders.component';
import { AdminProductAddComponent } from './components/admin-product-add/admin-product-add.component';
import { AdminProductEditComponent } from './components/admin-product-edit/admin-product-edit.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminFailed404Component } from './components/admin-failed404/admin-failed404.component';
import { AuthGuardService } from './services/auth-guard.service';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'failed', component: AdminFailed404Component },
  { path: 'login', component: AdminLoginComponent },
  {
    path: 'dashboard', 
    component: AdminDashboardComponent,
    canActivate : [AuthGuardService],
    children: [
      { path: 'users',pathMatch: 'full', component: AdminUserComponent },
      { path: 'users/orders/:id',pathMatch: 'full', component: AdminUserOrdersComponent },
      { path: 'orders',pathMatch: 'full', component: AdminAllOrdersComponent },
      { path: 'order/details/:id',pathMatch: 'full', component: AdminOrderDetailsComponent },
      { path: 'products',pathMatch: 'full', component: AdminProductsComponent },
      { path: 'add/product',pathMatch: 'full', component: AdminProductAddComponent },
      { path: 'edit/product/:id',pathMatch: 'full', component: AdminProductEditComponent },
    ]
  },
  
  { path: '**', component: AdminFailed404Component },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
