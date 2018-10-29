import { Component, Inject, OnInit, ChangeDetectorRef, Input, OnChanges, SimpleChanges, SimpleChange  } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import { EmployeeService } from './../services/Employee.service';


@Component({
  selector: 'Document',
  templateUrl: './Document.component.html'
})
export class DocumentComponent implements OnChanges {
  @Input() EmployeeId: number;
  
  Documentform: FormGroup;
  errorMessage: any;
  Message: string = '';
  MessageType: string = 'warning';
  SaveBtn: string = "Save";

  DocumetList = [];
  DocumentTypeList = [];

  ngOnChanges(changes: SimpleChanges) {
    
    for (let property in changes){
      if (property === 'EmployeeId') {
        //console.log('Previous:', changes[property].previousValue);
        //console.log('Current:', changes[property].currentValue);
        //console.log('firstChange:', changes[property].firstChange);
        this.FillForm(0);
      
      }
    }

  }
  
  constructor(
    private service: EmployeeService,
    private _avRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _router: Router,
    private cd: ChangeDetectorRef
    ){

    this.Documentform = this._fb.group({
      DocumentId: [''],
      Name: [''],
      SerialNo: [''],
      DocumentTypeId: [0],
      Photo: [''],
    })

    this.MessageType = 'warning';
    this.Message = "Please Wait Loading ...!";
    
    this.fillDocumentType();

  }
  public FillForm(Id: number) {


    this.service.GetOneDocument(Id)
      .subscribe((data) => {
        if (Id == 0) {
          this.SaveBtn = "Save";
        }
        else {
          this.SaveBtn = "Update";
        }
        this.Documentform.controls['DocumentId'].setValue(data[0].DocumentId);
        this.Documentform.controls['Name'].setValue(data[0].Name);
        this.Documentform.controls['SerialNo'].setValue(data[0].SerialNo);
        this.Documentform.controls['DocumentTypeId'].setValue(data[0].DocumentType);
      }, error => this.errorMessage = error);
    this.fillDocument();
  }

  public Reset() {
    this.FillForm(0);
    this.Message = " Form clear ...! ";
    this.MessageType = 'success';
    $(document).ready(function () {
      $(".DocMessage").show();
    });
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.Documentform.patchValue({
          Photo: reader.result
        });
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  public save() {
    this.service.SaveDocument(this.Documentform.value)
      .subscribe((data) => {
        this.Message = data[0].Message;
        if (data[0].MessageType == 1) {
          this.FillForm(0);
          this.MessageType = 'success';
        }
        else {
          this.MessageType = 'warning';
        }
      }, error => this.errorMessage = error);

    $(document).ready(function () {
      $(".message").show();
    });
  }
  

  public Delete(DocumentId: number) {
    var body = document.getElementsByTagName('body')[0];
    var overlay = document.createElement('div');
    overlay.className = 'myConfirm';
    var box = document.createElement('div');
    var boxchild = document.createElement('div');
    var p = document.createElement('p');
    p.appendChild(document.createTextNode("Are you sure"));
    boxchild.appendChild(p);
    var yesButton = document.createElement('button');
    var noButton = document.createElement('button');
    yesButton.appendChild(document.createTextNode('Yes'));
    yesButton.addEventListener('click', () => {
      this.service.DeleteEmployeeDocument(DocumentId)
        .subscribe((data) => {
          this.Message = data[0].Message;
          if (data[0].MessageType == 1) {
            
            this.FillForm(0);

            this.MessageType = 'success';
          }
          else {
            this.MessageType = 'warning';
          }
        }, error => this.errorMessage = error);

      $(document).ready(function () {
        $(".message").show();
      });

      body.removeChild(overlay);
    }, false);

    noButton.appendChild(document.createTextNode('No'));
    noButton.addEventListener('click', () => {

      body.removeChild(overlay);

    }, false);
    boxchild.appendChild(yesButton);
    boxchild.appendChild(noButton);
    box.appendChild(boxchild);
    overlay.appendChild(box)
    body.appendChild(overlay);

  }



  fillDocumentType() {
    this.service.FillDocumentType().subscribe((data) => {
      this.DocumentTypeList = data;
      console.log(data);
    });

  }

  fillDocument() {
    this.service.FillEmployeeDocument().subscribe((data) => {
      this.DocumetList = data;
      
      
    });
  }

  get DocumentId() { return this.Documentform.get('DocumentId'); }
  get Name() { return this.Documentform.get('Name'); }
  get SerialNo() { return this.Documentform.get('SerialNo'); }
  get DocumentTypeId() { return this.Documentform.get('DocumentTypeId'); }
  get Photo() { return this.Documentform.get('Photo'); }

}
