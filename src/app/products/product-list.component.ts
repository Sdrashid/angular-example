import {Component, OnInit} from '@angular/core';
import {IProduct} from './product';
import {ProductService} from "./product.service";

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string{
    return this._listFilter;
  }
  set listFilter(value: string){
    this._listFilter = value;
    this.filteredProduct = this._listFilter ? this.performFilter(this._listFilter) : this.products;
  }

  filteredProduct: IProduct[];

  products: IProduct[] = [];

  /*products: IProduct[] = [
    {
      productId : 2,
      productName: 'Garden Cart',
      productCode: 'GBC-887',
      releaseDate: 'May 21, 2019',
      description: 'desc',
      price: 32.99,
      starRating: 4.2,
      imageUrl: 'assets/images/garden_cart.png'
    },
    {
      productId : 5,
      productName: 'Hammer',
      productCode: 'TBX-0048  ',
      releaseDate: 'May 25, 2020',
      description: 'desc',
      price: 8.99,
      starRating: 3.2,
      imageUrl: 'assets/images/hammer.png'
    }
  ];*/

  constructor(private productService: ProductService) {

  }

  performFilter(filterBy: string): IProduct[]{
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter((product: IProduct) =>
        product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void{
    if (this.showImage){
      this.showImage = false;
    }else{
      this.showImage = true;
    }
  }

  ngOnInit(): void {
    console.log('In ngOnInit.');
    this.productService.getProduct().subscribe({
      next: products => {
        this.products = products;
        this.filteredProduct = this.products;
        },
      error: err => this.errorMessage = err
    });
  }

  onRatingClicked(message: string): void{
    this.pageTitle = 'Product List' + message;
  }
}
