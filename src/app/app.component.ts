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
  
  ngOnInit() { 
  	bsCustomFileInput.init();
  	document.getElementById("compare").onclick = function () {
      var file1 = document.getElementById("file1");
      var file2 = document.getElementById("file2");
    };
  }
}
