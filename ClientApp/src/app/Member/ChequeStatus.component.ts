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
  selector: 'ChequeStatus',
  templateUrl: './ChequeStatus.component.html'
})


export class ChequeStatusComponent implements OnInit {

  ChequeStatusForm: FormGroup;
  dataTable: any;
  errorMessage: any;
  Message: string = '';
  MessageType: string = 'warning';
  SaveBtn: string = "Save";


  BankList = [];
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
  ){
    this.ChequeStatusForm = this._fb.group({
      AccountTransactionId: [0],
      VoucherNo: [''],
      VoucherDate: [''],
      ProjectId: [0],
      FromLedger: [0],
      ToLedger: [0],
      Remark : [''],
    })

    this.FillForm(0);
    this.fillBankList();
    this.fillLedger();

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

        this.ChequeStatusForm.controls['AccountTransactionId'].setValue(data[0].AccountTransactionId);
        this.ChequeStatusForm.controls['VoucherNo'].setValue(data[0].VoucherNo);
        this.ChequeStatusForm.controls['VoucherDate'].setValue(data[0].VoucherDatee);
        this.ChequeStatusForm.controls['ProjectId'].setValue(data[0].ProjectId);
        this.ChequeStatusForm.controls['FromLedger'].setValue(data[0].FromLedger);
        this.ChequeStatusForm.controls['ToLedger'].setValue(data[0].ToLedger);
        this.ChequeStatusForm.controls['Remark'].setValue(data[0].Remark);
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
    
    this.service.SaveAccountTransaction(this.ChequeStatusForm.value)
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
  
  fillBankList() {
    this.service.FillBank().subscribe((data) => {
      this.BankList = data;
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

  get AccountTransactionId() { return this.ChequeStatusForm.get('AccountTransactionId'); }
  get VoucherNo() { return this.ChequeStatusForm.get('VoucherNo'); }
  get VoucherDate() { return this.ChequeStatusForm.get('VoucherDate'); }
  get ProjectId() { return this.ChequeStatusForm.get('ProjectId'); }
  get FromLedger() { return this.ChequeStatusForm.get('FromLedger'); }
  get ToLedger() { return this.ChequeStatusForm.get('ToLedger'); }
  get Remark() { return this.ChequeStatusForm.get('Remark'); }
  

}

