import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';
import { User } from '../shared/model/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Input('totalCount') totalCount: number;
  private _users: User[];
  @Input('users')
  set users(users: User[]) {
    this._users = users;
    // this.pagedUsers = users;
  }
  get users() {
    return this._users
  }

  length: number = 0;
  pageSize: number;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pagedUsers: User[];
  repoDetails: any[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }

  onPage(event: PageEvent) {
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.length) {
      endIndex = this.length;
    }
    this.pagedUsers = this.users.slice(startIndex, endIndex);
  }

  fetchRepos(user: User) {
    this.repoDetails = [];
    user.isExpand = !user.isExpand;
    this.userService
        .fetchUserRepos(user.login)
        .subscribe((data: any[]) => {
          this.repoDetails = data;
        });
  }

}
