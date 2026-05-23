import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Core
import { AuthInterceptor } from './core/interceptors/token.interceptor';

// Shared Components
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ShoppingCartPopupComponent } from './shared/components/shopping-cart-popup/shopping-cart-popup.component';
import { PaymentPopupComponent } from './shared/components/payment-popup/payment-popup.component';

// Page Components
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CartComponent } from './pages/cart/cart.component';
import { PromotionComponent } from './pages/promotion/promotion.component';
import { UserProfileComponent } from './pages/userprofile/user-profile.component';

// Brand Pages
import { BrandComponent } from './pages/brand/brand.component';
import { NikeComponent } from './pages/brand/nike/nike.component';
import { AdidasComponent } from './pages/brand/adidas/adidas.component';
import { PumaComponent } from './pages/brand/puma/puma.component';
import { LiNingComponent } from './pages/brand/li-ning/li-ning.component';
import { AntaComponent } from './pages/brand/anta/anta.component';
import { ConverseComponent } from './pages/brand/converse/converse.component';
import { DetailpdComponent } from './pages/brand/detailpd/detailpd.component';

// Admin Pages
import { ProductManagementComponent } from './admin/product-management/product-management.component';

@NgModule({
  declarations: [
    AppComponent,
    // Shared Components
    NavbarComponent,
    ShoppingCartPopupComponent,
    PaymentPopupComponent,
    // Page Components
    HomeComponent,
    LoginComponent,
    ContactComponent,
    CartComponent,
    PromotionComponent,
    UserProfileComponent,
    // Brand Pages
    BrandComponent,
    NikeComponent,
    AdidasComponent,
    PumaComponent,
    LiNingComponent,
    AntaComponent,
    ConverseComponent,
    DetailpdComponent,
    // Admin Pages
    ProductManagementComponent,
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
