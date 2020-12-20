import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {SettingsService} from '@core'; 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  // blog: Blog;
  title = "博客列表";
  show: any;
  constructor(
    private cdr: ChangeDetectorRef,
    private settings: SettingsService,) {
      this.show = this.settings.Show;
      this.settings.setShow({
        publiclists: true,
        mylists: false,
        userinfo: false
      });
      console.log(this.settings.Show);
  }

  ngOnInit() {}
}
