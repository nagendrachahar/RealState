import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import { MemberService } from './../services/Member.service';
import { DatePipe } from '@angular/common';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/dataTables.buttons.js';
import 'datatables.net-buttons/js/buttons.print.js';


@Component({
  selector: 'Remuneration-structure',
  templateUrl: './RemunerationStructure.component.html'
})

export class RemunerationStructureComponent implements OnInit {

  RemunerationStructure: FormGroup;
  dataTable: any;
  errorMessage: any;
  Message: string = '';
  MessageType: string = 'warning';
  SaveBtn: string = "Save";

  RemunerationList = [];
  DepartmentList = [];
  DesignationList = [];

  ngOnInit() {
    this.MessageType = 'warning';
    this.Message = "Please Wait Loading ...!";
    
  }

  constructor(
    http: Http,
    @Inject('BASE_URL') baseUrl: string,
    private service: MemberService,
    private _avRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _router: Router,
    public datePipe: DatePipe,
    private cd: ChangeDetectorRef
  ) {

    this.RemunerationStructure = this._fb.group({
      RemunerationId: [0],
      DepartmentId: [0],
      DesignationId: [0],
      RemunerationPer: [0.00],
    })
  
    this.fillDepartment();
    this.fillDesignation();
    this.FillForm(0);

  }
  public FillForm(Id: number) {

    if (Id != 0) {
      this.dataTable.destroy();
    }
    
    this.service.GetOneRemunerationStruture(Id)
      .subscribe((data) => {
        
        if (Id == 0) {
          this.SaveBtn = "Save";
        }
        else {
          this.SaveBtn = "Update";
        }

        this.RemunerationStructure.controls['RemunerationId'].setValue(data[0].RemunerationId);
        this.RemunerationStructure.controls['DepartmentId'].setValue(data[0].DepartmentId);
        this.RemunerationStructure.controls['DesignationId'].setValue(data[0].DesignationId);
        this.RemunerationStructure.controls['RemunerationPer'].setValue(data[0].RemunerationPer);

      }, error => this.errorMessage = error);

    this.fillRemuneration();
  }

  public Reset() {
    this.FillForm(0);
    this.Message = " Branch Record Refersh ...! ";
    this.MessageType = 'success';
    $(document).ready(function () {
      $(".message").show();
    });
  }

  public Close() {
    this._router.navigate(['/Home']);
  }

  public save() {
    this.service.SaveRemunerationStruture(this.RemunerationStructure.value)
      .subscribe((data) => {
        this.Message = data[0].Message;
        if (data[0].MessageType == 1) {
          this.dataTable.destroy();
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

  public Delete(Id: number) {
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
      this.service.DeleteRemunerationStructure(Id)
        .subscribe((data) => {
          this.Message = data[0].Message;
          if (data[0].MessageType == 1) {

            this.dataTable.destroy();

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

  fillDepartment() {
    this.service.FillDepartment().subscribe((data) => {
      this.DepartmentList = data;
      console.log(data);
    });
  }


  fillDesignation() {
    this.service.FillDesignation().subscribe((data) => {
      this.DesignationList = data;
      console.log(data);
    });
  }
  

  fillRemuneration() {
    this.service.FillRemunerationStructure().subscribe((data) => {
      this.RemunerationList = data;

      console.log(data);

      this.cd.detectChanges();

      const table: any = $('#tablee');

      this.dataTable = table.DataTable({
        //"dom": '<Bf<t>ip>',
        "dom": '<f<t>ip>',
        "pageLength": 25
        //buttons: [
        //  'print'
        //]
      });
    });
  }
  
  get RemunerationId() { return this.RemunerationStructure.get('RemunerationId'); }
  get DepartmentId() { return this.RemunerationStructure.get('DepartmentId'); }
  get DesignationId() { return this.RemunerationStructure.get('DesignationId'); }
  get RemunerationPer() { return this.RemunerationStructure.get('RemunerationPer'); }
  
}

