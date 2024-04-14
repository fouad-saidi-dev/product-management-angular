import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {ProductsComponent} from "./component/products/products.component";
import {NewProductComponent} from "./component/new-product/new-product.component";
import {EditProductComponent} from "./component/edit-product/edit-product.component";

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'products',component:ProductsComponent},
  {path:'newProduct',component:NewProductComponent},
  {path:'editProduct/:id',component:EditProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
