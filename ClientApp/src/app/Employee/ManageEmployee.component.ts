import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import { MemberService } from './../services/Member.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'Employee',
  templateUrl: './ManageEmployee.component.html'
})
export class ManageEmployeeComponent implements OnInit {

  Employeeform: FormGroup;
  errorMessage: any;
  Message: string = '';
  MessageType: string = 'warning';
  SaveBtn: string = "Save";
  ProfilePic: string = "blankprofile"

  EmployeeIdForDocument: number = 0;

  ReportingName: string = "";

  DepartmentList = [];
  DesignationList = [];
  CityList = [];
  StateList = [];
  BranchList = [];
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
    private _router: Router,
    private _fb: FormBuilder,
    public datePipe: DatePipe,
    private cd: ChangeDetectorRef
  ) {

    this.Employeeform = this._fb.group({
      SearchCode: [''],
      EmployeeId: [0],
      EmployeeCode: [''],
      EmployeeName: [''],
      FatherHusbandName: [''],
      MotherName: [''],
      DOJ: [''],
      BranchId:[0],
      DepartmentId: [0],
      DesignationId: [0],
      WorkLocation: [''],
      ReportingPersonCode: [''],
      ReportingPerson: [''],
      DOB: [''],
      ContactNo: [''],
      EmailId: [''],
      MaritalStatus: [''],
      Qualification: [''],
      Address: [''],
      StateId: [0],
      CityId: [0],
      Pincode: [''],
      Photo: [''],
      PersonName1: [''],
      ContactNo1: [''],
      RelationId1: [0],
      PersonName2: [''],
      ContactNo2: [''],
      RelationId2: [0]
    })
    
    this.fillState();
    this.fillCity(0);
    this.fillDepartment();
    this.fillDesignation();
    this.fillBranch();
    this.fillRelation();

    this._avRoute.params.subscribe(params => {
      
      this.GetEmployeeId(params['id']).subscribe((data) => {
        this.FillForm(data[0].EmployeeId);
      });
    
    });
  }

  ChangePic(event) {
    event.target.src = "assets/Upload/Employee/blankprofile.jpg";
  }

  onFileChange(event) {
    const reader = new FileReader();
    var pic;
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.Employeeform.patchValue({
          Photo: reader.result
        });
        pic = reader.result
        $(document).ready(function () {
          $("#ProfileImg").attr('src', pic);
        });
        
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }


  public FillForm(Id: number) {
    this.service.GetOneEmployee(Id)
      .subscribe((data) => {

        console.log(data);

        if (Id == 0) {
          this.SaveBtn = "Save";
        }
        else {
          this.SaveBtn = "Update";
        }

        this.EmployeeIdForDocument = data[0].EmployeeId;
        this.ProfilePic = data[0].EmployeeCode;
        
        this.Employeeform.controls['EmployeeId'].setValue(data[0].EmployeeId);
        this.Employeeform.controls['EmployeeCode'].setValue(data[0].EmployeeCode);
        this.Employeeform.controls['EmployeeName'].setValue(data[0].EmployeeName);
        this.Employeeform.controls['FatherHusbandName'].setValue(data[0].FatherHusbandName);
        this.Employeeform.controls['MotherName'].setValue(data[0].MotherName);
        this.Employeeform.controls['DOJ'].setValue(this.datePipe.transform(data[0].DOJ, 'yyyy-MM-dd'));
        this.Employeeform.controls['BranchId'].setValue(data[0].BranchId);
        this.Employeeform.controls['DepartmentId'].setValue(data[0].DepartmentId);
        this.Employeeform.controls['DesignationId'].setValue(data[0].DesignationId);
        this.Employeeform.controls['WorkLocation'].setValue(data[0].WorkLocation);
        this.Employeeform.controls['ReportingPerson'].setValue(data[0].ReportingPerson);
        this.Employeeform.controls['ReportingPersonCode'].setValue(data[0].ReportingPersonCode);
        this.Employeeform.controls['DOB'].setValue(this.datePipe.transform(data[0].DOJ, 'yyyy-MM-dd'));
        this.Employeeform.controls['ContactNo'].setValue(data[0].ContactNo);
        this.Employeeform.controls['EmailId'].setValue(data[0].EmailId);
        this.Employeeform.controls['MaritalStatus'].setValue(data[0].MaritalStatus);
        this.Employeeform.controls['Qualification'].setValue(data[0].Qualification);
        this.Employeeform.controls['Address'].setValue(data[0].Address);
        this.Employeeform.controls['StateId'].setValue(data[0].StateId);
        this.fillCity(data[0].StateId);
        this.Employeeform.controls['CityId'].setValue(data[0].CityId);
        this.Employeeform.controls['Pincode'].setValue(data[0].Pincode);
        this.Employeeform.controls['PersonName1'].setValue(data[0].PersonName1);
        this.Employeeform.controls['ContactNo1'].setValue(data[0].ContactNo1);
        this.Employeeform.controls['RelationId1'].setValue(data[0].RelationId1);
        this.Employeeform.controls['PersonName2'].setValue(data[0].PersonName2);
        this.Employeeform.controls['ContactNo2'].setValue(data[0].ContactNo2);
        this.Employeeform.controls['RelationId2'].setValue(data[0].RelationId2);
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

  public Search() {
    var Code = this.Employeeform.controls['SearchCode'].value;
    this.GetEmployeeId(Code).subscribe((data) => {
      if (data[0].EmployeeId != 0) {
        this.FillForm(data[0].EmployeeId);
      }
      else {
        this.Message = "Wrong Code";
        this.MessageType = 'warning';
        $(document).ready(function () {
          $(".message").show();
        });
      }
    });
  }

  public GetEmployeeId(Code: string) {

    return this.service.GetEmployeeId(Code);

  }
  
  public save() {
    this.service.SaveEmployee(this.Employeeform.value)
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

  fillDepartment() {
    this.service.FillDepartment().subscribe((data) => {
      this.DepartmentList = data;
    });
  }

  fillDesignation() {
    this.service.FillDesignation().subscribe((data) => {
      this.DesignationList = data;
    });
  }

  fillState() {
    this.service.FillState().subscribe((data) => {
      this.StateList = data;
    });
  }

  fillBranch() {
    this.service.GetBranch().subscribe((data) => {
      this.BranchList = data;
      console.log(data);
    });
  }

  fillRelation() {
    this.service.FillRelation().subscribe((data) => {
      this.RelationList = data;
      console.log(data);
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

  getReportingPerson(Code: string) {
    this.GetEmployeeId(Code).subscribe((data) => {
      this.Employeeform.controls['ReportingPerson'].setValue(data[0].EmployeeId);
      this.ReportingName = data[0].EmployeeName;
    });
  }

  get SearchCode() { return this.Employeeform.get('SearchCode'); }
  get EmployeeId() { return this.Employeeform.get('EmployeeId'); }
  get EmployeeCode() { return this.Employeeform.get('EmployeeCode'); }
  get EmployeeName() { return this.Employeeform.get('EmployeeName'); }
  get FatherHusbandName() { return this.Employeeform.get('FatherHusbandName'); }
  get MotherName() { return this.Employeeform.get('MotherName'); }                    
  get DOJ() { return this.Employeeform.get('DOJ'); }
  get BranchId() { return this.Employeeform.get('BranchId'); }
  get DepartmentId() { return this.Employeeform.get('DepartmentId'); }
  get DesignationId() { return this.Employeeform.get('DesignationId'); }
  get WorkLocation() { return this.Employeeform.get('WorkLocation'); }
  get ReportingPersonCode() { return this.Employeeform.get('ReportingPersonCode'); }
  get ReportingPerson() { return this.Employeeform.get('ReportingPerson'); }
  get DOB() { return this.Employeeform.get('DOB'); }
  get ContactNo() { return this.Employeeform.get('ContactNo'); }
  get EmailId() { return this.Employeeform.get('EmailId'); }
  get MaritalStatus() { return this.Employeeform.get('MaritalStatus'); }
  get Qualification() { return this.Employeeform.get('Qualification'); }
  get Address() { return this.Employeeform.get('Address'); }
  get StateId() { return this.Employeeform.get('StateId'); }
  get CityId() { return this.Employeeform.get('CityId'); }
  get Pincode() { return this.Employeeform.get('Pincode'); }
  get Photo() { return this.Employeeform.get('Photo'); }
  get PersonName1() { return this.Employeeform.get('PersonName1'); }
  get ContactNo1() { return this.Employeeform.get('ContactNo1'); }
  get RelationId1() { return this.Employeeform.get('RelationId1'); }
  get PersonName2() { return this.Employeeform.get('PersonName2'); }
  get ContactNo2() { return this.Employeeform.get('ContactNo2'); }
  get RelationId2() { return this.Employeeform.get('RelationId2'); }


}

