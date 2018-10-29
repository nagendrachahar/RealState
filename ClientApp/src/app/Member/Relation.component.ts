import { Component, Inject, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import { MemberService } from './../services/Member.service';


@Component({
  selector: 'Relation',
  templateUrl: './Relation.component.html'
})
export class RelationComponent implements OnInit {

  Relationform: FormGroup;
  errorMessage: any;
  Message: string = '';
  MessageType: string = 'warning';
  SaveBtn: string = "Save";

  RelationList = [];

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

    this.Relationform = this._fb.group({

      RelationId: [''],
      RelationName: [''],
    })

    this.FillForm(0);

  }
  public FillForm(Id: number) {
    this.service.GetOneRelation(Id)
      .subscribe((data) => {
        if (Id == 0) {
          this.SaveBtn = "Save";
        }
        else {
          this.SaveBtn = "Update";
        }
        this.Relationform.controls['RelationId'].setValue(data[0].RelationId);
        this.Relationform.controls['RelationName'].setValue(data[0].RelationName);
      }, error => this.errorMessage = error);
    this.fillRelation();
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
    this.service.SaveRelation(this.Relationform.value)
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


  public Delete(RelationId: number) {
    if (confirm("Are you sure to delete this record....!")) {
      this.service.DeleteRelation(RelationId)
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
      this.FillForm(0);
    }
  }
   

  fillRelation() {
    this.service.FillRelation().subscribe((data) => {
      this.RelationList = data;
    });
  }

  get RelationId() { return this.Relationform.get('RelationId'); }
  get RelationName() { return this.Relationform.get('RelationName'); }
}
