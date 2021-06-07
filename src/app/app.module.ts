import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ConvertToSpacesPipe} from './shared/convert-to-spaces.pipe';
import { StarComponent }from './shared/star.Component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { WelcomeComponent } from './home/welcome.component'
import { RouterModule } from '@angular/router'
import { ProductDetailGuard} from './products/product-detail.guard'

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ConvertToSpacesPipe,
    StarComponent,
    ProductListComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'product',component: ProductsComponent},
      {
        path: 'product/:id',
        canActivate:[ProductDetailGuard],
        component: ProductListComponent},
      {path: 'welcome',component:WelcomeComponent},
      {path: '',redirectTo:'welcome',pathMatch:'full'},
      {path: '**',redirectTo:'welcome',pathMatch:'full'}
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



