import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../model/product.model";
import {HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {AppStateService} from "../../services/app-state.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  // public products: Array<Product> = []; //public products$ !: Observable<Array<Product>>; in file html must change product to (products$ | async)
  // public keyword: string = "";
  // totalPages: number = 0;
  // pageSize: number = 4;
  // currentPage: number = 1;
  // public productCount: number = 0;

  constructor(private productService: ProductService,
              private router:Router,
              public appState:AppStateService) {
  }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.productService.getProducts(this.appState.productState.currentPage, this.appState.productState.pageSize)
      .subscribe({
        next: (res) => {
          this.appState.productState.products = res.body as Product[];
          this.productService.getCountProducts()
            .subscribe({
              next: data => {
                this.appState.productState.productCount = data.length
                this.appState.productState.totalPages = Math.ceil(this.appState.productState.productCount / this.appState.productState.pageSize)
                if (this.appState.productState.productCount % this.appState.productState.pageSize !== 0) {
                  this.appState.productState.totalPages += 1;
                }
              },
              error: err => {
                console.log(err)
              }
            })
          console.log("totalPages", this.appState.productState.totalPages)
        },
        error: err => {
          console.log(err)
        }
      })
    //this.productService.getProducts().pipe();
  }

  handleGoToPage(page: number) {
    console.log("Clicked page:", page);
    console.log("Current page:", this.appState.productState.currentPage);
    console.log("Total pages:", this.appState.productState.totalPages);
    if (page >= 1 && page <= this.appState.productState.totalPages)
      this.appState.productState.currentPage = page;
      this.getProducts()
  }

  handleDelete(product: Product) {
    if (confirm('Delete this product?'))
      this.productService.deleteProduct(product).subscribe({
        next: value => {
          //this.appState.productState.products = this.appState.productState.products.filter((p:any) => p.id != product.id);
          this.getProducts()
        }
      })
  }


  searchProduct() {
    this.productService.searchProduct(this.appState.productState.keyword).subscribe({
      next: value => {
        this.appState.productState.products = value;
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
