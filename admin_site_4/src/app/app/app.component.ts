import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/primeng';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  applicationName = "Poshakh";
  homeMenu: MenuItem[];
  	constructor() {
        this.homeMenu = [
            {label: 'Categories', icon: 'fa-bar-chart', routerLink: 'category' },
            {label: 'Products', icon: 'fa-calendar', routerLink: 'product' },
            {label: 'Materials', icon: 'fa-support', routerLink: 'material' },
            {label: 'Measurements', icon: 'fa-book', routerLink: 'measurement'}
        ];
  	};
}
