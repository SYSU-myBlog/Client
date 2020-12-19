import { Component, OnInit , Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";  //这里是HttpClient
import { SettingsService } from '@core';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit {
  blogs = [];
  
  constructor(
    private router: Router,
    private $http: HttpClient,
    private settings: SettingsService,
  ) { 
    this.$http.get(this.settings.URL+":9999/article/all").subscribe(res=>{
      var res_obj = {
        Message : [],
      }
      res_obj = res;
      this.blogs = res_obj.Message;
      console.log(this.blogs);
    })
    // this.blogs = [
    //   {id:"123",title:"我好菜",content:"hhhhhh",publisher:"123"},
    //   {id:"123",title:"我好菜",content:"hhhhhh"},
    //   {id:"123",title:"我好菜",content:"hhhhhh"},
    //   {id:"123",title:"我好菜",content:"hhhhhh"},
    //   {id:"123",title:"我好菜",content:"hhhhhh"},
    //   {id:"123",title:"我好菜",content:"hhhhhh"},
    //   {id:"123",title:"我好菜",content:"hhhhhh"},
    //   {id:"123",title:"我好菜",content:"hhhhhh"},
    // ]
  }

  ngOnInit(): void {

  }

  onSelect(blog): void {
    var blog_data = {
      Aid : "",
      Title : "",
      Content : "",
      Publisher : "",
      LastModified : "",
    }
    blog_data = blog;
    
    this.settings.setBlog({
      id: blog_data.Aid,
      title: blog_data.Title,
      content: blog_data.Content,
      publisher: blog_data.Publisher,
      lastModified : blog_data.LastModified,
    });

    this.router.navigateByUrl('/article/detail');
  }

  clickCreate() :void {
    this.router.navigateByUrl('/article/create');
  }

}
