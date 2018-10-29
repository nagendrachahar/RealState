import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import { MemberService } from './../services/Member.service';
import { DatePipe } from '@angular/common';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/dataTables.buttons.js';
import 'datatables.net-buttons/js/buttons.print.js';


@Component({
  selector: 'RateMaster',
  templateUrl: './RateMaster.component.html'
})
export class RateMasterComponent implements OnInit {

  RateMaster: FormGroup;
  dataTable: any;
  errorMessage: any;
  Message: string = '';
  MessageType: string = 'warning';
  SaveBtn: string = "Save";

  ProjectList = [];
  SectorList = [];
  BlockList = [];
  SegmentList = [];
  PlotTypeList = [];
  RateMasterList = [];

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
    public datePipe: DatePipe,
    private cd: ChangeDetectorRef
  ){
    this.RateMaster = this._fb.group({
      RateId: [0],
      ProjectId: ['', Validators.required],
      SectorId: ['', Validators.required],
      BlockId: ['', Validators.required],
      SegmentId: [0],
      PlotTypeId: [0],
      Rate: ['', [Validators.required, Validators.minLength(1)]],
    })

    this.fillProject();
    this.fillSegment();
    this.fillPlotType();
    this.FillForm(0);

  }
  public FillForm(Id: number) {

    if (Id != 0) {
      this.dataTable.destroy();
    }

    this.service.GetOneRateMaster(Id)
      .subscribe((data) => {

        if (Id > 0) {
          this.SaveBtn = "Update";
        }
        else {
          this.SaveBtn = "Save";
        }
        this.RateMaster.controls['RateId'].setValue(data[0].RateId);
        this.RateMaster.controls['ProjectId'].setValue(data[0].ProjectId);
        this.fillSector(data[0].ProjectId);
        this.RateMaster.controls['SectorId'].setValue(data[0].SectorId);
        this.fillBlock(data[0].SectorId);
        this.RateMaster.controls['BlockId'].setValue(data[0].BlockId);
        this.RateMaster.controls['SegmentId'].setValue(data[0].SegmentId);
        this.RateMaster.controls['PlotTypeId'].setValue(data[0].PlotTypeId);
        this.RateMaster.controls['Rate'].setValue(data[0].Rate);
       
      }, error => this.errorMessage = error);
    this.fillPlotDetail();
  }

  public Reset() {
    this.FillForm(0);
    this.Message = " Branch Record Refersh ...! ";
    this.MessageType = 'success';
    $(document).ready(function () {
      $(".message").show();
    });
  }

  public Close() {
    this._router.navigate(['/Home']);
  }

  //public save() {
  //  this.service.SavePlotDetail(this.PlotDetailform.value)
  //    .subscribe((data) => {
  //      this.Message = data[0].Message;
  //      if (data[0].MessageType == 1) {
  //        this.dataTable.destroy();
  //        this.FillForm(0);
  //        this.MessageType = 'success';
  //      }
  //      else {
  //        this.MessageType = 'warning';
  //      }
  //    }, error => this.errorMessage = error);

  //  $(document).ready(function () {
  //    $(".message").show();
  //  });
  //}

  public save() {
    this.service.verifyRateDetail(this.RateMaster.value)
      .subscribe((data) => {
        this.Message = data[0].Message;
        if (data[0].MessageType == 1) {

          this.service.SaveRateDetail(this.RateMaster.value)
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

        }
        else {
          this.MessageType = 'warning';
          this.Confirm(data[0].Message);
        }
      }, error => this.errorMessage = error);

    $(document).ready(function () {
      $(".message").show();
    });
  }

  public Confirm(message: string) {
    var body = document.getElementsByTagName('body')[0];
    var overlay = document.createElement('div');
    overlay.className = 'myConfirm';
    var box = document.createElement('div');
    var boxchild = document.createElement('div');
    var p = document.createElement('p');
    p.appendChild(document.createTextNode("Rate for Plot No. " + message + " Already defined, Do you want to Update"));
    boxchild.appendChild(p);
    var yesButton = document.createElement('button');
    var noButton = document.createElement('button');
    yesButton.appendChild(document.createTextNode('Yes'));
    yesButton.addEventListener('click', () => {

      this.service.SaveRateDetail(this.RateMaster.value)
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
    overlay.appendChild(box);
    body.appendChild(overlay);

  }


 fillProject() {
    this.service.FillProject().subscribe((data) => {

      this.ProjectList = data;

    });
  }

  ProjectChange(ProjectId: number) {
    this.fillSector(ProjectId);
  }

  fillSector(ProjectId: number) {
    this.service.FillSectorByProject(ProjectId).subscribe((data) => {

      this.SectorList = data;

    });
  }

  SectorChange(SectorId: number) {
    this.fillBlock(SectorId);
  }

  fillBlock(SectorId: number) {
    this.service.FillBlockBySector(SectorId).subscribe((data) => {

      this.BlockList = data;

    });
  }

  fillSegment() {
    this.service.FillSegment().subscribe((data) => {

      this.SegmentList = data;

    });
  }

  fillPlotType() {
    this.service.FillPlotType().subscribe((data) => {
      console.log(data);
      this.PlotTypeList = data;

    });
  }
  

  fillPlotDetail() {
    this.service.FillPlotDetail().subscribe((data) => {
      console.log(data);
      this.RateMasterList = data;

      this.cd.detectChanges();

      const table: any = $('.table');

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
  
  public Delete(PlotDetailId: number) {
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
      this.service.DeletePlotDetail(PlotDetailId)
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
  

  get RateId() { return this.RateMaster.get('RateId'); }
  get ProjectId() { return this.RateMaster.get('ProjectId'); }
  get SectorId() { return this.RateMaster.get('SectorId'); }
  get BlockId() { return this.RateMaster.get('BlockId'); }
  get SegmentId() { return this.RateMaster.get('SegmentId'); }
  get PlotTypeId() { return this.RateMaster.get('PlotTypeId'); }
  get Rate() { return this.RateMaster.get('Rate'); }

}

