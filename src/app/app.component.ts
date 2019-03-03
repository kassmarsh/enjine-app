import { Component } from '@angular/core';
import { FormControl} from '@angular/forms';
import bsCustomFileInput from 'bs-custom-file-input';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ETF Comparison Web Application';
  
  ngOnInit() { bsCustomFileInput.init(); }
}
