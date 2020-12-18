import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsService, StartupService, TokenService } from '@core';
import { HttpClient } from "@angular/common/http";  //这里是HttpClient

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private token: TokenService,
    private startup: StartupService,
    private settings: SettingsService,
    private $http: HttpClient,
    // public resList: any,
  ) {
    this.loginForm = this.fb.group({
      // username: ['', [Validators.required, Validators.pattern('ng-matero')]],
      // password: ['', [Validators.required, Validators.pattern('ng-matero')]],
      username: ['',[Validators.required]],
      password: ['',[Validators.required]],
    });
  }

  ngOnInit() {}

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    var name = this.loginForm.get('username').value;
    var pass = this.loginForm.get('password').value;
    var formData = {
      username : name,
      password : pass,
    };
    // console.log(JSON.stringify(formData));
    // 发送登录请求
    this.$http.post("http://172.26.104.90:9999/user/login",formData).subscribe(res=>{ 
      //this.resList = res;
      var res_string = JSON.stringify(res);
      var res_data = {
        Message:"",
      };
      res_data = JSON.parse(res_string);
      
      // console.log(res_data.Message);
      var id_string = JSON.stringify(res_data.Message);
      var id = JSON.parse(id_string).Id;

      // console.log("http://172.26.104.90:9999/user/uid/"+id);
      this.$http.get("http://172.26.104.90:9999/user/uid/"+id).subscribe(res=>{
        // Set user info
        console.log(res);
        var res_string2 = JSON.stringify(res);
        var res_data2 = {
          Message:"",
        };
        res_data2 = JSON.parse(res_string2);
        var mess_string = JSON.stringify(res_data2.Message);
        var mess = {
          Username : "",
          Email : "",
          Id : "",
          Password : "",
          Phone : "",
        } 
        mess = JSON.parse(mess_string);
        console.log(mess);
        this.settings.setUser({
          id: id,
          name: mess.Username,
          email: mess.Email,
          avatar: './assets/images/avatar.jpg',
        });
        const { token, uid, username } = { 
          token: 'ng-matero-token', 
          uid: id, 
          username: mess.Username,
        };
        // Set token info
        this.token.set({ token, uid, username});
        // Regain the initial data
        this.startup.load().then(() => {
          let url = this.token.referrer!.url || '/';
          if (url.includes('/auth')) {
            url = '/';
          }
          this.router.navigateByUrl(url);
        });
      })
     });
     this.router.navigateByUrl("/");
  }
}
