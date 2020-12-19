import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsService, StartupService, TokenService } from '@core';
import { HttpClient } from "@angular/common/http";  //这里是HttpClient

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private settings: SettingsService,
    private $http: HttpClient,
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [this.confirmValidator]],
    });
  }

  ngOnInit() {}

  register(){
    console.log("submit to register.");
    var name = this.registerForm.get('username').value;
    var pass = this.registerForm.get('password').value;
    var formData = {
      username : name,
      password : pass,
    };
    // console.log(JSON.stringify(formData));
    // 发送登录请求
    this.$http.post(this.settings.URL+":9999/user/register",formData).subscribe(res=>{ 
      console.log(JSON.stringify(res)); 
      var res_string = JSON.stringify(res);
      var res_data = {
        Type:"fail",
      };
      res_data = JSON.parse(res_string);
      if(res_data.Type == "success"){
        console.log("here");
        this.router.navigateByUrl("/login");
      }
     });
  }

  confirmValidator = (control: FormControl): { [k: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.registerForm.controls.password.value) {
      return { error: true, confirm: true };
    }
    return {};
  };
}
