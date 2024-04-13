import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {Product} from "../../model/product.model";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit {
  public productForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: this.formBuilder.control('', Validators.required),
      price: this.formBuilder.control('', Validators.required),
      checked: this.formBuilder.control(false, Validators.requiredTrue)
    })
  }

  saveProduct() {
    let product:Product = this.productForm.value;
    if (this.productForm.valid)
    this.productService.saveProduct(product).subscribe({
      next: data=> {
        alert(JSON.stringify(data))
        this.productForm.reset()
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
