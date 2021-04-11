import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../service/user.service';
import { User } from '../shared/model/user.model';

export interface Search {
  total_count?: number
  incomplete_result?: boolean
  items?: User[]
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  sortTypeSelected: string;
  sortTypes = [];
  value: string = '';
  users: User[];
  totalCount: number = 0;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService
        .getUsers()
        .subscribe((users: User[]) => {
          this.totalCount = users.length;
          users.forEach(user => {user['isExpand'] = false});
          this.users = users;
        });
  }

  search(sortType?: string) {
    let sortBy: string;
    let sortOrder: string;
    if (sortType === 'asc' || sortType === 'desc') {
      sortOrder = sortType;
      sortBy = 'users'
    }
    if (sortType === 'rankUp' || sortType === 'rankDown') {
      sortOrder = sortType === 'rankUp' ? 'desc' : 'asc';
      sortBy = 'stars'
    }
    this.userService
        .searchUsers(this.value, sortBy, sortOrder)
        .subscribe((data: Search) =>
    {
      this.totalCount = data.total_count;
      data.items.forEach(user => user['isExpand'] = false);
      this.users = data.items
    });
  }

  sort(sortType: string) {
    this.search(sortType);
  }

}
