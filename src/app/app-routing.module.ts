import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { BrandComponent } from './brand/brand.component';
import { NikeComponent } from './brand/nike/nike.component';
import { PumaComponent } from './brand/puma/puma.component';
import { LiNingComponent } from './brand/li-ning/li-ning.component';
import { AntaComponent } from './brand/anta/anta.component';
import { AdidasComponent } from './brand/adidas/adidas.component';
import { ConverseComponent } from './brand/converse/converse.component';
import { DetailpdComponent } from './brand/detailpd/detailpd.component';
import { UserProfileComponent } from './userprofile/user-profile.component';
import { ShopComponent } from './shop/shop.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { TrackingComponent } from './tracking/tracking.component';
import { AuthGuard } from './authGuard.service';
import { RoleGuard } from './guards/role.guard';
import { UserRole } from './models/role.model';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'shop', component: ShopComponent, canActivate: [AuthGuard] },
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
  { path: 'tracking', component: TrackingComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: [UserRole.CUSTOMER] } },
  { path: 'detailpd/:id', component: DetailpdComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'brand', component: BrandComponent, canActivate: [AuthGuard],
    children: [
      { path: 'nike',    component: NikeComponent,    canActivate: [AuthGuard] },
      { path: 'puma',    component: PumaComponent,    canActivate: [AuthGuard] },
      { path: 'li-ning', component: LiNingComponent,  canActivate: [AuthGuard] },
      { path: 'anta',    component: AntaComponent,    canActivate: [AuthGuard] },
      { path: 'adidas',  component: AdidasComponent,  canActivate: [AuthGuard] },
      { path: 'converse',component: ConverseComponent,canActivate: [AuthGuard] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
