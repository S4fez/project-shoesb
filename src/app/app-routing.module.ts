import { Routes,RouterModule } from '@angular/router';
import { BrandComponent } from './brand/brand.component';
import { NikeComponent } from './brand/nike/nike.component';
import { PumaComponent } from './brand/puma/puma.component';
import { LiNingComponent } from './brand/li-ning/li-ning.component';
import { AntaComponent } from './brand/anta/anta.component';
import { AdidasComponent } from './brand/adidas/adidas.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { DetailpdComponent } from './brand/detailpd/detailpd.component';
import { NgModule } from '@angular/core';
import { ConverseComponent } from './brand/converse/converse.component';
import { AuthGuard } from './authGuard.service';
import { UserProfileComponent } from './userprofile/user-profile.component';


const routes: Routes = [
  
  {
    path: 'brand',
    component: BrandComponent,canActivate: [AuthGuard], 
    children: [
      { path: 'nike', component: NikeComponent,canActivate: [AuthGuard], 

       },
      { path: 'puma', component: PumaComponent,canActivate: [AuthGuard], 

       },
      { path: 'lining', component: LiNingComponent,canActivate: [AuthGuard], 

       },
      { path: 'anta', component: AntaComponent,canActivate: [AuthGuard], 

       },
      { path: 'adidas', component: AdidasComponent,canActivate: [AuthGuard],

       },
      { path: 'converse', component: ConverseComponent,canActivate: [AuthGuard], 

       },
    ]
  },
  {
    path: 'home',
    component: HomeComponent,canActivate: [AuthGuard], 
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path:'login',
    component: LoginComponent,
  },
  {
    path:'contact',
    component: ContactComponent,canActivate: [AuthGuard], 
  },
  {
    path:'cart',
    component: CartComponent,canActivate: [AuthGuard], 
  },
  {
    path:'detailpd/:id',
    component: DetailpdComponent,canActivate: [AuthGuard], 
  },
  {
    path:'profile',
    component: UserProfileComponent,canActivate: [AuthGuard], 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
