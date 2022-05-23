import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { ValueService } from 'src/app/services/value.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];
  public limit = 10;
  public offset = 0;
  public status: 'loading' | 'success' | 'error' | 'init' = 'init';
  public rta = '';

  constructor(private productsService: ProductsService, private valueService: ValueService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.status = 'loading';
    this.productsService.getAll(this.limit, this.offset).
    subscribe({
      next: (products) => {
        this.products = [...this.products, ...products];
        this.offset += this.limit;
        this.status = 'success';
      },
      error: error => {
        setTimeout(() => {
          this.products = [];
          this.status = 'error';
        }, 3000)
      }
    })
  }

 async callPromise() {
  const rta = await this.valueService.getPromiseValue()
  this.rta = rta;
  }

}
    // subscribe((products) =>{
    //   this.products = [...this.products, ...products];
    //   this.offset += this.limit;
    //   this.status = 'success';
    // }, error => {
    //   this.products = [];
    //   this.status = 'error';
    // })
