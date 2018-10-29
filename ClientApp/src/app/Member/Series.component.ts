import { Component, Inject, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import { MemberService } from './../services/Member.service';


@Component({
  selector: 'Series',
  templateUrl: './Series.component.html'
})
export class SeriesComponent implements OnInit {

  Seriesform: FormGroup;
  errorMessage: any;
  Message: string = '';
  MessageType: string = 'warning';
  SaveBtn: string = "Save";

  SeriesList = [];
  CombinationList = [];

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
    private _router: Router
  ) {

    this.Seriesform = this._fb.group({

      SeriesId: [''],
      SeriesName: [''],
      TableName: [''],
      ColumnName: [''],
      Prefix: [''],
      NoOfDigit: [''],
      Combination1: [''],
      Combination2: [''],
      Combination3: [''],
    })

    this.GetCombination();
    this.FillForm(0);

  }
  public FillForm(Id: number) {
    this.service.GetOneSeries(Id)
      .subscribe((data) => {
        if (Id == 0) {
          this.SaveBtn = "Save";
        }
        else {
          this.SaveBtn = "Update";
        }
        this.Seriesform.controls['SeriesId'].setValue(data[0].SeriesId);
        this.Seriesform.controls['SeriesName'].setValue(data[0].SeriesName);
        this.Seriesform.controls['TableName'].setValue(data[0].TableName);
        this.Seriesform.controls['ColumnName'].setValue(data[0].ColumnName);
        this.Seriesform.controls['Prefix'].setValue(data[0].Prefix);
        this.Seriesform.controls['NoOfDigit'].setValue(data[0].NoOfDigit);
        this.Seriesform.controls['Combination1'].setValue(data[0].Combination1);
        this.Seriesform.controls['Combination2'].setValue(data[0].Combination2);
        this.Seriesform.controls['Combination3'].setValue(data[0].Combination3);
      }, error => this.errorMessage = error);

    this.fillSeries();
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

    this.service.SaveSeries(this.Seriesform.value)
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

  public Delete(SeriesId: number) {
    if (confirm("Are you sure to delete this record....!")) {
      this.service.DeleteSeries(SeriesId)
        .subscribe((data) => {
          this.Message = data[0].Message;
          if (data[0].MessageType == 1) {
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
    this.FillForm(0);
  }

  fillSeries() {
    this.service.FillSeries().subscribe((data) => {
      this.SeriesList = data;
    });
  }

  GetCombination() {
    this.service.GetCombination().subscribe((data) => {
      this.CombinationList = data;
    });
  }

  get SeriesId() { return this.Seriesform.get('SeriesId'); }
  get SeriesName() { return this.Seriesform.get('SeriesName'); }
  get TableName() { return this.Seriesform.get('TableName'); }
  get ColumnName() { return this.Seriesform.get('ColumnName'); }
  get Prefix() { return this.Seriesform.get('Prefix'); }
  get NoOfDigit() { return this.Seriesform.get('NoOfDigit'); }
  get Combination1() { return this.Seriesform.get('Combination1'); }
  get Combination2() { return this.Seriesform.get('Combination2'); }
  get Combination3() { return this.Seriesform.get('Combination3'); }

}
