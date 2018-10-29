import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
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
  selector: 'Branch',
  templateUrl: './Branch.component.html'
})

export class BranchComponent implements OnInit {

  Branchform: FormGroup;
  dataTable: any;
  errorMessage: any;
  Message: string = '';
  MessageType: string = 'warning';
  SaveBtn: string = "Save";

  BranchList = [];
  CityList = [];
  StateList = [];

  ngOnInit() {
    this.MessageType = 'warning';
    this.Message = "Please Wait Loading ...!";
    
  }

  constructor(
    private service: MemberService,
    private _avRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _router: Router,
    public datePipe: DatePipe,
    private cd: ChangeDetectorRef
  ) {

    this.Branchform = this._fb.group({
      BranchId: [''],
      BranchCode: [''],
      BranchName: [''],
      RegistrationDate: [''],
      InchargePerson: [''],
      Address: [''],
      CityId : [''],
      StateID: [''],
      Pincode: [''],
      ContactNo: [''],
    })

    this.FillForm(0);
    this.fillState();
    this.fillCity(0);

  }
  public FillForm(Id: number) {

    if (Id != 0) {
      this.dataTable.destroy();
    }

    this.service.GetOneBranch(Id)
      .subscribe((data) => {

        if (Id == 0) {
          this.SaveBtn = "Save";
        }
        else {
          this.SaveBtn = "Update";
        }

        this.Branchform.controls['BranchId'].setValue(data[0].BranchID);
        this.Branchform.controls['BranchCode'].setValue(data[0].BranchCode);
        this.Branchform.controls['BranchName'].setValue(data[0].BranchName);
        this.Branchform.controls['InchargePerson'].setValue(data[0].InchargePerson);
        this.Branchform.controls['Address'].setValue(data[0].Address);
        this.Branchform.controls['ContactNo'].setValue(data[0].ContactNo);
        this.Branchform.controls['RegistrationDate'].setValue(this.datePipe.transform(data[0].RegistrationDate,'yyyy-MM-dd'));
        this.Branchform.controls['StateID'].setValue(data[0].StateID);
        this.fillCity(data[0].StateID);
        this.Branchform.controls['CityId'].setValue(data[0].CityID);
        this.Branchform.controls['Pincode'].setValue(data[0].PinCode);
      }, error => this.errorMessage = error);

    this.fillBranchList();
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
    this.service.SaveBranch(this.Branchform.value)
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



  public Delete(BranchId: number) {
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
      this.service.DeleteBranch(BranchId)
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



  fillBranchList() {
    this.service.GetBranch().subscribe((data) => {
      this.BranchList = data;

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

  fillState() {
    this.service.FillState().subscribe((data) => {
      this.StateList = data;
    });


  }

  fillCity(Id: number) {
    this.service.GetCityOfState(Id).subscribe((data) => {
      this.CityList = data;
      
    });
  }

  StateChange(StateId: number) {
    this.fillCity(StateId);
  }

  get BranchId() { return this.Branchform.get('BranchId'); }
  get BranchCode() { return this.Branchform.get('BranchCode'); }
  get BranchName() { return this.Branchform.get('BranchName'); }
  get RegistrationDate() { return this.Branchform.get('RegistrationDate'); }
  get InchargePerson() { return this.Branchform.get('InchargePerson'); }
  get Address() { return this.Branchform.get('Address'); }
  get CityId() { return this.Branchform.get('CityId'); }
  get StateID() { return this.Branchform.get('StateID'); }
  get ContactNo() { return this.Branchform.get('ContactNo'); }
  get Pincode() { return this.Branchform.get('Pincode'); }
}

