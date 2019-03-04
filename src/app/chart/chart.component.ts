import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.getElementById("test1").innerHTML = localStorage.getItem('file1');
    document.getElementById("test2").innerHTML = localStorage.getItem('file2');
  }

}
