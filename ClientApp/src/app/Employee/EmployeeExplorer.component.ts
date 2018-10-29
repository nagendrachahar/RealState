import { Component, ChangeDetectorRef } from '@angular/core';
import { EmployeeService } from './../services/Employee.service';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/dataTables.buttons.js';
import 'datatables.net-buttons/js/buttons.print.js';

@Component({
    selector: 'EmployeeExplorer',
    templateUrl: './EmployeeExplorer.component.html'
})

export class EmployeeExplorerComponent {
  employeeExplorer = [];
  dataTable: any;

  Message: string = '';
  MessageType: string = 'warning';
  errorMessage: any;

  constructor(private _employeeService: EmployeeService,
    private cd: ChangeDetectorRef) {

    this.Message = "Please Wait...";
    this.FillTable();
  }

  public FillTable() {

    this._employeeService.FillEmployeeExplorer().subscribe((data) => {
      this.employeeExplorer = data;

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
    }, error => console.error(error));


  }
  
  public Delete(EmployeeId: number) {
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
      this._employeeService.DeleteEmployee(EmployeeId)
        .subscribe((data) => {
          this.Message = data[0].Message;
          if (data[0].MessageType == 1) {

            this.dataTable.destroy();

            this.FillTable();

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


}

