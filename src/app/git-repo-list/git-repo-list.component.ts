import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-git-repo-list',
  templateUrl: './git-repo-list.component.html',
  styleUrls: ['./git-repo-list.component.scss']
})
export class GitRepoListComponent implements OnInit {
  searchKey: any;
  isRepoSearched: boolean = false;
  timeout: any = null;
  showLoader: boolean = false;
  userDetails: any;
  totalPages : number = 0;
  activePage : number = 1;
  repoListFound: any[] = [];
  responseObject: any = {};

  constructor(private _api: ApiService){}

  ngOnInit(): void {

  }

  clearSearch(){
    this.searchKey = null;
    this.isRepoSearched = false;
  }

  handleSearchCleaners() {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      $this.getRepoList();
    }, 500);
  }

  getRepoList(){
    this.isRepoSearched = true;
    this.showLoader = true;
    this._api.getUserDetails(this.searchKey).pipe(finalize(() => this.showLoader = false)).subscribe((response) => {
      if(response){
        this.userDetails = response;
        this.showLoader = true;
        this._api.getUserRepoList(this.searchKey).pipe(finalize(() => this.showLoader = false)).subscribe((res) => {
          if(res?.length){
            this.repoListFound = JSON.parse(JSON.stringify(res))
            for (let i = 0; i < res.length; i += 5) {
              const interval = res.slice(i, i + 5);
              this.responseObject[i / 5] = interval;
            }
            this.totalPages = Object.keys(this.responseObject)?.length
          }
          else{
            this.repoListFound = [];
            this.responseObject = {};
          }
        }, (error) =>{
          this.repoListFound = [];
          this.responseObject = {};
        })
      }
      else{
        this.userDetails = null;
        this.repoListFound = [];
        this.responseObject = {};
      }
    }, (err) => {
      this.userDetails = null;
      this.repoListFound = [];
      this.responseObject = {};
    })
  }

  handlePagination(type: string){
    if(type == "right"){
      this.activePage += 1;
    }
    else{
      this.activePage -= 1;
    }
  }

}
