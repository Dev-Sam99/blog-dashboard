import { Component, OnInit } from '@angular/core';
import { validateEventsArray } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
   imgSrc : any = './assets/img-prev.png';
  selectedImg: any;
  categoryList: { id: string; data: unknown; }[];
  postForm : FormGroup;
  constructor(private catService:CategoriesService,private fb : FormBuilder,private postService : PostsService){
    this.postForm = fb.group({
      title : ['',[Validators.required,Validators.minLength(10)]],
      permalink : [{value:'',disabled:true},[Validators.required]],
      details : ['',[Validators.required,Validators.minLength(50)]],
      category : ['',Validators.required], 
      postImg : ['',Validators.required],
      content :['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.catService.loadData().subscribe(val =>{
      this.categoryList = val;
    })
  }
  get f(){
    return this.postForm.controls;
  }
  onTitleChanged(e){
    let val = e.target.value;
    console.log(val);
    this.postForm.controls.permalink.setValue(val.trim().replace(/\s+/g,'-'));
  }

  showPreview($event){
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target.result
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }

  uploadNewPost(){
    console.log(this.postForm.getRawValue());
    if(this.postForm.invalid){
      return;
    }
    // console.log({...this.postForm.value, permalink : this.postForm.get('permalink').value});
    let newPost =this.postForm.getRawValue();

    console.log(newPost.category.split('-')[0]);
    const newPostData : Post = {
      title : newPost.title,
      permalink : newPost.permalink,
      category :  {
          categoryId :newPost.category.split('-')[0],
          category : newPost.category.split('-')[1]
      },
      postImgPath : '',
      details : newPost.details,
      content : newPost.content,
      isFeatured : false,
      views : 0,
      status : 'new',
      createdAt : new Date()
    }
    this.postService.uploadImage(this.selectedImg);
  }

}
