import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpParams } from "@angular/common/http";  //这里是HttpClient
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

  editable = false;

  titleInput = "";

  contentInput = "";

  isAlreadyDianzan = false;

  likes = [];

  constructor(
    private router: Router,
    private settings: SettingsService,
    private fb: FormBuilder,
    private $http: HttpClient,
  ) {
    this.commentForm = this.fb.group({
      content: ['',[Validators.required]],
    });
    // if(this.selectedBlog.id!=null || this.selectedBlog.id != ""){
    //   let req = new HttpParams().set('aid', this.selectedBlog.id);
    //   this.$http.get(this.settings.URL+":9999/article/aid/",{params:req}).subscribe(res=>{
    //     console.log(res);
    //     this.res_data = res;
    //     this.selectedBlog.content = this.res_data.Message.Content;
    //     this.selectedBlog.title = this.res_data.Message.Title;
    //   })
    // }
  }

  ngOnInit(): void {
    this.selectedBlog = this.settings.blog;
    // console.log(this.selectedBlog);
    // console.log(this.settings.URL+":9999/user/uid/"+this.selectedBlog.publisher);
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
      console.log(res);
      this.res_data = res;
      var likes = this.res_data.Message;
      if(likes == null){
        this.dianzannum = 0;
      } else {
        this.dianzannum = likes.length;
        this.likes = likes;
      }
    })

    this.$http.get(this.settings.URL+":9999/comment/id/"+this.selectedBlog.id).subscribe(res=>{
      // console.log(res);
      this.res_data = res;
      this.comments = this.res_data.Message;
      console.log(this.res_data.Message);
    })
  }

  dianzan(): void {
    if(this.likes.length != null){
      for(var i=0;i<this.likes.length;++i){
        if(this.likes[i].Liker == this.settings.user.name){
          var req = new HttpParams().set('lid',this.likes[i].Lid);
          this.$http.delete(this.settings.URL+":9999/like/"+this.likes[i].Lid).subscribe(res=>{
            console.log(res);
            alert("取消点赞成功");
            this.dianzannum--;
            this.likes.splice(i,1);
            return ;
          })
          return ;
        }
      }
    }

    var req_ = {
      liker : this.settings.user.name,
      id : this.selectedBlog.id
    }
    this.$http.post(this.settings.URL+":9999/like/likeit",req_).subscribe(res=>{
      console.log(res);
      alert("点赞成功");
      this.dianzannum++;
      this.$http.get(this.settings.URL+":9999/like/id/"+this.selectedBlog.id).subscribe(res=>{
        console.log(res);
        this.res_data = res;
        var likes = this.res_data.Message;
        if(likes == null){
          this.dianzannum = 0;
        } else {
          this.dianzannum = likes.length;
          this.likes = likes;
        }
      })
    })
  }

  edit() : void {
    if(this.editable){
      this.selectedBlog.content = this.contentInput;
      this.selectedBlog.title = this.titleInput;
      // 修改博客内容
      var form = {
        Content : this.contentInput,
        Title : this.titleInput,
      }
      this.$http.put(this.settings.URL+":9999/article/"+this.selectedBlog.id,form).subscribe(res=>{
        console.log(res);
      })
      this.editable = false;
    } else {
      this.contentInput = this.selectedBlog.content;
      this.titleInput = this.selectedBlog.title;
      this.editable = true;
    }
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
      if(this.comments == null){
        this.comments = [{
          Content:req.content,
          Publisher:req.publisher,
        }]
      } else {
        this.comments.push({
          Content:req.content,
          Publisher:req.publisher,
        })
      }
      this.displayComment = false;
    })
  }

  fanhui(): void{
    // this.settings.setParam({needsRefresh:true});
    this.router.navigateByUrl("/")
  }

}
