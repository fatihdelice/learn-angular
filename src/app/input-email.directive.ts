import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputEmail]'
})
export class InputEmailDirective {

  constructor(private element: ElementRef) { }

  @HostListener('focus') onFocus(){
    // console.log('focus');
    this.element.nativeElement.classList.add('bg-warning');
  }

  @HostListener('blur') onBlur(){
    // console.log('blur');    
    this.element.nativeElement.classList.remove('bg-warning');

    let value: string = this.element.nativeElement.value;

    if(!value.includes('@')){
      this.element.nativeElement.value = value.toLowerCase()+'@gmail.com';
    }
  }

}
