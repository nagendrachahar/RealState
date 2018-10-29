import { Component, Inject, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';
import * as $ from 'jquery';
import { MemberService } from './../services/Member.service';


@Component({
  selector: 'PrefrenceKey',
  templateUrl: './PrefrenceKey.component.html'
})
export class PrefrenceKeyComponent implements OnInit {

  PrefrenceKeyform: FormGroup;
  errorMessage: any;
  Message: string = '';
  MessageType: string = 'warning';
  SaveBtn: string = "Save";

  PrefrenceKeyList = [];

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
    public datePipe: DatePipe
  ) {

    this.PrefrenceKeyform = this._fb.group({

      PrefrenceKeyId: [''],
      PrefrenceKeyName: [''],
      KeyValue: [''],
      WEF: [''],
    })

    this.FillForm(0);

  }

  public FillForm(Id: number) {
    
    this.service.GetOnePrefrenceKey(Id)
      .subscribe((data) => {
        if (Id == 0) {
          this.SaveBtn = "Save";
        }
        else {
          this.SaveBtn = "Update";
        }
        this.PrefrenceKeyform.controls['PrefrenceKeyId'].setValue(data[0].PrefrenceKeyId);
        this.PrefrenceKeyform.controls['PrefrenceKeyName'].setValue(data[0].PrefrenceKeyName);
        this.PrefrenceKeyform.controls['KeyValue'].setValue(data[0].KeyValue);
        this.PrefrenceKeyform.controls['WEF'].setValue(this.datePipe.transform(data[0].WEF, 'yyyy-MM-dd'));
      }, error => this.errorMessage = error);

    this.fillPrefrenceKey();
  }

  public Reset() {
    this.FillForm(0);
    this.Message = " Form clear ...! ";
    this.MessageType = 'success';
    $(document).ready(function () {
      $(".message").show();
    });
  }

  public save() {
    this.service.SavePrefrenceKey(this.PrefrenceKeyform.value)
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

  
  fillPrefrenceKey() {
    this.service.FillPrefrenceKey().subscribe((data) => {
      this.PrefrenceKeyList = data;
    });
  }

  get PrefrenceKeyId() { return this.PrefrenceKeyform.get('PrefrenceKeyId'); }
  get PrefrenceKeyName() { return this.PrefrenceKeyform.get('PrefrenceKeyName'); }
  get KeyValue() { return this.PrefrenceKeyform.get('KeyValue'); }
  get WEF() { return this.PrefrenceKeyform.get('WEF'); }
}
