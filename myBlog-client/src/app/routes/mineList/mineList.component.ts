import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {SettingsService} from '@core'; 
@Component({
  selector: 'app-mineList',
  templateUrl: './mineList.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MineListComponent implements OnInit {
  // blog: Blog;
  title = "个人博客";
  show: any;
  constructor(
    private cdr: ChangeDetectorRef,
    private settings: SettingsService,
  ) {
    this.settings.setShow({
        publiclists: true,
        mylists: true,
        userinfo: false
    });
    this.show = this.settings.Show;
    console.log(this.settings.Show);
  }

  ngOnInit() {}
}
