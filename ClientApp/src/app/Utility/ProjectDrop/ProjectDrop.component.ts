import { Component, Inject, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import { MemberService } from './../../services/Member.service';


@Component({
    selector: 'Project-drop',
  template: `<div [formGroup]="project" ><select formControlName="ProjectId" class="full-width">
                  <option value="0"><:--Select Project--:></option>
                  <option *ngFor="let P of ProjectList " value="{{P.ProjectId}}">{{P.ProjectName}}</option>
             </select></div>`
})

export class ProjectDropComponent implements OnInit {

  @Input() project: FormGroup;
    //dataTable: any;
    errorMessage: any;
    //Message: string = '';
    //MessageType: string = 'warning';
    //SaveBtn: string = "Save";
    
    //SectorList = [];
    ProjectList = [];

    ngOnInit(){
      //this.MessageType = 'warning';
      //this.Message = "Please Wait Loading ...!";

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

      //this.Sectorform = this._fb.group({
      //  SectorId: [0],
      //  ProjectId: [0],
      //  SectorName: ['']
      //});

      //this.FillForm(0);
      this.fillProject();
      
  }

  fillProject() {
    this.service.FillProject().subscribe((data) => {
      this.ProjectList = data;

      console.log(data);
    });
  }

  //public FillForm(Id: number) {

  //  if (Id != 0) {
  //    this.dataTable.destroy();
  //  }

  //  this.service.GetOneSector(Id)
  //      .subscribe((data) => {
  //        if (Id == 0) {
  //          this.SaveBtn = "Save";
  //        }
  //        else {
  //          this.SaveBtn = "Update";
  //        }
  //        this.Sectorform.controls['SectorId'].setValue(data[0].SectorId);
  //        this.Sectorform.controls['ProjectId'].setValue(data[0].ProjectId);
  //        this.Sectorform.controls['SectorName'].setValue(data[0].SectorName);
  //      }, error => this.errorMessage = error);
  //  this.fillSector();

  //  }

    //public Reset() {
    //  this.FillForm(0);
    //  this.Message = " Form clear ...! ";
    //  this.MessageType = 'success';
    //  $(document).ready(function () {
    //    $(".message").show();
    //  });
    //}

    public Close() {
      this._router.navigate(['/Home']);
    }

    //public save() {
    //  this.service.SaveSector(this.Sectorform.value)
    //        .subscribe((data) => {
    //            this.Message = data[0].Message;
    //          if (data[0].MessageType == 1) {
    //                this.dataTable.destroy();
    //                this.FillForm(0);
    //                this.MessageType = 'success';
    //            }
    //            else {
    //                this.MessageType = 'warning';
    //            }
    //        }, error => this.errorMessage = error);

    //    $(document).ready(function () {
    //        $(".message").show();
    //    });
    //}

  
  //public Delete(SectorId: number) {
  //  var body = document.getElementsByTagName('body')[0];
  //  var overlay = document.createElement('div');
  //  overlay.className = 'myConfirm';
  //  var box = document.createElement('div');
  //  var boxchild = document.createElement('div');
  //  var p = document.createElement('p');
  //  p.appendChild(document.createTextNode("Are you sure"));
  //  boxchild.appendChild(p);
  //  var yesButton = document.createElement('button');
  //  var noButton = document.createElement('button');
  //  yesButton.appendChild(document.createTextNode('Yes'));
  //  yesButton.addEventListener('click', () => {
  //    this.service.DeleteSector(SectorId)
  //      .subscribe((data) => {
  //        this.Message = data[0].Message;
  //        if (data[0].MessageType == 1) {

  //          this.dataTable.destroy();

  //          this.FillForm(0);

  //          this.MessageType = 'success';
  //        }
  //        else {
  //          this.MessageType = 'warning';
  //        }
  //      }, error => this.errorMessage = error);

  //    $(document).ready(function () {
  //      $(".message").show();
  //    });

  //    body.removeChild(overlay);
  //  }, false);

  //  noButton.appendChild(document.createTextNode('No'));
  //  noButton.addEventListener('click', () => {

  //    body.removeChild(overlay);

  //  }, false);
  //  boxchild.appendChild(yesButton);
  //  boxchild.appendChild(noButton);
  //  box.appendChild(boxchild);
  //  overlay.appendChild(box)
  //  body.appendChild(overlay);

  //  }


    //fillSector() {
    //  this.service.FillSector().subscribe((data) => {
    //    this.SectorList = data;
    //    console.log(data);
    //    this.cd.detectChanges();

    //    const table: any = $('#tablee');

    //    this.dataTable = table.DataTable({
    //      "dom": '<Bf<t>ip>',
    //      //"dom": '<f<t>ip>',
    //      "pageLength": 25
    //        //buttons: [
    //        //  'print'
    //        //]
    //      });
    //  });
    //}

 

  
    //get SectorId() { return this.Sectorform.get('SectorId'); }
    //get ProjectId() { return this.Sectorform.get('ProjectId'); }
    //get SectorName() { return this.Sectorform.get('SectorName'); }

}
