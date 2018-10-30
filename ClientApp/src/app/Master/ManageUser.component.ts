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
  selector: 'ManageUser',
  templateUrl: './ManageUser.component.html'
})

export class ManageUserComponent implements OnInit {

  ManageUser: FormGroup;
  dataTable: any;
  errorMessage: any;
  Message: string = '';
  MessageType: string = 'warning';
  SaveBtn: string = "Save";

  UserList = [];
  BranchList = [];

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

    this.ManageUser = this._fb.group({
      UserId: [0],
      UserCode: [''],
      UserName: [''],
      BranchId: [0],
      Password: [''],
    })
  
    this.fillBranch();
    this.FillForm(0);

  }
  public FillForm(Id: number) {

    if (Id != 0) {
      this.dataTable.destroy();
    }
    
    this.service.GetOneUser(Id)
      .subscribe((data) => {
        
        if (Id == 0) {
          this.SaveBtn = "Save";
        }
        else {
          this.SaveBtn = "Update";
        }

        this.ManageUser.controls['UserId'].setValue(data[0].UserId);
        this.ManageUser.controls['UserCode'].setValue(data[0].UserCode);
        this.ManageUser.controls['UserName'].setValue(data[0].UserName);
        this.ManageUser.controls['BranchId'].setValue(data[0].BranchId);
        this.ManageUser.controls['Password'].setValue(data[0].Password);

      }, error => this.errorMessage = error);

    this.fillUser();
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
    this.service.SaveUser(this.ManageUser.value)
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
      this.service.DeleteUser(Id)
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

  fillBranch() {
    this.service.GetBranch().subscribe((data) => {
      this.BranchList = data;
      console.log(data);
    });
  }
  
  fillUser() {
    this.service.FillUsers().subscribe((data) => {
      this.UserList = data;

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
  
  get UserId() { return this.ManageUser.get('UserId'); }
  get UserCode() { return this.ManageUser.get('UserCode'); }
  get UserName() { return this.ManageUser.get('UserName'); }
  get BranchId() { return this.ManageUser.get('BranchId'); }
  get Password() { return this.ManageUser.get('Password'); }

}

