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

  constructor() {
  }

  public setProductState(state: any) {
    this.productState = {...this.productState, ...state}
  }
}
