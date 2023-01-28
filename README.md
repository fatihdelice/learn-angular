# LearnAngular


## Install Angular CLI
```shell
npm install -g @angular/cli
```

## Create a new project
```shell
ng new project-name
```

## Run the project
```shell
ng serve --open
```

## Add Component
```shell
ng generate component component-name
```
or
```shell
ng g c component-name
```

## Use Property Binding
```html
<!-- component.html -->
<h2>{{product.name}}</h2>
<h2 [textContent]="product.name"></h2>

<img src="assets/img/{{product.imageUrl}}">
<img [src]="'assets/img/' + product.imageUrl">
```


## Use Class Binding
```html
<!-- component.html -->
<div [class]="getClasses(1)">
    First product in catalog: {{model.getProductById(1)!.name}}
</div>

<div class="m-2 p-2" [ngClass]="getClassMap(1)">
    First product in catalog: {{model.getProductById(1)!.name}}
</div>
```

```ts
// component.ts
getClasses(id: number): string {
    let product = this.model.getProductById(id);
    if (product && product.price) {
        return (product.price <= 1000 ? 'bg-info' : 'bg-secondary') + ' p-2 m-2 text-white';
    } else {
        return '';
    }
}
```


## Use Style Binding
```html
<!-- component.html -->
<span [style.color]="color">Angular</span>

<span [ngStyle]="getStyles(1)">Angular</span>
```

```ts
// component.ts
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
```

## Use Event Binding
```html
<!-- component.html -->
<button (click)="onSubmit()">Submit</button>

<button (click)="onSubmit($event)">Submit</button>
```

```ts
// component.ts
onSubmit($event: Event){
    $event?.stopPropagation();
    console.log("Form submitted");
    console.log($event);
}
```

## Keyup Event
```html
<!-- component.html -->
<input type="text" (keyup)="onKeyUp($event)">
<input type="text" (keyup.enter)="onKeyUp()">
```

```ts
// component.ts
onKeyUp($event: KeyboardEvent){
    if($event.keyCode == 13){
        console.log("Enter was pressed");
    }
}
```
If we want to print a value entered from the input to the console:

```html
<!-- component.html -->
<input type="text" (keyup.enter)="onKeyUp()">
```

```ts
// component.ts
onKeyUp($event: any){
    console.log($event.target.value);
}
```
OR
```html
<!-- component.html -->
<input #email (keyup.enter)="onKeyUp(email.value)">
```

```ts
// component.ts
onKeyUp(email: any){
    console.log(email);
}
```

## Two Way Binding
```ts
// app.module.ts
import { FormsModule } from '@angular/forms';

@NgModule({
    ...
    imports: [
        ...
        FormsModule
    ],
    ...
})

// component.ts
@component({
    ...
    template: `
        <input [(ngModel)]="email" (keyup.enter)="onKeyUp()">
        <br>
        <span>{{email}}</span>
    `
    ...
})

export class AppComponent {
    ...
    email: "example@email.com";
    onKeyUp(){
        console.log(this.email);
    }
}
```

## Pipes
```html
<!-- component.html -->

<h4>Lower-Upper-Title CasePipe</h4>
<p>{{ title }}</p>
<!-- Learn Angular -->
<p>{{ title | lowercase }}</p>
<!-- learn angular -->
<p>{{ title | uppercase }}</p>
<!-- LEARN ANGULAR -->
<p>{{ title | titlecase }}</p>
<!-- Learn Angular -->

<h4>Date Pipe</h4>
<p>{{ today }}</p>
<!-- 1674741650486 -->
<p>{{ today | date }}</p>
<!-- Jan 26, 2023 -->
<p>{{ today | date: 'fulldate' }}</p>
<!-- full26PMte -->
<p>{{ today | date: 'medium' }}</p>
<!-- Jan 26, 2023, 5:00:50 PM -->
<p>{{ today | date: 'short' }}</p>
<!-- 1/26/23, 5:00 PM -->
<p>{{ today | date: 'h:mm:ss' }}</p>
<!-- 5:00:50 -->

<h4>Decimal Pipe</h4>
<p>{{ students }}</p>
<!-- 21536 -->
<p>{{ students | number }}</p>
<!-- 21,536 -->
<p>{{ price | number: '1.2-2' }}</p>
<!-- 199.99 -->

<h4>Currency Pipe</h4>
<p>{{ price }}</p>
<!-- 199.99 -->
<p>{{ price | currency: 'EUR' }}</p>
<!-- €199.99 -->

<h4>Percent Pipe</h4>
<p>{{ completed }}</p>
<!-- 0.789 -->
<p>{{ completed | percent }}</p>
<!-- 79% -->
```

```ts
// component.ts
export class AppComponent {
    ...
    today: number = Date.now();
    title: string = "Learn Angular";
    students: number = 21536;
    price: number = 199.99;
    completed: number = 0.789;
    ...
}
```

## Custom Pipe
```ts
// app.module.ts
@NgModule({
  declarations: [
    ...
    SummaryPipe
  ],
  ...
})
```

```ts
// summary.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'summary'
})
export class SummaryPipe implements PipeTransform {
  transform(value: string, limit?: number) {
    if (!value) return null;
    let _limit = (limit) ? limit : 20;
    return value.substr(0, _limit) + '...';
}
}
```

```html
<!-- component.html -->
{{ text | summary:15 }}
```

```ts
// component.ts
text = "lorem ipsum dolor sit, amet consectetur adipisicing elit."
```

## NgIf
```html
<!-- component.html -->
<div *ngIf="model.getProducts().length>0">
    There are {{model.getProducts().length}} products in the repository.
</div>

<div *ngIf="model.getProducts().length==0">
    There are no products in the repository.
</div>
```
OR
```html
<!-- component.html -->
<div *ngIf="model.getProducts().length>0; then productList else noProducts"></div>

<ng-template #productList>
    <div class="bg-primary text-white m-2 p-2">
        There are {{model.getProducts().length}} products in the repository.
    </div>
</ng-template>

<ng-template #noProducts>
    <div class="bg-primary text-white m-2 p-2">
        There are no products in the repository.
    </div>
</ng-template>
```
OR use [hidden] directive
```html
<!-- component.html -->
<div [hidden]="model.getProducts().length>0" class="bg-primary text-white m-2 p-2">
    There are {{model.getProducts().length}} products in the repository.
</div>

<div [hidden]="model.getProducts().length==0" class="bg-primary text-white m-2 p-2">
    There are no products in the repository.
</div>
```

## NgSwitch
```html
<!-- component.html -->
<div class="bg-info m-2 p-2" [ngSwitch]="model.getProductCount()">
    <span *ngSwitchCase="0">There are no products</span>
    <span *ngSwitchCase="1">There are 1 products</span>
    <span *ngSwitchCase="2">There are 2 products</span>
    <span *ngSwitchDefault>There are many products</span>
</div>
```
OR If we want to use it with a string value
```html
<!-- component.html -->
<div class="bg-info m-2 p-2" [ngSwitch]="model.getProductById(1)?.name">
    <span *ngSwitchCase="productName">Samsung S5</span>
    <span *ngSwitchCase="'Samsung S6'">Samsung S6</span>
    <span *ngSwitchCase="'Samsung S7'">Samsung S6</span>
    <span *ngSwitchDefault>Other Product</span>
</div>
```

## NgFor
```html
<!-- component.html -->
<ul>
    <li *ngFor="let product of model.getProducts(); first as isFirst; last as isLast; odd as isOdd; even as isEven">
        {{ product.id }} - {{product.name}}
        <span *ngIf="isFirst">first item</span>
        <span *ngIf="isLast">last item</span>
        <span *ngIf="isOdd">odd item</span>
        <span *ngIf="isEven">even item</span>
    </li>
</ul>
```

## NgTemplate
```html
<!-- component.html -->
<ng-template [ngTemplateOutlet]="productList"></ng-template>

<ng-template #productList>
    <div class="m-5">
        <ul class="list-group mt-2">
            <li *ngFor="let product of model.getProducts()" class="list-group-item">
                {{product.name}}
            </li>
        </ul>
    </div>
</ng-template>
```
OR
```html
<!-- component.html -->
<ng-template [ngTemplateOutlet]="productList" [ngTemplateOutletContext]="{products: model.getPopularProducts()}"></ng-template>
<ng-template [ngTemplateOutlet]="productList" [ngTemplateOutletContext]="{products: model.getLatestProducts()}"></ng-template>

<ng-template #productList let-products="products">
    <div class="m-5">
        <ul class="list-group mt-2">
            <li *ngFor="let product of products" class="list-group-item">
                {{product.name}}
            </li>
        </ul>
    </div>
</ng-template>
```

## Custom Directives
```shell
ng g d custom-directive-name
```

```html
<!-- component.html -->
<input type="text" appCustomDirectiveName>
```

```ts
// custom-directive-name.directive.ts
export class InputEmailDirective {
    ...
    @HostListener('focus') onFocus(){
        console.log('focus');
    }

    @HostListener('blur') onBlur(){
        console.log('blur');
    }
    ...

}
```

## NgForm
```html
<!-- component.html -->
<form #form="ngForm" (ngSubmit)="submitForm(form)">
    ...
    <div class="form-group">
        <label>Name</label>
        <input required minlength="3" maxlength="10" pattern="^[A-Za-z ]+$"
            [(ngModel)]="newProduct.name" name="name" #name="ngModel" type="text" class="form-control"
            (change)="log(name)">
        <div class="alert alert-danger" *ngIf="(formSubmitted || name.dirty) && name.invalid">
            <p *ngFor="let error of getValidationErrors(name)">
                {{error}}
            </p>
        </div>
    </div>
    ...
</form>
```

```ts
// component.ts
formSubmitted: boolean = false;

submitForm(form: NgForm){
    this.formSubmitted = true;
    if(form.valid){
        this.addProduct(this.newProduct);
        this.newProduct = new Product();
        form.reset();
        this.formSubmitted = false;
    }
}
```

## Angular Services (GET Request)
```ts
// app.module.ts
import { HttpClientModule } from '@angular/common/http';
...
@NgModule({
    ...
    imports: [
        ...
        HttpClientModule, 
        ...
    ],
    ...
})
```

```ts
// component.ts
import { HttpClient } from '@angular/common/http';

})
export class PostsComponent {
    posts: any;
    
    constructor(private http: HttpClient) {
    http.get('https://jsonplaceholder.typicode.com/posts')
        .subscribe(response => {
        this.posts = response;
        });
    }
}
```

```html
<!-- component.html -->
<ul>
    <li *ngFor="let post of posts">
        {{post.title}}
    </li>
</ul>
```

## Angular Services (POST Request)
```ts
// component.ts
export class PostsComponent {
    createPost(input: HTMLInputElement) {
        const post = {title: input.value};
        input.value = '';

        this.http.post(this.url, JSON.stringify(post)).subscribe(response => {
            this.posts?.splice(0, 0, post);
            console.log(response);
        })
    }
}
```

```html
<!-- component.html -->
<input type="text" (keyup.enter)="createPost(input)" #input>
```

## Angular Services (UPDATE Request)
```html
<!-- component.html -->
<button (click)="updatePost(post)">Update</button>
```
- PUT Request Methods
```ts
// component.ts
export class PostsComponent {
    updatePost(post: any) {
    post.title = 'UPDATED';
    this.http.put(this.url+'/'+post.id, JSON.stringify(post)).subscribe(response => {
      console.log(response);
    });
  }
}
```

- PATCH Request Methods
```ts
// component.ts
export class PostsComponent {
    updatePost(post: any) {
    post.title = 'UPDATED';
    
    this.http.patch(this.url+'/'+post.id, JSON.stringify({
      title: 'UPDATED'
    })).subscribe(response => {
      console.log(response);
    });
  }
}
```
## Angular Services (DELETE Request)
```html
<!-- component.html -->
<button (click)="deletePost(post)">Delete</button>
```

```ts
// component.ts
deletePost(post: any) {
    this.http.delete(this.url+'/'+post.id).subscribe(response => {
        console.log(response);
        let index = this.posts!.indexOf(post);
        this.posts?.splice(index, 1);
    });
}
```