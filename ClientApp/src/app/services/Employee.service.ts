import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
//import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/observable/throw';

@Injectable()

export class EmployeeService {
  myAppUrl: string = "";

  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  FillMenu() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/FillMenu').pipe(
      catchError(this.handleError)
    );
  }

  FillMenuTable(UserId: number) {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/FillMenuTable/' + UserId).pipe(
      catchError(this.handleError)
    );
  }

  //-----------              MEMBER               -------------
  FillDocumentType() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/FillDocumentType').pipe(
      catchError(this.handleError)
    );
  }

  FillEmployeeExplorer() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/FillEmployee').pipe(
      catchError(this.handleError)
    );
  }

  DeleteEmployee(Id: number) {
    return this._http.delete(this.myAppUrl + "api/Masters/DeleteEmployee/" + Id).pipe(
      catchError(this.handleError)
    );
  }

  GetOneDocument(Id: number) {
    return this._http.get(this.myAppUrl + "api/Masters/GetOneDocument/" + Id).pipe(
      catchError(this.handleError)
    );
  }

  SaveDocument(Document) {
    return this._http.post(this.myAppUrl + "api/Masters/SaveDocument/", Document).pipe(
      catchError(this.handleError)
    );
  }

  DeleteEmployeeDocument(Id: number) {
    return this._http.delete(this.myAppUrl + "api/Masters/DeleteEmployeeDocument/" + Id).pipe(
      catchError(this.handleError)
    );
  }

  FillEmployeeDocument() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/FillEmployeeDocument').pipe(
      catchError(this.handleError)
    );
  }


  
  //-----------                    ERROR HANDLER      -------------

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


}

