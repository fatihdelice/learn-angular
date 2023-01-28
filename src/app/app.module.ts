import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProductComponent } from './product.component';
import { SummaryPipe } from './summary.pipe';
import { InputEmailDirective } from './input-email.directive';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductComponent,
    SummaryPipe,
    InputEmailDirective,
    AdminProductsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [ProductComponent]
})
export class AppModule { }
