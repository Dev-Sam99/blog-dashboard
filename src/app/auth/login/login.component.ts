import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(private fb : FormBuilder,
    private authService:AuthService,
    private router:Router){}
   loginForm :FormGroup;

  async ngOnInit() {
  this.loginForm = this.fb.group({
    email : ['',[Validators.required, Validators.email]],
    password : ['',Validators.required],
  });
  if(localStorage.getItem('user')){
    this.router.navigate(['/dashboard'])
  }
  }
  
  get f(){
    return this.loginForm.controls;
  }
  loginAsAdmin(){
    if(this.loginForm.invalid){
      return;
    }
  this.authService.login(this.loginForm.value.email,this.loginForm.value.password);
  
  }
}
