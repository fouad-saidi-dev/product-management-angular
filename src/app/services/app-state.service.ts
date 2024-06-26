import {Injectable} from '@angular/core';
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  public productState: any = {
    products: [],
    keyword: "",
    totalPages: 0,
    pageSize: 4,
    currentPage: 1,
    productCount: 0,
    status: "",
    errorMessage: ""
  }

  public authState: any = {
    isAuthenticated: false,
    username: undefined,
    roles: undefined,
    token: undefined
  }

  constructor() {
  }

  public setProductState(state: any) {
    this.productState = {...this.productState, ...state}
  }

  public setAuthState(state: any):void {
    this.authState = {...this.authState, ...state}
  }
}
