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
  selector: 'AccountTransaction',
  templateUrl: './AccountTransaction.component.html'
})
export class AccountTransactionComponent implements OnInit {

  AccountTransaction: FormGroup;
  dataTable: any;
  errorMessage: any;
  Message: string = '';
  MessageType: string = 'warning';
  SaveBtn: string = "Save";

  ProjectList = [];
  BranchList = [];
  LedgerList = [];
  AccountTransactionList = [];

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

    this.AccountTransaction = this._fb.group({
      AccountTransactionId: [0],
      VoucherNo: [''],
      VoucherDate: [''],
      BranchId: [0],
      ProjectId: [0],
      FromLedger: [0],
      ToLedger: [0],
      Remark : [''],
    })
    
    this.fillProjectList();
    this.fillLedger();
    this.fillBranch();
    this.FillForm(0);

  }
  public FillForm(Id: number) {

    if (Id != 0) {
      this.dataTable.destroy();
    }
    
    this.service.GetOneAccountTransaction(Id)
      .subscribe((data) => {
        
        if (Id == 0) {
          this.SaveBtn = "Save";
        }
        else {
          this.SaveBtn = "Update";
        }

        this.AccountTransaction.controls['AccountTransactionId'].setValue(data[0].AccountTransactionId);
        this.AccountTransaction.controls['VoucherNo'].setValue(data[0].VoucherNo);
        this.AccountTransaction.controls['VoucherDate'].setValue(data[0].VoucherDatee);
        this.AccountTransaction.controls['BranchId'].setValue(data[0].BranchId);
        this.AccountTransaction.controls['ProjectId'].setValue(data[0].ProjectId);
        this.AccountTransaction.controls['FromLedger'].setValue(data[0].FromLedger);
        this.AccountTransaction.controls['ToLedger'].setValue(data[0].ToLedger);
        this.AccountTransaction.controls['Remark'].setValue(data[0].Remark);
      }, error => this.errorMessage = error);

    this.fillAccountTransaction();
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
    
    this.service.SaveAccountTransaction(this.AccountTransaction.value)
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
      this.service.DeleteAccountTransaction(Id)
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


  fillProjectList() {
    this.service.FillProject().subscribe((data) => {
      this.ProjectList = data;
    });
  }

  fillLedger() {
    this.service.FillAccountLedger().subscribe((data) => {
      this.LedgerList = data;
      console.log(data);
    });
  }

  fillAccountTransaction() {
    this.service.FillAccountTransaction().subscribe((data) => {
      this.AccountTransactionList = data;

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

  get AccountTransactionId() { return this.AccountTransaction.get('AccountTransactionId'); }
  get VoucherNo() { return this.AccountTransaction.get('VoucherNo'); }
  get VoucherDate() { return this.AccountTransaction.get('VoucherDate'); }
  get BranchId() { return this.AccountTransaction.get('BranchId'); }
  get ProjectId() { return this.AccountTransaction.get('ProjectId'); }
  get FromLedger() { return this.AccountTransaction.get('FromLedger'); }
  get ToLedger() { return this.AccountTransaction.get('ToLedger'); }
  get Remark() { return this.AccountTransaction.get('Remark'); }
  
}

