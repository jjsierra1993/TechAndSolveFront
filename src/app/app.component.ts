import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, PatternValidator } from '@angular/forms';
import { ApiServices } from './api.services'
import * as fileSaver from 'file-saver';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'TechAndSolveTest';
  fileData: File = null;
  documentId: number = null;
  registerForm: FormGroup;
  submitted = false;
  errorClass=false;
  fileUploadProgress: string = null;

  constructor(private formBuilder: FormBuilder, private apiServices: ApiServices) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fileLoad: ['', Validators.required],
      documentId: ['', Validators.required],
      fileUploadProgress:['']
    });
  }

  fileLoad(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.fileData = <File>fileInput.target.files[0];
    }
  }

  //Method for call Api Services
  invokeApi() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.fileUploadProgress = '';
    this.documentId=this.registerForm.get('documentId').value;
    //Call Api from procces of trip
    this.apiServices.fileProcess(this.fileData, this.documentId).subscribe(
      response => {
          this.dowloandFile(response, 'text/plain')
          this.fileUploadProgress = 'Se proceso el archivo correctamente, revise la descarga.';
      },
      error => {
        this.errorClass=true;
        this.fileUploadProgress = 'Ocurrio un error procesando el archivo';
      })
  }

  //Download file from Api
  dowloandFile(data: any, type: string) {
    const downloadedFile = new Blob([data.body], { type: type.toString()})
    fileSaver.saveAs(downloadedFile, 'prueba_output.txt');
  }

}
