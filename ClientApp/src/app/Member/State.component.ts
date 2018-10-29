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
//import 'datatables.net-buttons/js/Select2.js';


@Component({
    selector: 'State',
    templateUrl: './State.component.html'
})
export class StateComponent implements OnInit {
  Select1: any;
  dataTable: any;
    Stateform: FormGroup;
    errorMessage: any;
    Message: string = '';
  MessageType: string = 'warning';
  SaveBtn: string = "Save";

    StateList = [];
    CountryList = [];

    ngOnInit() {
      this.MessageType = 'warning';
      this.Message = "Please Wait Loading ...!";

      //$(document).ready(function () {

      //  const selec: any = $('#e1');
      //  this.Select1 = selec.select2();

      //  $(".select2-container").css("width", "100%");
        
      //});
    }

  constructor(
    http: Http,
    @Inject('BASE_URL') baseUrl: string,
    private service: MemberService,
    private _avRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _router: Router,
      private cd: ChangeDetectorRef
    ){

    this.Stateform = this._fb.group({

      StateId: [''],
      StateName: [''],
      CountryId: [''],
    })

    this.FillForm(0);
    this.fillCountry();

  }
  public FillForm(Id: number){

    if (Id != 0) {
      this.dataTable.destroy();
    }

    this.service.GetOneState(Id)
      .subscribe((data) => {
        if (Id == 0) {
          this.SaveBtn = "Save";
        }
        else {
          this.SaveBtn = "Update";
        }
        this.Stateform.controls['StateId'].setValue(data[0].StateId);
        this.Stateform.controls['StateName'].setValue(data[0].StateName);
        this.Stateform.controls['CountryId'].setValue(data[0].CountryId);
      }, error => this.errorMessage = error);
    this.fillState();
  }

  public Reset() {
    this.FillForm(0);
    this.Message = " Form clear ...! ";
    this.MessageType = 'success';
    $(document).ready(function () {
      $(".message").show();
    });
  }

  public Close() {
    this._router.navigate(['/Home']);
  }

    public save() {
      this.service.SaveState(this.Stateform.value)
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
  

  public Delete(StateId: number) {
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
      this.service.DeleteState(StateId)
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
    fillCountry() {
        this.service.FillCountry().subscribe((data) => {
            this.CountryList = data;
        });
    }

    get StateId() { return this.Stateform.get('StateId'); }
    get StateName() { return this.Stateform.get('StateName'); }
    get CountryId() { return this.Stateform.get('CountryId'); }
}
