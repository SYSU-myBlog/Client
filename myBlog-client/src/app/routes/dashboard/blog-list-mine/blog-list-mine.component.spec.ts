import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogListMineComponent } from './blog-list-mine.component';

describe('BlogListMineComponent', () => {
  let component: BlogListMineComponent;
  let fixture: ComponentFixture<BlogListMineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogListMineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogListMineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
