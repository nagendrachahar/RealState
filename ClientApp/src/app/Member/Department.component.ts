import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import { MemberService } from './../services/Member.service';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/dataTables.buttons.js';
import 'datatables.net-buttons/js/buttons.print.js';


@Component({
    selector: 'Department',
  templateUrl: './Department.component.html'
})

export class DepartmentComponent implements OnInit {
  
    dataTable: any;
    Departmentform: FormGroup;
    errorMessage: any;
    Message: string = '';
    MessageType: string = 'warning';
    SaveBtn: string = "Save";

  DapartmentList = [];

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
        private cd: ChangeDetectorRef
      ){

      this.Departmentform = this._fb.group({

        DepartmentId: [0],
        DepartmentName: [''],
      })

      this.FillForm(0);
      

    }
  public FillForm(Id: number) {

    if (Id != 0) {
      this.dataTable.destroy();
    }

    this.service.GetOneDepartment(Id)
        .subscribe((data) => {
          if (Id == 0) {
            this.SaveBtn = "Save";
          }
          else {
            this.SaveBtn = "Update";
          }
          this.Departmentform.controls['DepartmentId'].setValue(data[0].DepartmentId);
          this.Departmentform.controls['DepartmentName'].setValue(data[0].DepartmentName);
        }, error => this.errorMessage = error);
    this.fillDepartment();

    }

    public Reset() {
      this.FillForm(0);
      this.Message = " Form clear ...! ";
      this.MessageType = 'success';
      $(document).ready(function () {
        $(".message").show();
      });
    }

    public Close() {
      this._router.navigate(['/Home']);
    }



    public save() {
      this.service.SaveDepartment(this.Departmentform.value)
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

  
  public Delete(DepartmentId: number) {
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
      this.service.DeleteDepartment(DepartmentId)
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
        this.DapartmentList = data;
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
  

  get DepartmentId() { return this.Departmentform.get('DepartmentId'); }
  get DepartmentName() { return this.Departmentform.get('DepartmentName'); }

}
