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
    if (firstFile == null || secondFile == null) {
        document.getElementById("message").classList.remove("d-none");
        document.getElementById("chartContainer").classList.add("d-none");
        return;
    }

    //var fileArray1 = firstFile.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
    //var fileArray2 = secondFile.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
    
    if (firstFile.split("\n").length > secondFile.split("\n").length) {
    	var biggerFile = firstFile.split("\n");
    	var smallerFile = secondFile.split("\n");
    }
    else {
    	var biggerFile = secondFile.split("\n");
    	var smallerFile = firstFile.split("\n");
    }

    //var fileArray1 = firstFile.split("\n");
    //var fileArray2 = secondFile.split("\n");
    var title1 = biggerFile[0].match(/[^,]*/);
    var title2 = smallerFile[0].match(/[^,]*/);

    var biggerNames = [];
    var biggerValues = [];
    var smallerNames = [];
    var smallerValues = [];
    var labels = [];
    var temp;
    var temp2;
    var i;

    //line 6 is where data values begin
    for (i = 6; i < smallerFile.length; i++) {
    	temp = smallerFile[i].split(",");
    	smallerNames[i-6] = temp[0];
    	smallerValues[i-6] = temp[1].match(/[^%]*/);
    	labels[i-6] = i-6;
    }
    for (i = 6; i < biggerFile.length; i++) {
    	temp = biggerFile[i].split(",");
    	biggerNames[i-6] = temp[0];
    	biggerValues[i-6] = temp[1].match(/[^%]*/);
    	temp2 = smallerNames.indexOf(biggerNames[i-6]);
    	if (temp2 == -1) {
    		//smaller file doesn't have holding name
    		smallerNames.splice((i-6), 0, biggerNames[i-6]);
    		smallerValues.splice((i-6), 0, "0");
    	}
    	//smaller file has holding name but it's in wrong spot
    	else if (temp2 != (i-6)) {
    		smallerNames.splice(temp2, 1);
    		smallerValues.splice(temp2, 1);
    		smallerNames.splice((i-6), 0, biggerNames[i-6]);
    		smallerValues.splice((i-6), 0, "0");
    	}
    }
    //there were some holding names in the smaller file not in the larger
    if (biggerNames.length < smallerNames.length) {
    	for (i = 0; i < smallerNames.length; i++) {
    		if (biggerNames.indexOf(smallerNames[i]) != i) {
    			biggerNames.splice(i, 0, "0");
    		}
    	}
    }

    var config = {
		type: 'line',
		data: {
			labels: biggerNames,
			datasets: [{
				label: title1,
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255,99,132,1)',
				data: biggerValues,
				fill: false,
			}, {
				label: title2,
				fill: false,
				backgroundColor: 'rgba(54, 162, 235, 0.2)',
				borderColor: 'rgba(54, 162, 235, 1)',
				data: smallerValues,
			}]
		},
		options: {
			responsive: true,
			title: {
				display: true,
				text: 'Comparison of % of market values of securities',
                fontSize: 18
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
						labelString: 'Holding Name (hover over point to view)',
                        fontSize: 14
					},
					ticks: {
						display: false
					}
				}],
				yAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: '% of market value',
                        fontSize: 14
					}
				}]
			}
		}
    };


    var chart = document.getElementById("compChart");
    var myChart = new Chart(chart, config);
  }

}
