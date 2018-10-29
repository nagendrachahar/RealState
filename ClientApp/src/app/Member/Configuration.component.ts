import { Component, Inject, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'Configuration',
  templateUrl: './Configuration.component.html'
})
export class ConfigurationComponent implements OnInit {
  errorMessage: any;
  Message: string = '';
  MessageType: string = 'warning';
  SaveBtn: string = "Save";

  isSeries: boolean = true;
  isPrefrenceKey: boolean = false;
  isRelation: boolean = false;

  ngOnInit() {
    this.MessageType = 'warning';
    this.Message = "Please Wait Loading ...!";
  }

  HideAll() {
    this.isSeries = false;
    this.isPrefrenceKey = false;
  }

  ShowSeries() {

    this.HideAll();
    this.isSeries = true;

  }

  ShowPrefrenceKey() {
    this.HideAll();
    this.isPrefrenceKey = true;

  }
  ShowRelation() {

    this.HideAll();
    this.isRelation = true;

  }


}
