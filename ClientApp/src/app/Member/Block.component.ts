import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { MemberService } from './../services/Member.service';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/dataTables.buttons.js';
import 'datatables.net-buttons/js/buttons.print.js';


@Component({
    selector: 'Block',
    templateUrl: './Block.component.html'
})

export class BlockComponent implements OnInit {
  
    dataTable: any;
    Blockform: FormGroup;
    errorMessage: any;
    Message: string = '';
    MessageType: string = 'warning';
    SaveBtn: string = "Save";
    
    BlockList = [];
    SectorList = [];

    
    ngOnInit(){
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
      ){

      this.Blockform = this._fb.group({
        BlockId: [0],
        SectorId: [0],
        BlockName: ['']
      });

      this.FillForm(0);
      this.fillSector();
      
    }
  public FillForm(Id: number) {

    if (Id != 0) {
      this.dataTable.destroy();
    }

    this.service.GetOneBlock(Id)
        .subscribe((data) => {
          if (Id == 0) {
            this.SaveBtn = "Save";
          }
          else {
            this.SaveBtn = "Update";
          }
          this.Blockform.controls['BlockId'].setValue(data[0].BlockId);
          this.Blockform.controls['SectorId'].setValue(data[0].SectorId);
          this.Blockform.controls['BlockName'].setValue(data[0].BlockName);
        }, error => this.errorMessage = error);
    this.fillBlock();

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
      this.service.SaveBlock(this.Blockform.value)
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

  
  public Delete(BlockId: number) {
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
      this.service.DeleteBlock(BlockId)
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

    fillBlock() {
      this.service.FillBlock().subscribe((data) => {
        this.BlockList = data;
        console.log(data);
        this.cd.detectChanges();

        const table: any = $('#tablee');

        this.dataTable = table.DataTable({
          "dom": '<Bf<t>ip>',
          //"dom": '<f<t>ip>',
          "pageLength": 25
            //buttons: [
            //  'print'
            //]
          });
      });
    }

  fillSector() {
    this.service.FillSector().subscribe((data) => {
        this.SectorList = data;
        console.log(data);
      });
    }

  
  get BlockId() { return this.Blockform.get('BlockId'); }
  get SectorId() { return this.Blockform.get('SectorId'); }
  get BlockName() { return this.Blockform.get('BlockName'); }

  
}
