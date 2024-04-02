import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { AlPostComponent } from './posts/al-post/al-post.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path:'dashboard',component:DashboardComponent,canActivate : [AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'categories',component:CategoriesComponent,canActivate : [AuthGuard]},
  {path:'posts', component:AlPostComponent,canActivate : [AuthGuard]},
  {path:'posts/new',component:NewPostComponent,canActivate : [AuthGuard]},
  {path:'',redirectTo:'/login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
