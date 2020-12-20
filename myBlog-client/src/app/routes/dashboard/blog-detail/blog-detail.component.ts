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

  res_data : any;

  selectedBlog = {
    id:"",
    title:"",
    content:"",
    publisher:"",
    lastModified:"",
  };

  displayComment = false;

  dianzannum = 0;

  comments = [];

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
      this.res_data = res;
      var user_data = this.res_data.Message;
      this.user = {
        name : user_data.Username,
        email : user_data.Email,
        id : user_data.Id,
      }
      console.log(this.user);
    });

    this.$http.get(this.settings.URL+":9999/like/id/"+this.selectedBlog.id).subscribe(res=>{
      this.res_data = res;
      var likes = this.res_data.Message;
      if(likes == null){
        this.dianzannum = 0;
      }
    })

    this.$http.get(this.settings.URL+":9999/comment/id/"+this.selectedBlog.id).subscribe(res=>{
      // console.log(res);
      this.res_data = res;
      this.comments = this.res_data.Message;
    })
  }

  dianzan(): void {
    console.log("点赞的用户："+this.settings.user.name);
    var req = {
      liker : this.settings.user.name,
      id : this.selectedBlog.id
    }
    this.$http.post(this.settings.URL+":9999/like/likeit",req).subscribe(res=>{
      console.log(res);
      // alert("点赞成功");
      this.dianzannum++;
    })
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
      if(this.comments == null){
        this.comments = [{
          Content:req.content,
        }]
      } else {
        this.comments.push({
          Content:req.content,
        })
      }
    })
  }

  fanhui(): void{
    this.settings.setParam({needsRefresh:true});
    this.router.navigateByUrl("/")
  }

}
