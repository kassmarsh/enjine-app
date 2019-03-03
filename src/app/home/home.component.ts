import { Component, OnInit } from '@angular/core';
import bsCustomFileInput from 'bs-custom-file-input';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	bsCustomFileInput.init();
  }

}
