import { Component, OnInit } from '@angular/core';
import { validateEventsArray } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';

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
  constructor(private catService:CategoriesService,private fb : FormBuilder){
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

  }

}
