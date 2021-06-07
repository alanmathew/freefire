import { Component, OnInit } from '@angular/core';
import {IProduct} from '../product';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../product.service'
import {Router} from '@angular/router'

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle:string='Product details'
  errorMessage = '';
  product: IProduct | undefined;

  constructor(private route:ActivatedRoute,
              private router: Router,
              private productService: ProductService
  ) { }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    console.log(param)
    if (param) {
      const id = +param;
      this.getProduct(id);
    }
  }

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });
    console.log(this.product+": received")
  }
  onBack(): void {
    this.router.navigate(['/products']);
  }

}
