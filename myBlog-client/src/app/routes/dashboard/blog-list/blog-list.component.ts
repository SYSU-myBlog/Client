import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpParams } from "@angular/common/http";  //这里是HttpClient
import { ChangeDetectorRef } from "@angular/core";
import { BLOG, SettingsService } from '@core';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit {
  blogs = [];

  res_data : any;

  pageIndex = 1;
  
  BLOG: BLOG;
  constructor(
    private router: Router,
    private $http: HttpClient,
    private settings: SettingsService,
    private cd:ChangeDetectorRef,
  ) {  
    
    this.BLOG = this.settings.BLOG;
    if (this.BLOG.flag == false) {
      let req = new HttpParams().set('page', this.pageIndex+"").set('eachPage',"5");
      this.$http.get(this.settings.URL+":9999/article/",{params:req}).subscribe(res=>{
        this.res_data = res;
        this.blogs = this.res_data.Message;
        // console.log(this.blogs);
        this.cd.detectChanges();
      })
    }
    else {
      let req = this.BLOG.search;
      this.$http.get(this.settings.URL+":9999/article/title/"+req).subscribe(res=>{
        this.res_data = this.BLOG.blog;
        this.blogs = this.BLOG.blog;
        this.cd.detectChanges();
      })
      
    }
    console.log(this.BLOG.flag)
    
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

  clickLeft() :void{
    if(this.pageIndex == 1){
      return ;
    }
    this.pageIndex = this.pageIndex - 1;
    let req = new HttpParams().set('page', this.pageIndex+"").set('eachPage',"5");
    this.$http.get(this.settings.URL+":9999/article/",{params:req}).subscribe(res=>{
      this.res_data = res;
      this.blogs = this.res_data.Message;
      // console.log(this.blogs);
      this.cd.detectChanges();
    })
  }

  clickRight() :void{
    if(this.blogs == null || this.blogs.length == 0){
      return ;
    }
    this.pageIndex = this.pageIndex + 1;
    let req = new HttpParams().set('page', this.pageIndex+"").set('eachPage',"5");
    this.$http.get(this.settings.URL+":9999/article/",{params:req}).subscribe(res=>{
      this.res_data = res;
      this.blogs = this.res_data.Message;
      // console.log(this.blogs);
      this.cd.detectChanges();
    })
  }

}
