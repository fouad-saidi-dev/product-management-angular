import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../model/product.model";
import {HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  public products: Array<Product> = []; //public products$ !: Observable<Array<Product>>; in file html must change product to (products$ | async)
  public keyword: string = "";
  totalPages: number = 0;
  pageSize: number = 4;
  currentPage: number = 1;
  public productCount: number = 0;

  constructor(private productService: ProductService,private router:Router) {
  }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.productService.getProducts(this.currentPage, this.pageSize)
      .subscribe({
        next: (res) => {
          this.products = res.body as Product[];
          this.productService.getCountProducts()
            .subscribe({
              next: data => {
                this.productCount = data.length
                this.totalPages = Math.ceil(this.productCount / this.pageSize)
                if (this.productCount % this.pageSize !== 0) {
                  this.totalPages += 1;
                }
              },
              error: err => {
                console.log(err)
              }
            })
          console.log("totalPages", this.totalPages)
        },
        error: err => {
          console.log(err)
        }
      })
    //this.productService.getProducts().pipe();
  }

  handleGoToPage(page: number) {
    console.log("Clicked page:", page);
    console.log("Current page:", this.currentPage);
    console.log("Total pages:", this.totalPages);
    if (page >= 1 && page <= this.totalPages)
      this.currentPage = page;
      this.getProducts()
  }

  handleDelete(product: Product) {
    if (confirm('Delete this product?'))
      this.productService.deleteProduct(product).subscribe({
        next: value => {
          this.products = this.products.filter(p => p.id != product.id);
        }
      })
  }


  searchProduct() {
    this.productService.searchProduct(this.keyword).subscribe({
      next: value => {
        this.products = value;
      },
      error: err => {
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

  getArray(length: number): any[] {
    return Array.from({length}, (_, index) => index);
  }

  handleEdit(p: Product) {
    this.router.navigateByUrl(`/editProduct/${p.id}`)
  }
}
