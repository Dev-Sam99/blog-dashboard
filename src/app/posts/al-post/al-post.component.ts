import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-al-post',
  templateUrl: './al-post.component.html',
  styleUrls: ['./al-post.component.scss']
})
export class AlPostComponent implements OnInit{
  postsList : any;
  constructor(private postService:PostsService){}

 ngOnInit(): void {
  this.postService.loadData().subscribe(val =>{
    console.log(val);
    this.postsList = val;
  })
 }
}
