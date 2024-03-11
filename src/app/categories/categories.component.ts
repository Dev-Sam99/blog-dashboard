import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{
  category:any;
  constructor(private firestore: AngularFirestore){}
  ngOnInit(): void {
    
  }

  submitData(formData){
      let categoryData ={
        category : formData.value.category
      }
      console.log(categoryData);
      this.firestore.collection("categories").add(categoryData).then(docRef =>{
        console.log(docRef);
      }).catch(err=>{
        console.log(err);
      })
  }

}
