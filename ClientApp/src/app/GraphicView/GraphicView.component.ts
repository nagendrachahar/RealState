import { Component, ChangeDetectorRef } from '@angular/core';
import { EmployeeService } from './../services/Employee.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MemberService } from './../services/Member.service';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/dataTables.buttons.js';
import 'datatables.net-buttons/js/buttons.print.js';

@Component({
    selector: 'GraphicView',
    templateUrl: './GraphicView.component.html',
})

export class GraphicViewComponent {
  
  GraphicView: FormGroup;

  ProjectList = [];
  dataTable: any;
  Message: string = '';
  MessageType: string = 'warning';
  errorMessage: any;
  BgColor: string = 'bgRed';
  

  constructor(private _employeeService: EmployeeService,
    private _memberService: MemberService,
    private cd: ChangeDetectorRef, private _fb: FormBuilder,) {

    this.GraphicView = this._fb.group({

      UserId: [0],

    });
    
    this.Message = "Please Wait...";
    this.FillProject();

  }

  public FillProject() {

    this._memberService.FillProject().subscribe((data) => {
      this.ProjectList = data;
      console.log(data);
    }, error => console.error(error));

  }
  
  get UserId() { return this.GraphicView.get('UserId'); }
  
}

