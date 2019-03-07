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
    //get rid of trailing newlines (had to do this after checking nullness)
    firstFile = firstFile.trim();
    secondFile = secondFile.trim();

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

    var title1 = biggerFile[0].match(/[^,]*/);
    var title2 = smallerFile[0].match(/[^,]*/);

    var biggerNames = [];
    var biggerValues = [];
    var smallerNames = [];
    var smallerValues = [];
    var duplicateNames = [];
    var duplicateCounts = [];
    var temp;
    var temp2;
    var temp3;
    var temp4;
    var i;
    var j = 0;

    //line 6 is where data values begin
    for (i = 6; i < smallerFile.length; i++) {
    	temp = smallerFile[i].split(",");
    
        temp2 = smallerNames.indexOf(temp[0]);
        //duplicate - sum % of market value
        if (temp2 != -1) {
            temp3 = parseFloat(smallerValues[temp2]);
            temp3 += parseFloat(temp[1].replace(/[=%"]/g, ""));
            smallerValues[temp2] = temp3.toString();
            //do not advance j index
        }
        else {
    	   smallerNames[j] = temp[0];
    	   smallerValues[j] = temp[1].replace(/[=%"]/g, "");
           j++;
        }
    }

    j = 0;
    for (i = 6; i < biggerFile.length; i++) {
    	temp = biggerFile[i].split(",");
        
        temp3 = biggerNames.indexOf(temp[0]);
        //duplicate detected
        if (temp3 != -1) {
            temp4 = parseFloat(biggerValues[temp3]);
            temp4 += parseFloat(temp[1].replace(/[=%"]/g, ""));
            biggerValues[temp3] = temp4.toString();
        }
        else {
    	   biggerNames[j] = temp[0];
    	   biggerValues[j] = temp[1].replace(/[=%"]/g, "");

            temp2 = smallerNames.indexOf(biggerNames[j]);
        	if (temp2 == -1) {
        		//smaller file doesn't have holding name
        		smallerNames.splice((j), 0, biggerNames[j]);
        		smallerValues.splice((j), 0, "0");
        	}
        	//smaller file has holding name but it's in wrong spot
        	else if (temp2 != (j)) {
        		smallerNames.splice(temp2, 1);
        		smallerValues.splice(temp2, 1);
        		smallerNames.splice((j), 0, biggerNames[j]);
        		smallerValues.splice((j), 0, "0");
        	}
            j++;
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
            layout: {
                padding: {
                    right: 10
                }
            },
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
