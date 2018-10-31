import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import * as $ from 'jquery';

import { AppComponent } from './app.component';
import { SeriesComponent } from './Member/Series.component';
import { HomeComponent } from './home/home.component';
import { ConfigurationComponent } from './Member/Configuration.component';

import { MemberExplorerComponent } from './Member/MemberExplorer.component';
import { MembershipComponent } from './Member/Membership.component';
import { CompanyComponent } from './Member/Company.component';
import { BranchComponent } from './Member/Branch.component';
import { StateComponent } from './Member/State.component';
import { CityComponent } from './Member/City.component';
import { RelationComponent } from './Member/Relation.component';
import { GeneralMasterComponent } from './Member/GeneralMaster.component';
import { RunSqlComponent } from './Member/RunSql.component';
import { PrefrenceKeyComponent } from './Member/PrefrenceKey.component';
import { SegmentComponent } from './Member/Segment.component';
import { PlotTypeComponent } from './Member/PlotType.component';

import { BankComponent } from './Member/Bank.component';
import { VisitorPurposeComponent } from './Member/VisitorPurpose.component';
import { DepartmentComponent } from './Member/Department.component';
import { DesignationComponent } from './Member/Designation.component';
import { ProjectComponent } from './Member/Project.component';
import { SectorComponent } from './Member/Sector.component';
import { BlockComponent } from './Member/Block.component';
import { RateMasterComponent } from './Member/RateMaster.component';
import { PlotDetailComponent } from './Member/PlotDetail.component';



import { AccountGroupComponent } from './Member/AccountGroup.component';

import { AccountLedgerComponent } from './Member/AccountLedger.component';

import { AccountTransactionComponent } from './Member/AccountTransaction.component';
import { ChequeStatusComponent } from './Member/ChequeStatus.component';
import { ManageEmployeeComponent } from './Employee/ManageEmployee.component';
import { EmployeeExplorerComponent } from './Employee/EmployeeExplorer.component';
import { DocumentComponent } from './Employee/Document.component';
import { ManageUserComponent } from './Master/ManageUser.component';
import { UserPermissionComponent } from './Master/UserPermission.component';
import { RemunerationStructureComponent } from './Employee/RemunerationStructure.component';
import { ExtraRemunerationComponent } from './Employee/ExtraRemuneration.component';
import { GraphicViewComponent } from './GraphicView/GraphicView.component';
import { GraphicViewSectorComponent } from './GraphicView/GraphicViewSector.component';
import { GraphicViewBlockComponent } from './GraphicView/GraphicViewBlock.component';

import { VisitorEntryComponent } from './Visitor/VisitorEntry.component';
import { AccessDataComponent } from './Master/AccessData.component';



import { ProjectDropComponent } from './Utility/ProjectDrop/ProjectDrop.component';


import { MemberService } from './services/Member.service';
import { EmployeeService } from './services/Employee.service';

@NgModule({
  declarations: [
    AppComponent,
    SeriesComponent,
    HomeComponent,
    ConfigurationComponent,
    MemberExplorerComponent,
    MembershipComponent,
    StateComponent,
    CityComponent,
    RelationComponent,
    GeneralMasterComponent,
    RunSqlComponent,
    PrefrenceKeyComponent,
    CompanyComponent,
    BranchComponent,
    SegmentComponent,
    PlotTypeComponent,
    BankComponent,
    VisitorPurposeComponent,
    DepartmentComponent,
    DesignationComponent,
    ProjectComponent,
    SectorComponent,
    BlockComponent,
    RateMasterComponent,
    AccountGroupComponent,
    AccountLedgerComponent,
    AccountTransactionComponent,
    ChequeStatusComponent,
    ManageEmployeeComponent,
    EmployeeExplorerComponent,
    DocumentComponent,
    ManageUserComponent,
    UserPermissionComponent,
    RemunerationStructureComponent,
    ExtraRemunerationComponent,
    GraphicViewComponent,
    GraphicViewSectorComponent,
    GraphicViewBlockComponent,
    PlotDetailComponent,
    ProjectDropComponent,
    VisitorEntryComponent,
    AccessDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'Configuration', component: ConfigurationComponent },
      { path: 'MemberExplorer', component: MemberExplorerComponent },
      { path: 'Membership', component: MembershipComponent },
      { path: 'Company', component: CompanyComponent },
      { path: 'State', component: StateComponent },
      { path: 'City', component: CityComponent },
      { path: 'RelationComponent', component: RelationComponent },
      { path: 'GeneralMaster', component: GeneralMasterComponent },
      { path: 'RunSql', component: RunSqlComponent },
      { path: 'Series', component: SeriesComponent },
      { path: 'PrefrenceKey', component: PrefrenceKeyComponent },
      { path: 'Branch', component: BranchComponent },
      { path: 'PlotDetail', component: PlotDetailComponent },
      { path: 'AccountTransaction', component: AccountTransactionComponent },
      { path: 'ChequeStatus', component: ChequeStatusComponent },
      { path: 'ManageEmployee/:id', component: ManageEmployeeComponent },
      { path: 'EmployeeExplorer', component: EmployeeExplorerComponent },
      { path: 'ManageUser', component: ManageUserComponent },
      { path: 'UserPermission', component: UserPermissionComponent },
      { path: 'RemunerationStructure', component: RemunerationStructureComponent },
      { path: 'ExtraRemuneration', component: ExtraRemunerationComponent },
      { path: 'GraphicView', component: GraphicViewComponent },
      { path: 'GraphicViewSector/:id', component: GraphicViewSectorComponent },
      { path: 'GraphicViewBlock/:id', component: GraphicViewBlockComponent },
      { path: 'VisitorEntry', component: VisitorEntryComponent },
      { path: 'AccessData', component: AccessDataComponent },
    ])
  ],
  providers: [MemberService, DatePipe, EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
