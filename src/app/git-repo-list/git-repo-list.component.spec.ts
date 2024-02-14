import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { GitRepoListComponent } from './git-repo-list.component';
import { ApiService } from '../services/api.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

describe('GitRepoListComponent', () => {
  let component: GitRepoListComponent;
  let fixture: ComponentFixture<GitRepoListComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async(() => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getUserDetails', 'getUserRepoList']);

    TestBed.configureTestingModule({
      declarations: [GitRepoListComponent],
      imports: [FormsModule, NgxSkeletonLoaderModule],
      providers: [{ provide: ApiService, useValue: apiServiceSpy }]
    }).compileComponents();

    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GitRepoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear search', () => {
    component.clearSearch();
    expect(component.searchKey).toBeNull();
    expect(component.isRepoSearched).toBeFalse();
  });

  it('should handle search cleaners', fakeAsync(() => {
    spyOn(component, 'getRepoList');
    component.handleSearchCleaners();
    expect(component.getRepoList).toHaveBeenCalledTimes(0);
    tick(501);
    expect(component.getRepoList).toHaveBeenCalledTimes(1);
  }));

  it('should get repo list', () => {
    const userDetails = { name: 'John Doe' };
    const repoList = [{ name: 'repo1' }, { name: 'repo2' }];
    apiService.getUserDetails.and.returnValue(of(userDetails));
    apiService.getUserRepoList.and.returnValue(of(repoList));
    component.searchKey = 'john_doe';
    component.getRepoList();
    expect(apiService.getUserDetails).toHaveBeenCalledWith('john_doe');
    expect(apiService.getUserRepoList).toHaveBeenCalledWith('john_doe');
    expect(component.userDetails).toEqual(userDetails);
    expect(component.repoListFound).toEqual(repoList);
    expect(component.totalPages).toBe(1);
    expect(component.responseObject).toEqual({ 0: repoList });
  });

  it('should handle pagination', () => {
    component.totalPages = 5;
    component.activePage = 3;
    component.handlePagination('right');
    expect(component.activePage).toBe(4);
    component.handlePagination('left');
    expect(component.activePage).toBe(3);
  });
});
