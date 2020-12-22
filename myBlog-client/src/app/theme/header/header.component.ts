import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import * as screenfull from 'screenfull';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BLOG, SettingsService } from '@core';
import { HttpClient,HttpParams } from "@angular/common/http";  //这里是HttpClient


@Component({
  selector: 'app-header',
  host: {
    class: 'matero-header',
  },
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Input() showToggle = true;
  @Input() showBranding = false;
  searchForm: FormGroup;
  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleSidenavNotice = new EventEmitter<void>();
  BLOG: BLOG;
  res_data : any;
  private get screenfull(): screenfull.Screenfull {
    return screenfull as screenfull.Screenfull;
  }

  constructor(
    private fb: FormBuilder,
    private settings: SettingsService,
    private $http: HttpClient,
    ) {
    this.searchForm = this.fb.group({
      str: ['',[Validators.required]],
    });
    this.BLOG = this.settings.BLOG;
  }

  ngOnInit() {}

  toggleFullscreen() {
    if (this.screenfull.isEnabled) {
      this.screenfull.toggle();
    }
  }
  search() {
    var str = this.searchForm.get('str').value;
    this.$http.get(this.settings.URL+":9999/article/title/"+str).subscribe(res=>{
      this.res_data = res;
      this.settings.setBLOG({
        search: str,
        blog:this.res_data.Message,
        flag: true
      });
      console.log(this.res_data.Message);
      location.reload();
    })
    
  }
  exit() {
    this.settings.setBLOG({
      flag: false
    });
    location.reload();
  }
}
