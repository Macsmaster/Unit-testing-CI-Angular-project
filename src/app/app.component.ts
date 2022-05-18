import { Component, OnInit } from '@angular/core';
import { Calculator } from './calculator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-testing-services';

  ngOnInit(): void {
      const calculator = new Calculator();
      const rpta = calculator.multiply(3, 3);
      console.log(rpta === 9);
      const rptaDivide  = calculator.divide(3, 0);
      console.log(rptaDivide === null);
      console.log(rptaDivide);
  }

}

