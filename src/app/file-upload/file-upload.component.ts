import { Component, OnInit } from '@angular/core';
import bsCustomFileInput from 'bs-custom-file-input';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  csvContent1: string;
  csvContent2: string;

  constructor() { }

  ngOnInit() {
  	bsCustomFileInput.init();
  	localStorage.clear();
  }

  onFileLoad(fileLoadedEvent) {
    const textFromFileLoaded = fileLoadedEvent.target.result;
    let fileNum = localStorage.getItem('fileNum');
    if (fileNum == '1') {
      this.csvContent1 = textFromFileLoaded;
      localStorage.setItem('file1', this.csvContent1);
      alert("in 1");
      alert(this.csvContent1);
    }
    else {
      this.csvContent2 = textFromFileLoaded;
      localStorage.setItem('file2', this.csvContent2);
      alert("in 2");
      alert(this.csvContent2);
    }   

  }

   onFileSelect(input: HTMLInputElement) {
    const files = input.files;
    //localStorage.setItem('key', 'value');
    if (input.id == "file1") {
      localStorage.setItem('fileNum', '1');
      alert("here11111");
      var content = this.csvContent1;
    }
    else {
      localStorage.setItem('fileNum', '2');
      alert("here22222");
      var content = this.csvContent2;
    }
    if (files && files.length) {
         /*
          console.log("Filename: " + files[0].name);
          console.log("Type: " + files[0].type);
          console.log("Size: " + files[0].size + " bytes");
          */

          const fileToRead = files[0];

          const fileReader = new FileReader();
          fileReader.onload = this.onFileLoad;

          fileReader.readAsText(fileToRead, "UTF-8");
    }

   }
}
