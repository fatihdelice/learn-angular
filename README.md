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
<h2>{{product.name}}</h2>
<h2 [textContent]="product.name"></h2>

<img src="assets/img/{{product.imageUrl}}">
<img [src]="'assets/img/' + product.imageUrl">
```


## Use Class Binding
```html
<div [class]="getClasses(1)">
    First product in catalog: {{model.getProductById(1)!.name}}
</div>

<div class="m-2 p-2" [ngClass]="getClassMap(1)">
    First product in catalog: {{model.getProductById(1)!.name}}
</div>
```

## Use Style Binding
```html
<span [style.color]="color">Angular</span>

<span [ngStyle]="getStyles(1)">Angular</span>
```

## Use Event Binding
```html
<button (click)="onSubmit()">Submit</button>

<button (click)="onSubmit($event)">Submit</button>
```