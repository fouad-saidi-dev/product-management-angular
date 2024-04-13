import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../model/product.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  public products: Array<Product> = [];
  public search = ""

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe({
        next: data => {
          this.products = data
        },
        error: err => {
          console.log(err)
        }
      })
  }

  deleteProduct(p: any) {
    let index = this.products.indexOf(p)
    this.products.splice(index, 1);
  }

  searchProduct() {
    if (this.search.trim() !== "")
      this.products = this.products.filter(
        (product: { name: string; }) =>
          product.name.match(this.search)
      )
  }

  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product).subscribe({
      next: updatedProduct => {
        product.checked = !product.checked;
      }
    })
  }
}
