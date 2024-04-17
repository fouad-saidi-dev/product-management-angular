import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { ProductsComponent } from './component/products/products.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NewProductComponent } from './component/new-product/new-product.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ProductService} from "./services/product.service";
import { EditProductComponent } from './component/edit-product/edit-product.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { AppErrorsComponent } from './component/app-errors/app-errors.component';
import {AppHttpInterceptor} from "./services/app-http.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    NewProductComponent,
    EditProductComponent,
    DashboardComponent,
    NavbarComponent,
    AppErrorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ProductService,
    {provide:HTTP_INTERCEPTORS, useClass : AppHttpInterceptor, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
