import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GitRepoListComponent } from './git-repo-list/git-repo-list.component';
import { ApiLoaderComponent } from './api-loader/api-loader.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      AppComponent,
      GitRepoListComponent,
      ApiLoaderComponent
    ],
    imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      NgxSkeletonLoaderModule
    ],
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
