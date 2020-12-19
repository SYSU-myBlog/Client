import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";  //这里是HttpClient
import { SettingsService } from '@core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  commentForm: FormGroup;

  selectedBlog = {
    id:"",
    title:"",
    content:"",
    publisher:"",
    lastModified:"",
  };

  displayComment = false;

  dianzannum = 0;

  comments = [
    {content:"hhhh"},
    {content:"qqqq"},
  ];

  user = {
    id:"",
    name:"",
    email:"",
  }

  constructor(
    private router: Router,
    private settings: SettingsService,
    private fb: FormBuilder,
    private $http: HttpClient,
  ) { 
    this.commentForm = this.fb.group({
      content: ['',[Validators.required]],
    });

  }

  ngOnInit(): void {
    this.selectedBlog = this.settings.blog;
    // console.log(this.selectedBlog);
    console.log(this.settings.URL+":9999/user/uid/"+this.selectedBlog.publisher);
    this.$http.get(this.settings.URL+":9999/user/uid/"+this.selectedBlog.publisher).subscribe(res=>{
      console.log(res);
    });

    this.$http.get(this.settings.URL+":9999/like/id/"+this.selectedBlog.id).subscribe(res=>{
      console.log(res);
    })

    this.$http.get(this.settings.URL+":9999/comment/id/"+this.selectedBlog.id).subscribe(res=>{
      // console.log(res);
      this.comments = res.Message;
    })
  }

  dianzan(): void {
    alert("点赞成功");
  }

  comment(): void {
    if(this.displayComment){
      this.displayComment = false;
    } else {
      this.displayComment = true;
    }
  }

  commentSub(): void {
    console.log(this.commentForm.get('content').value);
    var req = {
      content : this.commentForm.get('content').value,
      publisher : this.settings.user.name,
      id : this.selectedBlog.id
    }
    this.$http.post(this.settings.URL+":9999/comment/publish",req).subscribe(res=>{
      console.log(res);
    })
  }

  fanhui(): void{
    this.settings.setParam({needsRefresh:true});
    this.router.navigateByUrl("/")
  }

}
