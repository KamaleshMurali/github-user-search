import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../shared/model/user.model';


@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    let url = 'https://api.github.com/users'
    return this.http.get<User[]>(url);
  }

  searchUsers(searchString: string, sortBy?: string, sortOrder?: string): Observable<any> {
    let url: string = `https://api.github.com/search/users?q=${searchString}`;
    if (sortBy) url = url.concat(`&s=${sortBy}`);
    if (sortOrder) url = url.concat(`&o=${sortOrder}`);
    return this.http.get<any>(url);
  }

  fetchUserRepos(username: string) {
    let url = `https://api.github.com/users/${username}/repos`;
    return this.http.get(url);
  }

}
