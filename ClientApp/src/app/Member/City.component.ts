import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import { MemberService } from './../services/Member.service';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/dataTables.buttons.js';
import 'datatables.net-buttons/js/buttons.print.js';

@Component({
  selector: 'City',
  templateUrl: './City.component.html'
})
export class CityComponent implements OnInit {

  dataTable: any;
  Cityform: FormGroup;
  errorMessage: any;
  Message: string = '';
  MessageType: string = 'warning';
  SaveBtn: string = "Save";

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
    private cd: ChangeDetectorRef
  ) {

    this.Cityform = this._fb.group({

      CityId: [''],
      CityName: [''],
      StateId: [''],
    })

    this.FillForm(0);
    this.fillState();

  }
  public FillForm(Id: number) {

    if (Id != 0) {
      this.dataTable.destroy();
    }

    this.service.GetOneCity(Id)
      .subscribe((data) => {
        if (Id == 0) {
          this.SaveBtn = "Save";
        }
        else {
          this.SaveBtn = "Update";
        }
        this.Cityform.controls['CityId'].setValue(data[0].CityId);
        this.Cityform.controls['CityName'].setValue(data[0].CityName);
        this.Cityform.controls['StateId'].setValue(data[0].StateId);
      }, error => this.errorMessage = error);
    this.fillCity();    
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
    this.service.SaveCity(this.Cityform.value)
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
  

  public Delete(CityId: number) {
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
      this.service.DeleteCity(CityId)
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



  fillState() {
    this.service.FillState().subscribe((data) => {
      this.StateList = data;
    });


  }

  fillCity() {
    this.service.FillCity().subscribe((data) => {
      this.CityList = data;

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

  get CityId() { return this.Cityform.get('CityId'); }
  get CityName() { return this.Cityform.get('CityName'); }
  get StateId() { return this.Cityform.get('StateId'); }
}
