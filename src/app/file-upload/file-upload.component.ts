import { Component, OnInit } from '@angular/core';
import bsCustomFileInput from 'bs-custom-file-input';
import swal from 'sweetalert';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  csvContent1: string;
  csvContent2: string;
  validCsv1: boolean;
  validEtf1: boolean;
  validCsv2: boolean;
  validEtf2: boolean;
  file1Uploaded: boolean;
  file2Uploaded: boolean;

  constructor() { }

  ngOnInit() {
  	bsCustomFileInput.init();
  	localStorage.clear();
    this.validCsv1 = false;
    this.validEtf1 = false;
    this.validCsv2 = false;
    this.validEtf2 = false;
    this.file1Uploaded = false;
    this.file2Uploaded = false;
    var self = this;

    //The following two event listeners handle the case where a user selects file,
    //then tries to select a file again and hits 'cancel' (leaving file field blank).
    //Resets boolean values and compare button.
    document.getElementById("filePicker1").addEventListener("click", function(){
      localStorage.removeItem('validEtf1');
      self.validCsv1 = false;
      self.file1Uploaded = false;
      document.getElementById("fakeCompare").classList.remove("d-none");
      document.getElementById("compare").classList.add("d-none");
    });
    document.getElementById("filePicker2").addEventListener("click", function(){
      localStorage.removeItem('validEtf2');
      self.validCsv2 = false;
      self.file2Uploaded = false;
      document.getElementById("fakeCompare").classList.remove("d-none");
      document.getElementById("compare").classList.add("d-none");
    });

    //error checking before comparison
    document.getElementById("fakeCompare").addEventListener("click", function(){
      //this is a bit hacky, but I couldn't figure out how to update global
      //variables from onFileLoad.....
      if (localStorage.getItem('validEtf1') == "true") {
        self.validEtf1 = true;
      }
      else {
        self.validEtf1 = false;
      }
      if (localStorage.getItem('validEtf2') == "true") {
        self.validEtf2 = true;
      }
      else {
        self.validEtf2 = false;
      }

      if (self.file1Uploaded == false && self.file2Uploaded == false) {
        swal("Uh Oh!","Looks like you forgot to upload both files.", "error");
      }
      else if (self.file1Uploaded == false || self.file2Uploaded == false) {
        swal("Uh Oh!","Looks like you forgot to upload one of the files.","error");
      }
      else if (self.validCsv1 == false && self.validCsv2 == false) {
        swal("Oops!","Neither uploaded files are .csv files.","error");
      }
      else if (self.validCsv1 == false || self.validCsv2 == false) {
        swal("Oops!","One of the uploaded files is not a .csv file.","error");
      }
      else if (self.validEtf1 == false && self.validEtf2 == false) {
        swal("Oops!","You have uploaded two .csv files, but neither are valid ETF files. To be considered a valid ETF file: \n1. CSV headers must be specified on line 6 of .csv file \n2. The first two headers must be \"Holding Name\" and \"% of market\"", "error");
      }
      else if (self.validEtf1 == false && self.validEtf2 == true) {
        swal("Oops!","The first file you uploaded is not a valid ETF file. To be considered a valid ETF file: \n1. CSV headers must be specified on line 6 of .csv file \n2. The first two headers must be \"Holding Name\" and \"% of market\"", "error");
      }
      else if (self.validEtf1 == true && self.validEtf2 == false) {
        swal("Oops!","The second file you uploaded is not a valid ETF file. To be considered a valid ETF file: \n1. CSV headers must be specified on line 6 of .csv file \n2. The first two headers must be \"Holding Name\" and \"% of market\"", "error");
      }
    });
  }

  onFileLoad(fileLoadedEvent) {
    var fileContents;
    var lineContents;
    const textFromFileLoaded = fileLoadedEvent.target.result;
    let fileNum = localStorage.getItem('fileNum');
    if (fileNum == '1') {
      this.csvContent1 = textFromFileLoaded;
      localStorage.setItem('file1', this.csvContent1);
      fileContents = this.csvContent1.split("\n");
      //minimum length for valid ETF file, based on sample files given
      if (fileContents.length >= 7) {
        lineContents = fileContents[5].split(",");
        if (lineContents.length >= 2) {
          if (lineContents[0] == "Holding name" && lineContents[1] == "% of market value") {
            //this is beacuse onFileLoad can't update global variables
            localStorage.setItem('validEtf1','true');
            if (localStorage.getItem('validEtf2') == "true") {
              document.getElementById("fakeCompare").classList.add("d-none");
              document.getElementById("compare").classList.remove("d-none");
            }
          }
        }
      }
      else {
        localStorage.setItem('validEtf1','false');
      }
    }
    else {
      this.csvContent2 = textFromFileLoaded;
      localStorage.setItem('file2', this.csvContent2);
      fileContents = this.csvContent2.split("\n");
      if (fileContents.length >= 7) {
        lineContents = fileContents[5].split(",");
        if (lineContents.length >= 2) {
          if (lineContents[0] == "Holding name" && lineContents[1] == "% of market value") {
            localStorage.setItem('validEtf2','true');
            if (localStorage.getItem('validEtf1') == "true") {
              document.getElementById("fakeCompare").classList.add("d-none");
              document.getElementById("compare").classList.remove("d-none");
            }
          }
        }
      }
      else {
        localStorage.setItem('validEtf2','false');
      }
    }   
  }

  onFileSelect(input: HTMLInputElement) {
    const files = input.files;

    if (input.id == "file1") {
      if (files[0].name.endsWith(".csv")) {
        this.validCsv1 = true;
      }
      else {
        this.validCsv1 = false;
      }
      localStorage.setItem('fileNum', '1');
      var content = this.csvContent1;
      this.file1Uploaded = true;
    }
    else {
      if (files[0].name.endsWith(".csv")) {
        this.validCsv2 = true;
      }
      else {
        this.validCsv2 = false;
      }
      localStorage.setItem('fileNum', '2');
      var content = this.csvContent2;
      this.file2Uploaded = true;
    }
    if (files && files.length) {
      const fileToRead = files[0];
      const fileReader = new FileReader();
      fileReader.onload = this.onFileLoad;
      fileReader.readAsText(fileToRead, "UTF-8");
    }
  }
}
