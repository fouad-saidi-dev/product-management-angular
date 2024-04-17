import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private host:string ="http://localhost:8089";
  constructor(private http: HttpClient) {
  }

  public searchProducts(keyword:string="",page:number=2, size:number=4) {
    return this.http.get<Array<Product>>(`${this.host}/products?name_like=${keyword}&_page=${page}&_limit=${size}`,{observe:'response'})
  }

  public checkProduct(product: Product):Observable<Product> {
    return this.http.patch<Product>(`${this.host}/products/${product.id}`,
      {checked: !product.checked});
  }
  public deleteProduct(product:Product) {
    return this.http.delete(`${this.host}/products/${product.id}`)
  }

  saveProduct(product: Product):Observable<Product> {
    return this.http.post<Product>(`${this.host}/products`,product);
  }
  // public searchProduct(keyword: string):Observable<Array<Product>> {
  //   return this.http.get<Array<Product>>(`${this.host}/products?name_like=${keyword}`);
  // }
  public getCountProducts():Observable<Array<Product>>{
    return this.http.get<Array<Product>>(`${this.host}/products`);
  }
  public getProductById(id:number):Observable<Product>{
    return this.http.get<Product>(`${this.host}/products/${id}`);
  }
  public editProduct(product:Product):Observable<Product>{
    return this.http.put<Product>(`${this.host}/products/${product.id}`,product)
  }

}
