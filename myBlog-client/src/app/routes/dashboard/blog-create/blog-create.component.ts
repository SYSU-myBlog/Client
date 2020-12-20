import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";  //这里是HttpClient
import { SettingsService } from '@core';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})

export class BlogCreateComponent implements OnInit {
  articleForm: FormGroup;

  article : {
    title : "",
    content : "",
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private $http: HttpClient,
    private settings: SettingsService,
  ) { 
    this.articleForm = this.fb.group({
      title: ['',[Validators.required]],
      content: ['',[Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  create() : void {
    console.log(this.articleForm);
    var req = {
      title : this.articleForm.get('title').value,
      content : this.articleForm.get('content').value,
      publisher : this.settings.user.id,
    }
    console.log(req);
    // var req_json = JSON.stringify(req);
    this.$http.post(this.settings.URL+":9999/article/publish",req).subscribe(res=>{
      console.log(res);
      // this.settings.setParam({needsRefresh:true});
      this.router.navigateByUrl("/dashboard");
    })
  }

  fanhui() : void {
    // this.settings.setParam({needsRefresh:true});
    this.router.navigateByUrl("/dashboard");
  }
}
