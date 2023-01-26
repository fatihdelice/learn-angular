import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProductComponent } from './product.component';
import { SummaryPipe } from './summary.pipe';


@NgModule({
  declarations: [
    ProductComponent,
    SummaryPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [ProductComponent]
})
export class AppModule { }
