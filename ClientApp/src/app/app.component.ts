import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberService } from './services/Member.service';
import { EmployeeService } from './services/Employee.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  UserName: string = '';
  FinancialYearName: string = '';
  CompanyName: string = '';
  BranchName: string = '';
  errorMessage: any;

  MenuList = [];
  

  ngOnInit() {

  }

  constructor(
    http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private _memberService: MemberService,
    private _EmployeeService: EmployeeService,
    private _fb: FormBuilder,
    private _router: Router
  ){
    http.get(baseUrl + 'api/Masters/GetSession').subscribe(data => {
      if (data[0].IsUser == 1) {
        this.UserName = data[0].UserName;
        this.FinancialYearName = data[0].FinancialYearName;
        this.CompanyName = data[0].CompanyName;
        this.BranchName = data[0].BranchName;

        this.getMenu();
      }
      else {
        window.location.href = "Login";
      }
    }, error => console.error(error));
  }


  checkChild(data, id) {

    var isChild = false;

    if (data.length > 0) {

      for (var i = 0; i < data.length; i++) {

        if (data[i].ParentID == id) {

          isChild = true;
        }

      }

    }

    return isChild;

  }
  
  getMenu(){

    console.log("hel");

    this._EmployeeService.FillMenu().subscribe((data) => {

      this.MenuList = data;
      
      console.log(data);
      
    }, error => console.error(error));
  }

  getParent() {
    return this.MenuList.filter((item) => item.ParentID === 0);
  }

  getChild(menuId: number) {
    return this.MenuList.filter((item) => item.ParentID === menuId);
  }
  
}
