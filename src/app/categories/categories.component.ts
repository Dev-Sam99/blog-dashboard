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
  constructor(private fb:FormBuilder,private catService: CategoriesService){}
  ngOnInit(){
    this.categoryForm = this.fb.group({
      category: ['',Validators.required]
  });

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
      this.catService.saveData(categoryData);
      this.submitted = false;
      this.categoryForm.reset();
  }

}
