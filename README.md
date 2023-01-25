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

