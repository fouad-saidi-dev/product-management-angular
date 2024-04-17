import {Component} from '@angular/core';
import {AppStateService} from "../../services/app-state.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public currentAction: any;
  actions: Array<any> = [
    {title: "Home", "route": "/home", icon: "house"},
    {title: "Products", "route": "/products", icon: "search"},
    {title: "New Product", "route": "/newProduct", icon: "house"}
  ]

  constructor(public appState:AppStateService) {
  }


  setCurrentAction(action: any) {
    this.currentAction=action
  }
}
