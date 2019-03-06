import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var firstFile = localStorage.getItem('file1');
    var secondFile = localStorage.getItem('file2');
    
    //var fileArray1 = firstFile.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
    //var fileArray2 = secondFile.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
    
    var fileArray1 = firstFile.split("\n");
    var fileArray2 = secondFile.split("\n");
    var title1 = fileArray1[0].match(/[^,]*/);
    var title2 = fileArray2[0].match(/[^,]*/);

    var file1Names = [];
    var file1Values = [];
    var file2Names = [];
    var file2Values = [];
    var labels = [];
    var temp;
    var i;

    //line 6 is where data values begin
    for (i = 6; i < fileArray1.length; i++) {
    	temp = fileArray1[i].split(",");
    	file1Names[i-6] = temp[0];
    	file1Values[i-6] = temp[1].match(/[^%]*/);
    }
    for (i = 6; i < fileArray2.length; i++) {
    	temp = fileArray2[i].split(",");
    	file2Names[i-6] = temp[0];
    	file2Values[i-6] = temp[1].match(/[^%]*/);
    	labels[i-6] = i-6;
    }

    var config = {
		type: 'line',
		data: {
			labels: file2Names,
			datasets: [{
				label: title1,
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255,99,132,1)',
				data: file1Values,
				fill: false,
			}, {
				label: title2,
				fill: false,
				backgroundColor: 'rgba(54, 162, 235, 0.2)',
				borderColor: 'rgba(54, 162, 235, 1)',
				data: file2Values,
			}]
		},
		options: {
			responsive: true,
			title: {
				display: true,
				text: 'Comparison of % of market values of securities'
			},
			tooltips: {
				mode: 'index',
				intersect: false,
			},
			hover: {
				mode: 'nearest',
				intersect: true
			},
			scales: {
				xAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Holding Name (hover over point to view)'
					},
					ticks: {
						display: false
					}
				}],
				yAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: '% of market value'
					}
				}]
			}
		}
    };


    var chart = document.getElementById("compChart");
    var myChart = new Chart(chart, config);
  }

}
