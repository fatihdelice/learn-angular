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
If we want to print a value entered from the input to the console

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
onKeyUp(email: any){
    console.log(email);
}
```
