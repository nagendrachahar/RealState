import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

//import { Http, Response } from '@angular/http';
//import { Observable } from 'rxjs/Observable';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/observable/throw';

@Injectable()
export class MemberService {
  myAppUrl: string = "";

  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  //-----------                           MEMBER      -------------

  FillMemberExplorer() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/FillMemberExplorer').pipe(
        catchError(this.handleError)
    );
  }

  GetOneMember(MemberId: number) {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/GetOneMember/' + MemberId).pipe(
      catchError(this.handleError)
    );
  }

  SaveMember(Member) {
    return this._http.post(this.myAppUrl + 'api/Masters/SaveMember', Member).pipe(
      catchError(this.handleError)
    );
  }

  //-----------                           STATE      -------------
  FillState() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/FillState').pipe(
      catchError(this.handleError)
    );
  }
  SaveState(State) {
    return this._http.post(this.myAppUrl + 'api/Masters/SaveState', State).pipe(
      catchError(this.handleError)
    );
  }
  GetOneState(StateId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/GetOneState/" + StateId).pipe(
      catchError(this.handleError)
    );
  }
  DeleteState(StateId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/DeleteState/" + StateId).pipe(
      catchError(this.handleError)
    );
  }

  //-----------                           COUNTRY      -------------
  FillCountry() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/FillCountry').pipe(
      catchError(this.handleError)
    );
  }

  //-----------                           CITY      -------------
  FillCity() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/GetCity').pipe(
      catchError(this.handleError)
    );
  }
  SaveCity(City) {
    return this._http.post(this.myAppUrl + 'api/Masters/SaveCity', City).pipe(
      catchError(this.handleError)
    );
  }
  GetOneCity(CityId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/GetOneCity/" + CityId).pipe(
      catchError(this.handleError)
    );
  }

  GetCityOfState(StateId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/GetCityOfState/" + StateId).pipe(
      catchError(this.handleError)
    );
  }

  DeleteCity(CityId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/DeleteCity/" + CityId).pipe(
      catchError(this.handleError)
    );
  }

  //-----------                           Relation      -------------
  FillRelation() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/GetRelation').pipe(
      catchError(this.handleError)
    );
  }
  GetOneRelation(RelationId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/GetOneRelation/" + RelationId).pipe(
      catchError(this.handleError)
    );
  }
  SaveRelation(Relation) {
    return this._http.post(this.myAppUrl + 'api/Masters/SaveRelation', Relation).pipe(
      catchError(this.handleError)
    );
  }

  DeleteRelation(RelationId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/DeleteRelation/" + RelationId).pipe(
      catchError(this.handleError)
    );
  }

  //-----------                           COMPANY      -------------
  GetCompany() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/GetCompany').pipe(
      catchError(this.handleError)
    );
  }
  SaveCompany(Company) {
    return this._http.post(this.myAppUrl + 'api/Masters/SaveCompany', Company).pipe(
      catchError(this.handleError)
    );
  }
            
  //-----------                           BRANCH      -------------

  GetBranch() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/GetBranch').pipe(
      catchError(this.handleError)
    );
  }

  GetOneBranch(BranchId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/GetOneBranch/" + BranchId).pipe(
      catchError(this.handleError)
    );
  }

  SaveBranch(Branch) {
    return this._http.post(this.myAppUrl + 'api/Masters/SaveBranch', Branch).pipe(
      catchError(this.handleError)
    );
  }

  DeleteBranch(BranchId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/DeleteBranch/" + BranchId).pipe(
      catchError(this.handleError)
    );
  }

  //-----------                           SQL QUERY      -------------
  GetSqlQueryResult(SearchQuery: string) {    
    return this._http.get<any>(this.myAppUrl + 'api/Masters/GetSqlQueryResult/' + SearchQuery).pipe(
      catchError(this.handleError)
    );
  }


  //-----------                           New Series      -------------
  GetCombination() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/GetCombination').pipe(
      catchError(this.handleError)
    );
  }
  GetOneSeries(SeriesId: number) {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/GetOneSeries/' + SeriesId).pipe(
      catchError(this.handleError)
    );
  }
  SaveSeries(Series) {
    return this._http.post(this.myAppUrl + 'api/Masters/SaveSeries', Series).pipe(
      catchError(this.handleError)
    );
  }
  DeleteSeries(SeriesId: number) {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/GetCombination').pipe(
      catchError(this.handleError)
    );
  }
  FillSeries() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/FillSeries').pipe(
      catchError(this.handleError)
    );
  }
  //-----------                           PrefrenceKey      -------------
  FillPrefrenceKey() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/GetPrefrenceKey').pipe(
      catchError(this.handleError)
    );
  }
  SavePrefrenceKey(PrefrenceKey) {
    return this._http.post(this.myAppUrl + 'api/Masters/SavePrefrenceKey', PrefrenceKey).pipe(
      catchError(this.handleError)
    );
  }
  GetOnePrefrenceKey(PrefrenceKeyId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/GetOnePrefrenceKey/" + PrefrenceKeyId).pipe(
      catchError(this.handleError)
    );
  }


  //--------------------------  Segmentform -----------------------------

  SaveSegment(Segment) {
    return this._http.post(this.myAppUrl + 'api/Masters/SaveSegment', Segment).pipe(
      catchError(this.handleError)
    );
  }

  FillSegment() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/FillSegment').pipe(
      catchError(this.handleError)
    );
  }

  GetOneSegment(SegmentId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/GetOneSegment/" + SegmentId).pipe(
      catchError(this.handleError)
    );
  }

  DeleteSegment(SegmentId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/DeleteSegment/" + SegmentId).pipe(
      catchError(this.handleError)
    );
  }

  //--------------                   PlotType               --------------------


  GetOnePlotType(PlottypeId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/GetOnePlotType/" + PlottypeId).pipe(
      catchError(this.handleError)
    );
  }

  SavePlotType(PlotType) {
    return this._http.post(this.myAppUrl + 'api/Masters/SavePlotType', PlotType).pipe(
      catchError(this.handleError)
    );
  }

  FillPlotType() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/FillPlotType').pipe(
      catchError(this.handleError)
    );
  }

  DeletePlottype(PlotTypeId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/DeletePlottype/" + PlotTypeId).pipe(
      catchError(this.handleError)
    );
  }

  //-------------             Bank Detail         ----------------



  GetOneBank(BankId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/GetOneBank/" + BankId).pipe(
      catchError(this.handleError)
    );
  }

  SaveBank(Bank) {
    return this._http.post(this.myAppUrl + 'api/Masters/SaveBank', Bank).pipe(
      catchError(this.handleError)
    );
  }

  FillBank() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/FillBank').pipe(
      catchError(this.handleError)
    );
  }

  DeleteBank(BankId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/DeleteBank/" + BankId).pipe(
      catchError(this.handleError)
    );
  }

  //-------------                Visitor Purpose ------------------

  GetOneVisitorPurpose(VisitorPurposeId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/GetOneVisitorPurpose/" + VisitorPurposeId).pipe(
      catchError(this.handleError)
    );
  }

  SaveVisitorPurpose(VisitorPurpose) {
    return this._http.post(this.myAppUrl + 'api/Masters/SaveVisitorPurpose', VisitorPurpose).pipe(
      catchError(this.handleError)
    );
  }

  FillVisitorPurpose() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/FillVisitorPurpose').pipe(
      catchError(this.handleError)
    );
  }


  DeleteVisitorPurpose(VisitorPurposeId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/DeleteVisitorPurpose/" + VisitorPurposeId).pipe(
      catchError(this.handleError)
    );
  }


  //----------------     Department           -------------------------


  GetOneDepartment(DepartmentId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/GetOneDepartment/" + DepartmentId).pipe(
      catchError(this.handleError)
    );
  }

  SaveDepartment(Department) {
    return this._http.post(this.myAppUrl + 'api/Masters/SaveDepartment', Department).pipe(
      catchError(this.handleError)
    );
  }

  FillDepartment() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/FillDepartment').pipe(
      catchError(this.handleError)
    );
  }


  DeleteDepartment(DepartmentId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/DeleteDepartment/" + DepartmentId).pipe(
      catchError(this.handleError)
    );
  }

  //------------              Designation           ---------------
  
  GetOneDesignation(DesignationId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/GetOneDesignation/" + DesignationId).pipe(
      catchError(this.handleError)
    );
  }


  SaveDesignation(Designation) {
    return this._http.post(this.myAppUrl + 'api/Masters/SaveDesignation', Designation).pipe(
      catchError(this.handleError)
    );
  }

  FillDesignation() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/FillDesignation').pipe(
      catchError(this.handleError)
    );
  }

  DeleteDesignation(DesignationId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/DeleteDesignation/" + DesignationId).pipe(
      catchError(this.handleError)
    );
  }

  //-------------              Project           ------------------

  GetOneProject(ProjectId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/GetOneProject/" + ProjectId).pipe(
      catchError(this.handleError)
    );
  }


  SaveProject(Project) {
    return this._http.post(this.myAppUrl + 'api/Masters/SaveProject', Project).pipe(
      catchError(this.handleError)
    );
  }

  FillProject() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/FillProject').pipe(
      catchError(this.handleError)
    );
  }

  DeleteProject(ProjectId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/DeleteProject/" + ProjectId).pipe(
      catchError(this.handleError)
    );
  }

  //-----------                 Sector                ---------------
  
  GetOneSector(SectorId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/GetOneSector/" + SectorId).pipe(
      catchError(this.handleError)
    );
  }

  SaveSector(Sector) {
    return this._http.post(this.myAppUrl + 'api/Masters/SaveSector', Sector).pipe(
      catchError(this.handleError)
    );
  }

  FillSector() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/FillSector').pipe(
      catchError(this.handleError)
    );
  }

  DeleteSector(SectorId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/DeleteSector/" + SectorId).pipe(
      catchError(this.handleError)
    );
  }

  FillSectorByProject(id: number) {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/FillSectorByProject/' + id).pipe(
      catchError(this.handleError)
    );
  }

  //------------               Block          --------------------

  GetOneBlock(BlockId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/GetOneBlock/" + BlockId).pipe(
      catchError(this.handleError)
    );
  }

  SaveBlock(Block) {
    return this._http.post(this.myAppUrl + 'api/Masters/SaveBlock', Block).pipe(
      catchError(this.handleError)
    );
  }

  FillBlock() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/FillBlock').pipe(
      catchError(this.handleError)
    );
  }

  DeleteBlock(BlockId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/DeleteBlock/" + BlockId).pipe(
      catchError(this.handleError)
    );
  }

  FillBlockBySector(id: number) {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/FillBlockBySector/' + id).pipe(
      catchError(this.handleError)
    );
  }


  // ------------------              Rate Master -------------------------


  GetOneRate(RateId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/GetOneRate/" + RateId).pipe(
      catchError(this.handleError)
    );
  }

  SaveRate(Rate) {
    return this._http.post(this.myAppUrl + 'api/Masters/SaveRate', Rate).pipe(
      catchError(this.handleError)
    );
  }

  FillRate() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/FillRate').pipe(
      catchError(this.handleError)
    );
  }

  DeleteRate(RateId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/DeleteRate/" + RateId).pipe(
      catchError(this.handleError)
    );
  }

  //--------------              Account Group         ---------------------


  GetOneAccountGroup(GroupId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/GetOneAccountGroup/" + GroupId).pipe(
      catchError(this.handleError)
    );
  }

  SaveAccountGroup(AccountGroup) {
    return this._http.post(this.myAppUrl + 'api/Masters/SaveAccountGroup', AccountGroup).pipe(
      catchError(this.handleError)
    );
  }
  
  FillAccountGroup() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/FillAccountGroup').pipe(
      catchError(this.handleError)
    );
  }

  DeleteAccountGroup(GroupId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/DeleteAccountGroup/" + GroupId).pipe(
      catchError(this.handleError)
    );
  }

  //---------------           AccountLedger        ---------------------


  GetOneAccountLedger(LedgerId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/GetOneAccountLedger/" + LedgerId).pipe(
      catchError(this.handleError)
    );
  }


  SaveAccountLedger(AccountLedger) {
    return this._http.post(this.myAppUrl + 'api/Masters/SaveAccountLedger', AccountLedger).pipe(
      catchError(this.handleError)
    );
  }


  FillAccountLedger() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/FillAccountLedger').pipe(
      catchError(this.handleError)
    );
  }

  DeleteAccountLedger(LedgerId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/DeleteAccountLedger/" + LedgerId).pipe(
      catchError(this.handleError)
    );
  }

  // --------------------------- Account Transaction       -------------------------

  GetOneAccountTransaction(AccountTransactionId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/GetOneAccountTransaction/" + AccountTransactionId).pipe(
      catchError(this.handleError)
    );
  }

  SaveAccountTransaction(AccountTransaction) {
    return this._http.post(this.myAppUrl + 'api/Masters/SaveAccountTransaction', AccountTransaction).pipe(
      catchError(this.handleError)
    );
  }


  FillAccountTransaction() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/FillAccountTransaction').pipe(
      catchError(this.handleError)
    );
  }

  DeleteAccountTransaction(Id: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/DeleteAccountTransaction/" + Id).pipe(
      catchError(this.handleError)
    );
  }

  //------------------------------  Employee -------------------------------

  GetEmployeeId(Code: string) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/GetEmployeeId/" + Code).pipe(
      catchError(this.handleError)
    );
  }

  GetOneEmployee(EmployeeId: number) {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/GetOneEmployee/' + EmployeeId).pipe(
      catchError(this.handleError)
    );
  }

  SaveEmployee(Employee) {
    return this._http.post(this.myAppUrl + 'api/Masters/SaveEmployee', Employee).pipe(
      catchError(this.handleError)
    );
  }

  //----------------           Manage User ------------------------------

  GetOneUser(UserId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/GetOneUser/" + UserId).pipe(
      catchError(this.handleError)
    );
  }

  SaveUser(User) {
    return this._http.post(this.myAppUrl + 'api/Masters/SaveUser', User).pipe(
      catchError(this.handleError)
    );
  }

  FillUsers() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/FillUsers').pipe(
      catchError(this.handleError)
    );
  }

  DeleteUser(Id: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/DeleteUser/" + Id).pipe(
      catchError(this.handleError)
    );
  }

  //------------                User Permission        ---------------------

  Save_SavePermission(MenuId: number, UserId: number){

    return this._http.get<any>(this.myAppUrl + 'api/Masters/Save_SavePermission/' + MenuId + '/' + UserId).pipe(
      catchError(this.handleError)
    );

  }

  Save_SaveAccessdata(TableId: number, ColumnId: number, UserId: number) {

    return this._http.get<any>(this.myAppUrl + 'api/Masters/Save_SaveAccessData/' + TableId + '/' + ColumnId + '/' + UserId).pipe(
      catchError(this.handleError)
    );

  }

  Save_UpdatePermission(MenuId: number, UserId: number) {

    return this._http.get<any>(this.myAppUrl + 'api/Masters/Save_UpdatePermission/' + MenuId + '/' + UserId).pipe(
      catchError(this.handleError)
    );

  }

  Save_DeletePermission(MenuId: number, UserId: number) {

    return this._http.get<any>(this.myAppUrl + 'api/Masters/Save_DeletePermission/' + MenuId + '/' + UserId).pipe(
      catchError(this.handleError)
    );

  }

  Save_ViewPermission(MenuId: number, UserId: number) {

    return this._http.get<any>(this.myAppUrl + 'api/Masters/Save_ViewPermission/' + MenuId + '/' + UserId).pipe(
      catchError(this.handleError)
    );

  }

  //-----------------------      Remuneration Structure -------------------

  SaveRemunerationStruture(RemunerationStructure) {
    return this._http.post(this.myAppUrl + 'api/Masters/SaveRemunerationStructure', RemunerationStructure).pipe(
      catchError(this.handleError)
    );
  }

  GetOneRemunerationStruture(RemunerationId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/GetOneRemunerationStructure/" + RemunerationId).pipe(
      catchError(this.handleError)
    );
  }
  
  FillRemunerationStructure() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/FillRemunerationStructure').pipe(
      catchError(this.handleError)
    );
  }

  DeleteRemunerationStructure(Id: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/DeleteRemunerationStructure/" + Id).pipe(
      catchError(this.handleError)
    );
  }

  //////------------------------   Extra Remuneration -------------------------

  SaveExtraRemuneration(ExtraRemuneration) {
    return this._http.post(this.myAppUrl + 'api/Masters/SaveExtraRemuneration', ExtraRemuneration).pipe(
      catchError(this.handleError)
    );
  }

  GetOneExtraRemuneration(RemunerationId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/GetOneExtraRemuneration/" + RemunerationId).pipe(
      catchError(this.handleError)
    );
  }

  FillExtraRemuneration() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/FillExtraRemuneration').pipe(
      catchError(this.handleError)
    );
  }

  DeleteExtraRemuneration(Id: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/DeleteExtraRemuneration/" + Id).pipe(
      catchError(this.handleError)
    );
  }


  //////-----------------------    Plot Detail       ------------------------------

  verifyPlotDetail(PlotDetail) {
    return this._http.post(this.myAppUrl + 'api/Masters/vrifyPlotDetail', PlotDetail).pipe(
      catchError(this.handleError)
    );
  }

  SavePlotDetail(PlotDetail) {
    return this._http.post(this.myAppUrl + 'api/Masters/SavePlotDetail', PlotDetail).pipe(
      catchError(this.handleError)
    );
  }

  GetOnePlotDetail(PlotId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/GetOnePlotDetail/" + PlotId).pipe(
      catchError(this.handleError)
    );
  }

  FillPlotDetail() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/FillPlotDetail').pipe(
      catchError(this.handleError)
    );
  }

  DeletePlotDetail(PlotDetailId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/DeletePlotDetail/" + PlotDetailId).pipe(
      catchError(this.handleError)
    );
  }
  
  //-------------               Visitor Entry      ---------------------

  GetOneVisitorEntry(VisitorId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/GetOneVisitorEntry/" + VisitorId).pipe(
      catchError(this.handleError)
    );
  }

  SaveVisitorEntry(VisitorEntry) {
    return this._http.post(this.myAppUrl + 'api/Masters/SaveVisitorEntry', VisitorEntry).pipe(
      catchError(this.handleError)
    );
  }

  FillVisitorEntry() {
    return this._http.get<any>(this.myAppUrl + 'api/Masters/FillVisitorEntry').pipe(
      catchError(this.handleError)
    );
  }

  DeleteVisitorEntry(Id: number) {
    return this._http.delete<any>(this.myAppUrl + "api/Masters/DeleteVisitorEntry/" + Id).pipe(
      catchError(this.handleError)
    );
  }


  //-------------                 Rate Master             -----------------

  GetOneRateMaster(RateId: number) {
    return this._http.get<any>(this.myAppUrl + "api/Masters/GetOneRateMaster/" + RateId).pipe(
      catchError(this.handleError)
    );
  }


  verifyRateDetail(RateMaster) {
    return this._http.post(this.myAppUrl + 'api/Masters/vrifyRateDetail', RateMaster).pipe(
      catchError(this.handleError)
    );
  }

  SaveRateDetail(RateMaster) {
    return this._http.post(this.myAppUrl + 'api/Masters/SaveRateDetail', RateMaster).pipe(
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
