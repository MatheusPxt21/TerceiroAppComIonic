import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: 'folder/Home', icon: 'home' },
    { title: 'Users', url: '/clientes', icon: 'people-circle'},
    { title: 'About', url: '/sobre', icon: 'information-circle'}

  ];

  constructor() {}
}
