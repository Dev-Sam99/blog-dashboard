import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

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

  loadData(){
    return this.firestore.collection('categories').snapshotChanges().pipe(
      map(actions => {
        return actions.map( entry => {
          const data = entry.payload.doc.data();
          const id = entry.payload.doc.id;
          return { id , data}
        })
      })
    )
  }

  updateData(id,newData){
    this.firestore.doc(`categories/${id}`).update(newData).then(decRef =>{
      this.toastr.success('Category updated successfully...!');
    })
    // .catch(err =>{
    //   this.toastr.warning('Error occurred while updating category.');
    // })
  }

  deleteData(id){
    this.firestore.doc(`categories/${id}`).delete().then(docref =>{
      this.toastr.info('category deleted from the list...!');
    })
    // .catch(err =>{
    //   this.toastr.warning('Error occurred while deleting category.');

    // })
  }
}
