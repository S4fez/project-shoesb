import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrandComponent } from './brand/brand.component';
import { PromotionComponent } from './promotion/promotion.component';
import { ContactComponent } from './contact/contact.component';
// import { RegisterComponent } from './login/register/register.component';
import { NikeComponent } from './brand/nike/nike.component';
import { AdidasComponent } from './brand/adidas/adidas.component';
import { PumaComponent } from './brand/puma/puma.component';
import { LiNingComponent } from './brand/li-ning/li-ning.component';
import { AntaComponent } from './brand/anta/anta.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { DetailpdComponent } from './brand/detailpd/detailpd.component';
import { ConverseComponent } from './brand/converse/converse.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptors/token.service';
import { ShoppingCartPopupComponent } from './shopping-cart-popup/shopping-cart-popup.component';
import { PaymentPopupComponent } from './payment-popup/payment-popup.component';
import { UserProfileComponent } from './userprofile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BrandComponent,
    PromotionComponent,
    ContactComponent,
    // RegisterComponent,
    NikeComponent,

    AdidasComponent,
    PumaComponent,
    LiNingComponent,
    AntaComponent,
    NavbarComponent,
    LoginComponent,
    CartComponent,
    DetailpdComponent,
    ConverseComponent,
    ShoppingCartPopupComponent,
    PaymentPopupComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
