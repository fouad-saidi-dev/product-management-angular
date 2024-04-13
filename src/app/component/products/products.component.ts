import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  public products: any;
  public search = ""
  constructor() {
  }

  ngOnInit(): void {
    this.products = [
      {"id": 1, "name": "HP", "price": 10000},
      {"id": 2, "name": "Iphone", "price": 15000},
      {"id": 3, "name": "Lenovo Think pad", "price": 7000},
      {"id": 4, "name": "Samsung", "price": 4000},
    ];
  }

  deleteProduct(p:any) {
    let index = this.products.indexOf(p)
    this.products.splice(index,1);
  }

  searchProduct() {
    if (this.search.trim() !== "")
    this.products = this.products.filter(
      (product: { name: string; }) =>
        product.name.match(this.search)
    )
  }
}
