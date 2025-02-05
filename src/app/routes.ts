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



 const routes: Routes = [
  {
    path: 'brand',
    component: BrandComponent,
    children: [
      { path: 'nike', component: NikeComponent,

       },
      { path: 'puma', component: PumaComponent,

       },
      { path: 'lining', component: LiNingComponent,

       },
      { path: 'anta', component: AntaComponent,

       },
      { path: 'adidas', component: AdidasComponent,

       },
    ]
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path:'login',
    component: LoginComponent,
  },
  {
    path:'contact',
    component: ContactComponent,
  },
  {
    path:'cart',
    component: CartComponent,
  },
  {
    path:'detailpd/:id',
    component: DetailpdComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

