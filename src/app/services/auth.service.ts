import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedInGuard : boolean = false;
  constructor(private authFire : AngularFireAuth,
    private toastr : ToastrService,
    private router : Router) { }

  login(email,password){
    this.authFire.signInWithEmailAndPassword(email,password).then((logRef)=>{
        this.toastr.success("Admin signed in successfully!");
        this.loadUser();
        this.isLoggedInGuard = true;
    }).catch(e =>{
      this.toastr.warning("wrong credentials!!! " + e?.message);
    })
  }
  
 loadUser(){
     this.authFire.authState.subscribe(user =>{
    localStorage.setItem('user',JSON.stringify(user));
    this.router.navigate(['/dashboard']);
});
 }

 logOut(){
  this.authFire.signOut().then(()=>{
    this.toastr.success('User logged out successfully...!');
    localStorage.removeItem('user');
    this.isLoggedInGuard = false;
    this.router.navigate(['/login']);
  });
 }

}
