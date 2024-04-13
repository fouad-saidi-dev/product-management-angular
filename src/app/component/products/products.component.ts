import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../model/product.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  public products: Array<Product> = []; //public products$ !: Observable<Array<Product>>; in file html must change product to (products$ | async)
  public keyword : string = "";

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    this.productService.getProducts()
      .subscribe({
        next: data => {
          this.products = data
        },
        error: err => {
          console.log(err)
        }
      })
    //this.productService.getProducts().pipe();
  }

  handleDelete(product: Product) {
    if (confirm('Delete this product?'))
    this.productService.deleteProduct(product).subscribe({
      next:value => {
        this.products = this.products.filter(p=>p.id!=product.id);
      }
    })
  }


  searchProduct() {
      this.productService.searchProduct(this.keyword).subscribe({
        next:value => {
          this.products=value;
        },
        error:err => {
          console.log(err)
        }
      })
  }

  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product).subscribe({
      next: updatedProduct => {
        product.checked = !product.checked;
      }
    })
  }
}
