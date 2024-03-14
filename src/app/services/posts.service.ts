import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private fireStorage:AngularFireStorage) { }

  uploadImage(selectedImage){
      const filePath = `postIMG/${Date.now()}`;
      console.log(filePath);
    this.fireStorage.upload(filePath,selectedImage).then(()=>{
      console.log('post image uploaded successfully');
    }).catch(err =>{
      console.log(err);
    })
  }
}
