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

  res_data : any;

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
    var name = this.registerForm.get('username').value;
    var pass = this.registerForm.get('password').value;
  
    var formData = {
      username : name,
      password : pass,
    };
    // console.log(JSON.stringify(formData));
    console.log("submit to register.");
    // 发送注册请求
    this.$http.post(this.settings.URL+":9999/user/register",formData).subscribe(res=>{ 
      console.log(res); 
      this.res_data = res;
      if(this.res_data.Type == "success"){
        this.$http.get(this.settings.URL+":9999/user/username/"+name).subscribe(res=>{
          console.log(res);
          this.res_data = res;
          this.settings.setUser({
            id: this.res_data.Message.Id,
            name: this.res_data.Message.Username,
            email: this.res_data.Message.Email,
            avatar: './assets/images/avatar.jpg',
          })
          this.router.navigateByUrl("/login");
        })
      } else {
        alert(this.res_data.Message);
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
