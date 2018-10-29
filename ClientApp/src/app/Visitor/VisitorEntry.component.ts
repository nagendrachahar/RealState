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
  selector: 'Visitor-Entry',
  templateUrl: './VisitorEntry.component.html'
})

export class VisitorEntryComponent implements OnInit {

  VisitorEntry: FormGroup;
  dataTable: any;
  errorMessage: any;
  Message: string = '';
  MessageType: string = 'warning';
  SaveBtn: string = "Save";

  VisitorList = [];
  ProjectList = [];

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

    this.VisitorEntry = this._fb.group({
      VisitorId: [0],
      ProjectId: [0],
      VisitorName: [''],
      ContactNo: [''],
      EmailId: [''],
      Purpose: [''],
      VisitDate: [''],
    })
  
    this.fillProject();
    this.FillForm(0);

  }
  public FillForm(Id: number) {

    if (Id != 0) {
      this.dataTable.destroy();
    }
    
    this.service.GetOneVisitorEntry(Id)
      .subscribe((data) => {
        
        if (Id == 0) {
          this.SaveBtn = "Save";
        }
        else {
          this.SaveBtn = "Update";
        }

        this.VisitorEntry.controls['VisitorId'].setValue(data[0].VisitorId);
        this.VisitorEntry.controls['ProjectId'].setValue(data[0].ProjectId);
        this.VisitorEntry.controls['VisitorName'].setValue(data[0].VisitorName);
        this.VisitorEntry.controls['ContactNo'].setValue(data[0].ContactNo);
        this.VisitorEntry.controls['EmailId'].setValue(data[0].EmailId);
        this.VisitorEntry.controls['Purpose'].setValue(data[0].Purpose);
        this.VisitorEntry.controls['VisitDate'].setValue(this.datePipe.transform(data[0].VisitDate, 'yyyy-MM-dd'));

      }, error => this.errorMessage = error);

    this.fillVisitorEntry();
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
    this.service.SaveVisitorEntry(this.VisitorEntry.value)
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
      this.service.DeleteVisitorEntry(Id)
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

  fillProject() {
    this.service.FillProject().subscribe((data) => {
      this.ProjectList = data;
      console.log(data);
    });
  }
  

  fillVisitorEntry() {
    this.service.FillVisitorEntry().subscribe((data) => {
      this.VisitorList = data;

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
  
  get VisitorId() { return this.VisitorEntry.get('VisitorId'); }
  get ProjectId() { return this.VisitorEntry.get('ProjectId'); }
  get VisitorName() { return this.VisitorEntry.get('VisitorName'); }
  get ContactNo() { return this.VisitorEntry.get('ContactNo'); }
  get EmailId() { return this.VisitorEntry.get('EmailId'); }
  get Purpose() { return this.VisitorEntry.get('Purpose'); }
  get VisitDate() { return this.VisitorEntry.get('VisitDate'); }

}

