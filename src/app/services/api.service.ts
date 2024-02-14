import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getUserDetails(githubUsername: string) {
    return this.httpClient.get<any>(`https://api.github.com/users/${githubUsername}`);
  }

  getUserRepoList(githubUsername: string) {
    return this.httpClient.get<any>(` https://api.github.com/users/${githubUsername}/repos`);
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
}
