import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{
  categoryForm : FormGroup;
  submitted = false;
  categoryList :any;
  formStatus = "Add";
  editingCategoryId = 0;
  constructor(private fb:FormBuilder,private catService: CategoriesService){}
  ngOnInit(){
    this.categoryForm = this.fb.group({
      category: ['',Validators.required]
  });
    this.catService.loadData().subscribe(data => {
      console.log(data);
      this.categoryList = data;
    })
}
get f() { return this.categoryForm.controls; }

  submitData(){
    this.submitted = true;
    let stringAfterExtraSpacesRemoved= this.categoryForm.value.category.trim().replaceAll('  ','');
    console.log()
    if (stringAfterExtraSpacesRemoved.trim()=='') {
      alert('You are sending blank string as Category Name. Please provide a valid name');
      return;
    }

    if (this.categoryForm.invalid) {
      return;
    }
      let categoryData : Category ={
        category : stringAfterExtraSpacesRemoved,
      }
      if(this.formStatus == 'Add'){
        this.catService.saveData(categoryData);
      }
      else{
        this.catService.updateData(this.editingCategoryId,categoryData);
        this.formStatus = "Add";
      } 
      this.submitted = false;
      this.categoryForm.reset();
  }

  updateCat(id,cat){
    this.editingCategoryId = id;
    this.categoryForm.patchValue({category:cat});
    this.formStatus = "Edit";
  }
  removeCat(id){
    console.log(id);
    this.catService.deleteData(id);
  }

}
