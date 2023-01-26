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

