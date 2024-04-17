import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../model/product.model";
import {HttpHeaders, HttpResponse} from "@angular/common/http";
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
              private router: Router,
              public appState: AppStateService) {
  }

  ngOnInit(): void {
    this.searchProducts()
  }

  searchProducts() {
    this.appState.setProductState({
      status: 'LOADING'
    })
    this.productService.searchProducts(this.appState.productState.keyword,this.appState.productState.currentPage, this.appState.productState.pageSize)
      .subscribe({
        next: (res) => {
          this.appState.productState.products = res.body as Product[];
          this.productService.getCountProducts()
            .subscribe({
              next: data => {
                this.appState.productState.productCount = data.length
                const headers = new HttpHeaders().set('x-total-count',data.length.toString())
                console.log(headers.get('x-total-count'))
                this.appState.productState.totalPages = Math.floor(this.appState.productState.productCount / this.appState.productState.pageSize)
                if (this.appState.productState.productCount % this.appState.productState.pageSize != 0) {
                  this.appState.productState.totalPages += 1;
                }
                this.appState.setProductState({
                  status: 'LOADER'
                })
              },
              error: err => {
                this.appState.setProductState({
                  status: 'ERROR',
                  errorMessage: err
                })
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
    this.searchProducts()
  }

  handleDelete(product: Product) {
    if (confirm('Delete this product?'))
      this.productService.deleteProduct(product).subscribe({
        next: value => {
          //this.appState.productState.products = this.appState.productState.products.filter((p:any) => p.id != product.id);
          this.searchProducts()
        }
      })
  }


  // searchProduct() {
  //   this.productService.searchProducts(this.appState.productState.keyword).subscribe({
  //     next: value => {
  //       this.appState.productState.products = value;
  //     },
  //     error: err => {
  //       console.log(err)
  //     }
  //   })
  // }

  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product).subscribe({
      next: updatedProduct => {
        product.checked = !product.checked;
      }
    })
  }

  handleEdit(p: Product) {
    this.router.navigateByUrl(`/editProduct/${p.id}`)
  }
}
