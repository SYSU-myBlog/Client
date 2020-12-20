import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";  //这里是HttpClient
import { ChangeDetectorRef } from "@angular/core";
import { SettingsService } from '@core';

@Component({
  selector: 'app-blog-list-mine',
  templateUrl: './blog-list-mine.component.html',
  styleUrls: ['./blog-list-mine.component.css'],
})
export class BlogListMineComponent implements OnInit {
  blogs = [];

  res_data : any;
  
  constructor(
    private router: Router,
    private $http: HttpClient,
    private settings: SettingsService,
    private cd:ChangeDetectorRef,
  ) {  
    this.$http.get(this.settings.URL+":9999/article/publisher/"+this.settings.user.id).subscribe(res=>{
      this.res_data = res;
      this.blogs = this.res_data.Message;
      console.log(this.blogs);
      this.cd.detectChanges();
    })
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
    console.log(this.blogs);
    this.router.navigateByUrl('/article/create');
  }

}
