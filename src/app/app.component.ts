import { Component } from '@angular/core';
import { TendersService } from './tenders-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'stock-values-frontend';


  constructor(public api:TendersService){

  }
}
