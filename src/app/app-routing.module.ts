import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {ProductsComponent} from "./component/products/products.component";
import {NewProductComponent} from "./component/new-product/new-product.component";
import {EditProductComponent} from "./component/edit-product/edit-product.component";
import {LoginComponent} from "./component/login/login.component";
import {AdminTemplateComponent} from "./component/admin-template/admin-template.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: 'admin', component: AdminTemplateComponent, children: [
      {path: 'products', component: ProductsComponent},
      {path: 'newProduct', component: NewProductComponent},
      {path: 'editProduct/:id', component: EditProductComponent},
      {path: 'home', component: HomeComponent}
    ]
  },
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
