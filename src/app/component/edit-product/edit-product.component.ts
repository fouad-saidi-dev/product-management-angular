import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../model/product.model";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  productId!: number;
  public productForm!: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['id'];
    this.productService.getProductById(this.productId).subscribe({
      next: (product) => {
        this.productForm = this.formBuilder.group({
          id: this.formBuilder.control(product.id),
          name: this.formBuilder.control(product.name),
          price: this.formBuilder.control(product.price),
          checked: this.formBuilder.control(product.checked)
        })
      },
      error: err => {
        console.error(err)
      }
    })
  }

  updateProduct() {
    let product: Product = this.productForm.value
    this.productService.editProduct(product).subscribe({
      next: data => {
        alert(JSON.stringify(data))
      },
      error: err => {
        console.error(err)
      }
    })
  }
}
