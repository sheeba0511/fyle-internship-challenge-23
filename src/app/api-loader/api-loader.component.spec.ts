import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiLoaderComponent } from './api-loader.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

describe('ApiLoaderComponent', () => {
  let component: ApiLoaderComponent;
  let fixture: ComponentFixture<ApiLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiLoaderComponent],
      imports: [NgxSkeletonLoaderModule],
    });
    fixture = TestBed.createComponent(ApiLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
