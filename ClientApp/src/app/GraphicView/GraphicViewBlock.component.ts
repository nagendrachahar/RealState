import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from './../services/Employee.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MemberService } from './../services/Member.service';
import * as $ from 'jquery';

@Component({
    selector: 'GraphicViewBlock',
    templateUrl: './GraphicViewBlock.component.html',
})

export class GraphicViewBlockComponent {
  
  GraphicView: FormGroup;

  BlockList = [];
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

      this.FillBlock(params['id']);

    });

  }

  public FillBlock(ID) {

    this._memberService.FillBlockBySector(ID).subscribe((data) => {
      this.BlockList = data;
      console.log(data);
    }, error => console.error(error));

  }
  
  get UserId() { return this.GraphicView.get('UserId'); }
  
}

