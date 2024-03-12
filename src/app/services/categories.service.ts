import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private firestore : AngularFirestore,private toastr : ToastrService) { }

  saveData(categoryData){
    this.firestore.collection("categories").add(categoryData).then(docRef =>{
      console.log(docRef);
      this.toastr.success('New category added successfully...!');
    }).catch(err=>{
      console.log(err);
      this.toastr.warning('Error while adding new category...!');

    })
  }
}
