import { Component } from '@angular/core';
import { SettingsService, User } from '@core';
import { ChangeDetectorRef } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-panel',
  template: `
    <div class="matero-user-panel" fxLayout="column" fxLayoutAlign="center center">
      <img class="matero-user-panel-avatar" [src]="user.avatar" alt="avatar" width="64" />
      <h4 class="matero-user-panel-name">{{ user.name }}</h4>
      <h5 class="matero-user-panel-email">{{ user.email }}</h5>
      <div class="matero-user-panel-icons">
        <a routerLink="/profile/overview" mat-icon-button>
          <mat-icon (click)="change()">account_circle</mat-icon>
        </a>
        
        <a routerLink="/auth/login" mat-icon-button>
          <mat-icon>exit_to_app</mat-icon>
        </a>
      </div>
    </div>
  `,
  // <a routerLink="/profile/settings" mat-icon-button>
  //  <mat-icon>settings</mat-icon>
  // </a>
  styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent {
  user: User;

  constructor(
    private settings: SettingsService,
    private cd:ChangeDetectorRef,
    private router:Router
  ) {
    this.user = this.settings.user;
    // this.cd.detectChanges(); 
  }
  
  change() {
    this.settings.setShow({
      publiclists: false,
        mylists: false,
        userinfo: true,
    });
    this.router.navigateByUrl("/userinfo");
  }
}
