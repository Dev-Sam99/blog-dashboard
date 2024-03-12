import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { AlPostComponent } from './posts/al-post/al-post.component';

const routes: Routes = [
  {path:'',component:DashboardComponent},
  {path:'categories',component:CategoriesComponent},
  {path:'posts', component:AlPostComponent},
  {path:'posts/new',component:NewPostComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
