import { Component, Inject, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MemberService } from './../services/Member.service';
import * as $ from 'jquery';

@Component({
    selector: 'RunSql',
    templateUrl: './RunSql.component.html'
})
export class RunSqlComponent implements OnInit {

    RunSqlform: FormGroup;
    errorMessage: any;
    Message: string = '';
    MessageType: string = 'warning';

    isDisplay: boolean = false;

    RunSqlList = []; //To Fill Table

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
        var today = new Date();

        this.RunSqlform = this._fb.group({
            RunSqlId: [''],
            txtQuery: ['', Validators.required],
            RunSqlDate: [today.toISOString().substr(0, 10)],
            RunSqlSetId: [''],
        })
    } 

    public Close() {
        this._router.navigate(['/Home']);
    }

    generateArray(obj) {
        return Object.keys(obj).map((key) => { return obj[key] });
    }

    generateKey(obj) {
        return Object.keys(obj).map((key) => { return key });
    }
    
    public Execute() {
        //debugger;
        var SearchQuery = this.RunSqlform.value.txtQuery;
        if (SearchQuery.length <= 0) {
            this.Message = " Please Enter Query to Search ...! ";
            this.MessageType = 'warning';
        }
        else {
          this.service.GetSqlQueryResult(SearchQuery)
                .subscribe((data) => {
                    //console.log(data)
                    this.isDisplay = true;
                  this.RunSqlList = data;
                  this.Message = data.length+" Record Found ...! ";
                  this.MessageType = 'success';
                }, error => this.errorMessage = error);
        }
        $(document).ready(function () {
            $(".message").show();
        });
    }


    get txtQuery() { return this.RunSqlform.get('txtQuery'); }
}
