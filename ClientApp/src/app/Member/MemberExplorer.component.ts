import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MemberService } from './../services/Member.service';

@Component({
    selector: 'MemberExplorer',
    templateUrl: './MemberExplorer.component.html'
})
export class MemberExplorerComponent {
    MemberList = [];

  constructor(http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private _memberService: MemberService) {
    this._memberService.FillMemberExplorer().subscribe((data) => {
      this.MemberList = data;
    }, error => console.error(error));
  }
}
