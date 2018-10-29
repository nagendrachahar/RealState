import { Component, Inject, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import { MemberService } from './../services/Member.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'Company',
  templateUrl: './Company.component.html'
})
export class CompanyComponent implements OnInit {

  Companyform: FormGroup;
  errorMessage: any;
  Message: string = '';
  MessageType: string = 'warning';
  SaveBtn: string = "Save";

  CompanyList = [];
  CityList = [];
  StateList = [];

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

    this.Companyform = this._fb.group({
      CompanyCode: [''],
      CompanyName: [''],
      CIN: [''],
      PAN: [''],
      Website: [''],
      EmailId: [''],
      ContactNo: [''],
      RegistrationDate: [''],
      Address: [''],
      StateId: [''],
      CityId: [''],
      Pincode: [''],
    })

    this.FillForm();
    this.fillState();
    this.fillCity(0);

  }
  public FillForm() {
    this.service.GetCompany()
      .subscribe((data) => {
        this.SaveBtn = "Update";
        this.Companyform.controls['CompanyCode'].setValue(data[0].companyCode);
        this.Companyform.controls['CompanyName'].setValue(data[0].companyName);
        this.Companyform.controls['CIN'].setValue(data[0].cin);
        this.Companyform.controls['PAN'].setValue(data[0].pan);
        this.Companyform.controls['Website'].setValue(data[0].website);
        this.Companyform.controls['EmailId'].setValue(data[0].emailId);
        this.Companyform.controls['ContactNo'].setValue(data[0].contactNo);
        this.Companyform.controls['RegistrationDate'].setValue(this.datePipe.transform(data[0].registrationDate,'yyyy-MM-dd'));
        this.Companyform.controls['Address'].setValue(data[0].address);
        this.Companyform.controls['StateId'].setValue(data[0].stateId);
        this.fillCity(data[0].stateId);
        this.Companyform.controls['CityId'].setValue(data[0].cityId);
        this.Companyform.controls['Pincode'].setValue(data[0].pincode);
      }, error => this.errorMessage = error);
  }

  public Reset() {
    this.FillForm();
    this.Message = " Company Record Refersh ...! ";
    this.MessageType = 'success';
    $(document).ready(function () {
      $(".message").show();
    });
  }

  public Close() {
    this._router.navigate(['/Home']);
  }

  public save() {
    this.service.SaveCompany(this.Companyform.value)
      .subscribe((data) => {
        this.Message = data[0].Message;
        if (data[0].MessageType == 1) {
          this.FillForm();
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
  get CompanyCode() { return this.Companyform.get('CompanyCode'); }
  get CompanyName() { return this.Companyform.get('CompanyName'); }
  get CIN() { return this.Companyform.get('CIN'); }
  get PAN() { return this.Companyform.get('PAN'); }
  get Website() { return this.Companyform.get('Website'); }
  get EmailId() { return this.Companyform.get('EmailId'); }
  get ContactNo() { return this.Companyform.get('ContactNo'); }
  get RegistrationDate() { return this.Companyform.get('RegistrationDate'); }
  get Address() { return this.Companyform.get('Address'); }
  get StateId() { return this.Companyform.get('StateId'); }
  get City() { return this.Companyform.get('CityId'); }
  get Pincode() { return this.Companyform.get('Pincode'); }
}

