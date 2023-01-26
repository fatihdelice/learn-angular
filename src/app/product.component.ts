import { Component } from '@angular/core';
import { ProductRepository } from './repository.model';
import { Product } from './product.model';

@Component({
    selector: 'app',
    templateUrl: 'product.component.html',
    styleUrls: ['product.component.css']
})

export class ProductComponent {
    model: ProductRepository = new ProductRepository();
    disabled = true;



    // product: Product = this.model.getProductById(1) as Product;

    getClasses(id: number): string {
        let product = this.model.getProductById(id);
        if (product && product.price) {
            return (product.price <= 1000 ? 'bg-info' : 'bg-secondary') + ' p-2 m-2 text-white';
        } else {
            return '';
        }
    }

    getClassMap(id: number): Object {
        let product = this.model.getProductById(id);
        if (product && product.price) {
            return {
                'bg-info': product.price <= 1000,
                'bg-secondary': product.price > 1000,
                'text-center text-white': product.name == 'Samsung S6'
            };
        } else {
            return {};
        }
    }

    // color: string = 'red';
    // color: string = this.model.getProductById(2).price <= 1000 ? "green" : "red";


    getStyles(id: number) {
        let product = this.model.getProductById(id);
        if (product && product.price) {
            return {
                fontSize: "25px",
                color: product.price <= 1000 ? "green" : "red"
            }
        } else {
            return {};
        }
    }


    onSubmit($event: Event){
        $event?.stopPropagation();
        console.log("Form submitted");
        console.log($event);
    }

    onDivClicked(){
        console.log("Div clicked");        
    }
}