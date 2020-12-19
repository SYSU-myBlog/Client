import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  // blog: Blog;
  title = "博客列表";

  constructor(private cdr: ChangeDetectorRef) {

  }

  ngOnInit() {}
}
