import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(private fb : FormBuilder,
    private authService:AuthService){}
   loginForm :FormGroup;
  ngOnInit(): void {
  this.loginForm = this.fb.group({
    email : ['',[Validators.required, Validators.email]],
    password : ['',Validators.required],
  });
  this.authService.loadUser();
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
