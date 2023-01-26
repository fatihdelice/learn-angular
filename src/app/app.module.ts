import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProductComponent } from './product.component';
import { SummaryPipe } from './summary.pipe';
import { InputEmailDirective } from './input-email.directive';


@NgModule({
  declarations: [
    ProductComponent,
    SummaryPipe,
    InputEmailDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [ProductComponent]
})
export class AppModule { }
