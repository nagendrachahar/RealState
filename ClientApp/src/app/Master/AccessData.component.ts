import { Component, ChangeDetectorRef } from '@angular/core';
import { EmployeeService } from './../services/Employee.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MemberService } from './../services/Member.service';
import * as $ from 'jquery';

@Component({
    selector: 'AccessData',
    templateUrl: './AccessData.component.html',
    styleUrls: ['./AccessData.css']
})

export class AccessDataComponent {
  
  UserPermission: FormGroup;
  treeView: any;
  MenuList = [];
  UserList = [];
  dataTable: any;
  Message: string = '';
  MessageType: string = 'warning';
  errorMessage: any;
  

  constructor(private _employeeService: EmployeeService, private _memberService: MemberService,
    private cd: ChangeDetectorRef, private _fb: FormBuilder,) {

    this.UserPermission = this._fb.group({

      UserId: [0],

    });


  
    
    this.Message = "Please Wait...";
    this.FillTable();
    this.FillUser();

  }
  

  public FillUser() {

    this._memberService.FillUsers().subscribe((data) => {
      this.UserList = data;
      console.log(data);
    }, error => console.error(error));

  }

  SaveFlag(MenuId: number) {
    var UserId = this.UserPermission.controls['UserId'].value;
    if (UserId > 0) {
      this._memberService.Save_SavePermission(MenuId, UserId).subscribe((data) => {
        console.log(data);
        this.Message = data[0].Message;
        if (data[0].MessageType == 1) {
          this.MessageType = 'success';
        }
        else {
          this.MessageType = 'warning';
        }
      }, error => this.errorMessage = error);
    }
    else {
      this.Message = 'Please Select User First';
      this.MessageType = 'warning';
    }
    
    $(document).ready(function () {
      $(".message").show();
    });
  }

  UpdateFlag(MenuId: number) {
    var UserId = this.UserPermission.controls['UserId'].value;
    if (UserId > 0) {
      this._memberService.Save_UpdatePermission(MenuId, UserId).subscribe((data) => {
        console.log(data);
        this.Message = data[0].Message;
        if (data[0].MessageType == 1) {
          this.MessageType = 'success';
        }
        else {
          this.MessageType = 'warning';
        }
      }, error => this.errorMessage = error);
    }
    else {
      this.Message = 'Please Select User First';
      this.MessageType = 'warning';
    }

    $(document).ready(function () {
      $(".message").show();
    });
  }

  DeleteFlag(MenuId: number) {
    var UserId = this.UserPermission.controls['UserId'].value;
    if (UserId > 0) {
      this._memberService.Save_DeletePermission(MenuId, UserId).subscribe((data) => {
        console.log(data);
        this.Message = data[0].Message;
        if (data[0].MessageType == 1) {
          this.MessageType = 'success';
        }
        else {
          this.MessageType = 'warning';
        }
      }, error => this.errorMessage = error);
    }
    else {
      this.Message = 'Please Select User First';
      this.MessageType = 'warning';
    }

    $(document).ready(function () {
      $(".message").show();
    });
  }

  ViewFlag(MenuId: number) {
    var UserId = this.UserPermission.controls['UserId'].value;
    if (UserId > 0) {
      this._memberService.Save_ViewPermission(MenuId, UserId).subscribe((data) => {
        console.log(data);
        this.Message = data[0].Message;
        if (data[0].MessageType == 1) {
          this.MessageType = 'success';
        }
        else {
          this.MessageType = 'warning';
        }
      }, error => this.errorMessage = error);
    }
    else {
      this.Message = 'Please Select User First';
      this.MessageType = 'warning';
    }

    $(document).ready(function () {
      $(".message").show();
    });
  }


  UserChange(UserIdd: number) {
    console.log(UserIdd);
    this.FillTable();
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

  public FillTable() {

    this._employeeService.FillMenuTable(this.UserPermission.controls['UserId'].value).subscribe((data) => {
        this.MenuList = data;

      console.log(data);

      $(document).ready(function () {

        //$(".caret").click(function () {
        //  this.pa
        //  $("p").toggle();
        //});
        var toggler = document.getElementsByClassName("carett");
        var i;

        for (i = 0; i < toggler.length; i++) {

          toggler[i].addEventListener("click", function () {

            this.parentElement.querySelector(".nestedd").classList.toggle("activee");
            this.classList.toggle("caret-downn");

            console.log("Hello");

          });

        }
      });
      
      }, error => console.error(error));
      
  }

  getParent() {
    return this.MenuList.filter((item) => item.ParentID === 0);
  }

  getChild(menuId: number) {
    return this.MenuList.filter((item) => item.ParentID === menuId);
  }


  get UserId() { return this.UserPermission.get('UserId'); }
  
}

