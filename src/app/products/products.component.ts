import { Component, OnInit } from '@angular/core';
import {IProduct} from './product'
import {ProductService} from "./product.service"

@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  pageTitle :String='Product List';
  imageWidth:number=50;
  imageMargin:number=2;
  showImage: boolean=false;
  filterText:string='cart'
  errorMessage:string=''

  _listFilter:string;
  filteredList: IProduct[];
  get listFilter(): string{
    return this._listFilter;
  }
  set listFilter(value:string){
    this._listFilter= value;
    this.filteredList=this._listFilter?this.perfomeFilter(this._listFilter) :this.productList;
  }

  productList: IProduct[] = []
  constructor(private productService:ProductService) {
    
   }

  perfomeFilter(filterBy:string): IProduct[] {
    filterBy=filterBy.toLocaleLowerCase();
    return this.filteredList.filter((product:IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy)!== -1);
  }
  toggleImage():void {
    this.showImage=!this.showImage;
  }
  ngOnInit(): void {
    this.productService.getProductList().subscribe({
      next : productList => {
        this.productList = productList;
        this.filteredList=this.productList;
      },
        error : err=> this.errorMessage =err
    });
    
  }
  
  
  onRatingClicked(message:String):void{
    this.pageTitle=message;
   
  }
}
