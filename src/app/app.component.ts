import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProductManagement';
  public currentRoute : any;
  constructor(private router:Router) {
  }
  goToHome() {
    this.currentRoute = "home"
     this.router.navigateByUrl("/home");
  }

  goToProducts() {
    this.currentRoute = "products"
    this.router.navigateByUrl("/products");
  }
}
