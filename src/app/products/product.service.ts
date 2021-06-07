import {Injectable} from '@angular/core'
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import {Observable, from, throwError} from 'rxjs'
import {IProduct} from './product'
import {tap,catchError,map} from 'rxjs/operators'

@Injectable({
    providedIn:'root'
})
    
export class ProductService{
    [x: string]: any
    // private productUrl='api/products/products.json'
     private productUrl='http://londdosgenlfmx:8000/product'
    constructor(private http : HttpClient){

    }

    getProductList(): Observable<IProduct[]>{
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log('All :'+JSON.stringify(data))),
            catchError(this.handleError)
        )
    }

    getProduct(id: number): Observable<IProduct | undefined> {
        return this.getProductList()
          .pipe(
            map((products: IProduct[]) => products.find(p => p.productId === id))
          );
      }
    
    private handleError(err:HttpErrorResponse) : Observable<never> {
        let errorMessage =''
        if (err.error instanceof HttpErrorResponse){
            errorMessage =`An error Occured${err.error.message}`
        }else{
            errorMessage =`Server return Code ${err.status} Error Message ${err.message}`
        }
        console.error(errorMessage);
        return throwError(errorMessage)
    }
    
}