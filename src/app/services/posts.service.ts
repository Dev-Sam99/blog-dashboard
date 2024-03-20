import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private fireStorage:AngularFireStorage,private firestore : AngularFirestore,private toastr : ToastrService,private router:Router) { }

  uploadImage(selectedImage,newPost,formStatus,postId){
      const filePath = `postIMG/${Date.now()}`;
      console.log(filePath);
    this.fireStorage.upload(filePath,selectedImage).then(()=>{
      console.log('post image uploaded successfully');
       this.fireStorage.ref(filePath).getDownloadURL().subscribe(URL =>{
        console.log(URL);
        newPost.postImgPath = URL;
        if(formStatus == 'update'){
          this.upadatePostData(postId,newPost);
        }
        else{
        this.saveNewPost(newPost);
        } 
       });
    })
  }
  saveNewPost(newPost){
    this.firestore.collection('posts').add(newPost).then(docRef =>{
      this.toastr.success('New post added successfully!');
    })
  }
  loadData(){
    return this.firestore.collection('posts').snapshotChanges().pipe(
      map(actions => {
        return actions.map( entry => {
          const data = entry.payload.doc.data();
          const id = entry.payload.doc.id;
          return { id , data}
        })
      })
    )
  }
  loadEditPostData(id){
   return this.firestore.doc(`posts/${id}`).valueChanges();
  }
  upadatePostData(postId,postData){
    this.firestore.doc(`posts/${postId}`).update(postData).then(()=>{
      this.toastr.success('Post updated successfully...!');
      this.router.navigate(['/posts']); 
    })
  }
}
