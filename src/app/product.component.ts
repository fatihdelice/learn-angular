import { Component } from '@angular/core';
import { ProductRepository } from './repository.model';
import { Product } from './product.model';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app',
    templateUrl: 'product.component.html',
    styleUrls: ['product.component.css']
})

export class ProductComponent {
    model: ProductRepository = new ProductRepository();
    disabled = true;

    //Pipes
    today: number = Date.now();
    title: string = "Learn Angular";
    students: number = 21536;
    price: number = 199.99;
    completed: number = 0.789;

    //Custom pipes
    text = "lorem ipsum dolor sit, amet consectetur adipisicing elit.";

    productName: string = this.model.getProductById(1)?.name as string;

    newProduct: Product = new Product();
    get jsonProduct() {
        return JSON.stringify(this.newProduct);
    }
    addProduct(p: Product){
        console.log("New product: " + this.jsonProduct);        
    }

    log(x: any) {
        console.log(x);
    }

    getformValidationErrors(form: NgForm): string[]{   
        let messages: string[] = [];

        Object.keys(form.controls).forEach(k => {
            console.log(k); // name
            console.log(form.controls[k]); // FormControl (name)     

            this.getValidationErrors(form.controls[k]).forEach(message => messages.push(message));
        });

        return messages;

    }

    getValidationErrors(state: any){
        let ctrlName: string = state.name;
        let messages: string[] = [];

        if(state.errors){
            for (let errorName in state.errors){
                switch(errorName){
                    case "required":
                        messages.push(`You must enter a ${ctrlName}`);
                        break;
                    case "minlength":
                        messages.push(`Min. 3 characters for ${ctrlName}`);
                        break;
                    case "pattern":
                        messages.push(`${ctrlName} contains illegal characters`);
                        break;
                }
            }
        }
        return messages;
    }

    formSubmitted: boolean = false;

    submitForm(form: NgForm){
        console.log(form);     
        this.formSubmitted = true;
        if(form.valid){
            this.addProduct(this.newProduct);
            this.newProduct = new Product();
            form.reset();
            this.formSubmitted = false;
        }
    }



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

    // onKeyUp($event: KeyboardEvent){
    //     if($event.keyCode == 13){
    //         console.log("Enter was pressed");
    //     }
    // }
    // onKeyUp($event: any){
    //     console.log($event.target.value);
    // }
    onKeyUp(email: any){
        console.log(email);
    }

    // addProduct() {
    //     this.model.addProduct(new Product(6, "Samsung S10", "Smartphone", "5000"));
    // }

    deleteProduct(product: Product) {
        this.model.deleteProduct(product);
    }

    updateProduct(product: Product) {
        product.name = "updated";
    }
}