import { Component, OnInit, Input,ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { User } from '@core';
import { SettingsService} from '@core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { settings } from 'cluster';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./userinfo.component.css']
})

export class UserinfoComponent implements OnInit {
  @Input() user: User;
  userForm: FormGroup;
  constructor(
    private settings: SettingsService,
    private fb: FormBuilder,
    private http: HttpClient,) {
    this.user = this.settings.user;
    console.log(this.user);
    this.userForm = this.fb.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  save(){
    var name = this.userForm.get('name').value;
    var email = this.userForm.get('email').value;
    var formData = {
      username : name,
      email : email,
    };
    this.http.put(this.settings.URL+":9999/user/"+this.settings.user.id,formData).subscribe(res=>{ 
      console.log(res);
      this.settings.setUser({
        id : this.settings.user.id,
        name: name,
        email: email,
        avatar: this.settings.user.avatar,
      });
      this.settings.setShow({
        publiclists: true,
        mylists: true,
        userinfo: false
      })
      location.reload();
    });
  }

}
