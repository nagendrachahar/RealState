import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from './../services/Employee.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MemberService } from './../services/Member.service';
import * as $ from 'jquery';

@Component({
    selector: 'GraphicViewSector',
    templateUrl: './GraphicViewSector.component.html',
})

export class GraphicViewSectorComponent {
  
  GraphicView: FormGroup;

  SectorList = [];
  Message: string = '';
  MessageType: string = 'warning';
  errorMessage: any;
  BgColor: string = 'bgRed';

  constructor(
    private _employeeService: EmployeeService,
    private _memberService: MemberService,
    private _avRoute: ActivatedRoute,
    private _router: Router,
    private cd: ChangeDetectorRef,
    private _fb: FormBuilder, ) {

    this.GraphicView = this._fb.group({

      UserId: [0],

    });
    
    this.Message = "Please Wait...";
    

    this._avRoute.params.subscribe(params => {

      this.FillSector(params['id']);

    });

  }

  public FillSector(ID) {

    this._memberService.FillSectorByProject(ID).subscribe((data) => {
      this.SectorList = data;
      console.log(data);
    }, error => console.error(error));

  }
  
  get UserId() { return this.GraphicView.get('UserId'); }
  
}

