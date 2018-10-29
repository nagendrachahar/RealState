import { Component, Inject, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import { MemberService } from './../services/Member.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'Membership',
  templateUrl: './Membership.component.html'
})
export class MembershipComponent implements OnInit {

  Memberform: FormGroup;
  errorMessage: any;
  Message: string = '';
  MessageType: string = 'warning';
  SaveBtn: string = "Save";

  MemberList = [];
  BranchList = [];
  CityList = [];
  StateList = [];
  RelationList = [];

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

    this.Memberform = this._fb.group({

      MemberId: [''],
      MemberCode: [''],
      BranchId: [''],
      MemberName: [''],
      FatherName: [''],
      MotherName: [''],
      DOB: [''],
      DOJ: [''],
      Gender: [''],
      Aadhar: [''],
      PAN: [''],
      ContactNo: [''],
      EmailId: [''],
      Address: [''],
      StateId: [''],
      CityId: [''],
      Pincode: [''],
      NomineeName: [''],
      NomineeDOB: [''],
      RelationId: [''],
      EmployeeCode: [''],
      EmployeeId:['']
    })

    this.FillForm(0);
    this.fillState();
    this.fillCity(0);
    this.fillBranch();
    this.fillRelation();

  }
  public FillForm(Id: number) {
    this.service.GetOneMember(Id)
      .subscribe((data) => {
        console.log(data);
        if (Id == 0) {
          this.SaveBtn = "Save";
        }
        else {
          this.SaveBtn = "Update";
        }
        this.Memberform.controls['MemberId'].setValue(data[0].MemberId);
        this.Memberform.controls['MemberCode'].setValue(data[0].MemberCode);
        this.Memberform.controls['BranchId'].setValue(data[0].BranchId);
        this.Memberform.controls['MemberName'].setValue(data[0].MemberName);
        this.Memberform.controls['FatherName'].setValue(data[0].FatherName);
        this.Memberform.controls['MotherName'].setValue(data[0].MotherName);        
        this.Memberform.controls['DOB'].setValue(this.datePipe.transform(data[0].DOB, 'yyyy-MM-dd'));
        this.Memberform.controls['DOJ'].setValue(this.datePipe.transform(data[0].DOJ, 'yyyy-MM-dd'));
        this.Memberform.controls['Gender'].setValue(data[0].GenderId);
        this.Memberform.controls['Aadhar'].setValue(data[0].Aadhar);
        this.Memberform.controls['PAN'].setValue(data[0].PAN);
        this.Memberform.controls['ContactNo'].setValue(data[0].ContactNo);
        this.Memberform.controls['EmailId'].setValue(data[0].EmailId);
        this.Memberform.controls['StateId'].setValue(data[0].StateId);
        this.fillCity(data[0].StateId);
        this.Memberform.controls['CityId'].setValue(data[0].CityId);
        this.Memberform.controls['Pincode'].setValue(data[0].Pincode);
        this.Memberform.controls['NomineeName'].setValue(data[0].NomineeName);
        this.Memberform.controls['NomineeDOB'].setValue(this.datePipe.transform(data[0].NomineeDOB, 'yyyy-MM-dd'));
        this.Memberform.controls['RelationId'].setValue(data[0].NomineeRelationId);
        this.Memberform.controls['EmployeeCode'].setValue(data[0].EmployeeCode);
        this.Memberform.controls['EmployeeId'].setValue(data[0].IntroducerId);
      }, error => this.errorMessage = error);
  }

  public Reset() {
    this.FillForm(0);
    this.Message = " Member Record Refersh ...! ";
    this.MessageType = 'success';
    $(document).ready(function () {
      $(".message").show();
    });
  }

  public Close() {
    this._router.navigate(['/Home']);
  }

  public save() {
    this.service.SaveMember(this.Memberform.value)
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

  fillBranch() {
    this.service.GetBranch().subscribe((data) => {
      this.BranchList = data;
    });
  }

  fillRelation() {
    this.service.FillRelation().subscribe((data) => {
      this.RelationList = data;
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


  get MemberId() { return this.Memberform.get('MemberId'); }
  get MemberCode() { return this.Memberform.get('MemberCode'); }
  get BranchId() { return this.Memberform.get('BranchId'); }
  get MemberName() { return this.Memberform.get('MemberName'); }
  get FatherName() { return this.Memberform.get('FatherName'); }
  get MotherName() { return this.Memberform.get('MotherName'); }
  get DOB() { return this.Memberform.get('DOB'); }
  get DOJ() { return this.Memberform.get('DOJ'); }
  get Gender() { return this.Memberform.get('Gender'); }
  get Aadhar() { return this.Memberform.get('Aadhar'); }
  get PAN() { return this.Memberform.get('PAN'); }
  get ContactNo() { return this.Memberform.get('ContactNo'); }
  get EmailId() { return this.Memberform.get('EmailId'); }
  get Address() { return this.Memberform.get('Address'); }
  get StateId() { return this.Memberform.get('StateId'); }
  get CityId() { return this.Memberform.get('CityId'); }
  get Pincode() { return this.Memberform.get('Pincode'); }
  get NomineeName() { return this.Memberform.get('NomineeName'); }
  get NomineeDOB() { return this.Memberform.get('NomineeDOB'); }
  get RelationId() { return this.Memberform.get('RelationId'); }
  get EmployeeCode() { return this.Memberform.get('EmployeeCode'); }
  get EmployeeId() { return this.Memberform.get('EmployeeId'); }
}

