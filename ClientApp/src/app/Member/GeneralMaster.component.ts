import { Component, Inject, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'GeneralMaster',
  templateUrl: './GeneralMaster.component.html'
})
export class GeneralMasterComponent implements OnInit {
  errorMessage: any;
  Message: string = '';
  MessageType: string = 'warning';
  SaveBtn: string = "Save";

  isState: boolean = true;
  isCity: boolean = false;
  isBranch: boolean = false;
  isSegment: boolean = false;
  isPlotType: boolean = false;
  isBank: boolean = false;
  isVisitorPurpose: boolean = false;
  isDepartment: boolean = false;
  isDesignation: boolean = false;
  isProject: boolean = false;
  isSector: boolean = false;
  isBlock: boolean = false;
  isRate: boolean = false;
  isAccountGroup: boolean = false;
  isAccountLedger: boolean = false;
  isPlotDetail: boolean = false;
  
  ngOnInit() {
    this.MessageType = 'warning';
    this.Message = "Please Wait Loading ...!";
  }

  HideAll() {
    this.isState = false;
    this.isCity = false;
    this.isBranch = false;
    this.isSegment = false;
    this.isPlotType = false;
    this.isBank = false;
    this.isVisitorPurpose = false;
    this.isDepartment = false;
    this.isDesignation = false;
    this.isProject = false;
    this.isSector = false;
    this.isBlock = false;
    this.isRate = false;
    this.isAccountGroup = false;
    this.isAccountLedger = false;
    this.isPlotDetail = false;

  }

  ShowState() {
    this.HideAll();
    this.isState = true;
  }

  ShowCity() {
    this.HideAll();
    this.isCity = true;
  }
  ShowBranch() {
    this.HideAll();
    this.isBranch = true;
  }

  ShowSegment() {
    this.HideAll();
    this.isSegment = true;
  }

  ShowPlotType() {
    this.HideAll();
    this.isPlotType = true;
  }

  ShowBank() {
    this.HideAll();
    this.isBank = true;
  }

  ShowVisitorPurpose() {
    this.HideAll();
    this.isVisitorPurpose = true;
  }

  ShowDepartment() {
    this.HideAll();
    this.isDepartment = true;
  }

  ShowDesignation() {
    this.HideAll();
    this.isDesignation = true;
  }

  ShowProject() {
    this.HideAll();
    this.isProject = true;
  }

  ShowSector() {
    this.HideAll();
    this.isSector = true;
  }

  ShowBlock() {
    this.HideAll();
    this.isBlock = true;
  }

  ShowRate() {
    this.HideAll();
    this.isRate = true;
  }

  ShowAccountGroup() {
    this.HideAll();
    this.isAccountGroup = true;
  }

  ShowAccountLedger() {
    this.HideAll();
    this.isAccountLedger = true;
  }

  ShowPlotDetail() {
    this.HideAll();
    this.isPlotDetail = true;
  }

  
}
