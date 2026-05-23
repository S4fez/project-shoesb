import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Core
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { UserRole } from './core/models/role.model';

// Page Components
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CartComponent } from './pages/cart/cart.component';
import { UserProfileComponent } from './pages/userprofile/user-profile.component';

// Brand Pages
import { BrandComponent } from './pages/brand/brand.component';
import { NikeComponent } from './pages/brand/nike/nike.component';
import { PumaComponent } from './pages/brand/puma/puma.component';
import { LiNingComponent } from './pages/brand/li-ning/li-ning.component';
import { AntaComponent } from './pages/brand/anta/anta.component';
import { AdidasComponent } from './pages/brand/adidas/adidas.component';
import { ConverseComponent } from './pages/brand/converse/converse.component';
import { DetailpdComponent } from './pages/brand/detailpd/detailpd.component';

// Admin Pages
import { ProductManagementComponent } from './admin/product-management/product-management.component';


const routes: Routes = [
  {
    path: 'brand',
    component: BrandComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'nike', component: NikeComponent, canActivate: [AuthGuard] },
      { path: 'puma', component: PumaComponent, canActivate: [AuthGuard] },
      { path: 'li-ning', component: LiNingComponent, canActivate: [AuthGuard] },
      { path: 'anta', component: AntaComponent, canActivate: [AuthGuard] },
      { path: 'adidas', component: AdidasComponent, canActivate: [AuthGuard] },
      { path: 'converse', component: ConverseComponent, canActivate: [AuthGuard] },
    ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [UserRole.CUSTOMER] }
  },
  {
    path: 'detailpd/:id',
    component: DetailpdComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/products',
    component: ProductManagementComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [UserRole.SUPERADMIN, UserRole.ADMIN] }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
