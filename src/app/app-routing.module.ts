import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {ProductsComponent} from "./component/products/products.component";
import {NewProductComponent} from "./component/new-product/new-product.component";
import {EditProductComponent} from "./component/edit-product/edit-product.component";
import {LoginComponent} from "./component/login/login.component";
import {AdminTemplateComponent} from "./component/admin-template/admin-template.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {AuthorizationGuard} from "./guards/authorization.guard";
import {NotAuthorizedComponent} from "./component/not-authorized/not-authorized.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: 'admin', component: AdminTemplateComponent, canActivate: [AuthenticationGuard], children: [
      {path: 'products', component: ProductsComponent},
      {
        path: 'newProduct', canActivate: [AuthorizationGuard], component: NewProductComponent,
        data: {requiredRoles: 'ADMIN'}
      },
      {
        path: 'editProduct/:id', canActivate: [AuthorizationGuard], component: EditProductComponent,
        data: {requiredRoles: 'ADMIN'}
      },
      {path: 'home', component: HomeComponent},
      {path: 'notAuthorized', component: NotAuthorizedComponent}
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
