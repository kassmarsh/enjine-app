import { Component, OnInit } from '@angular/core';
import bsCustomFileInput from 'bs-custom-file-input';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  csvContent: string;

  constructor() { }

  ngOnInit() {
  	bsCustomFileInput.init();
  	
  	var input = (<HTMLInputElement>document.getElementById("file1"));
    input.addEventListener("change", function(event) {
      var files = input.files;
      var len = files.length;

         if (len) {
          console.log("Filename: " + files[0].name);
          console.log("Type: " + files[0].type);
          console.log("Size: " + files[0].size + " bytes");

         }

     }, false);
  }

  onFileLoad(fileLoadedEvent) {
    const textFromFileLoaded = fileLoadedEvent.target.result;              
    this.csvContent = textFromFileLoaded;     
    alert(this.csvContent);
  }

    onFileSelect(input: HTMLInputElement) {

      const files = input.files;
      var content = this.csvContent;    
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
