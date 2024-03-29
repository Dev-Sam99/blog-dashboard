import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 user = new Subject();
  constructor(private authFire : AngularFireAuth,
    private toastr : ToastrService,
    private router : Router) { }

  login(email,password){
    this.authFire.signInWithEmailAndPassword(email,password).then((logRef)=>{
        this.toastr.success("Admin signed in successfully!");
        this.loadUser();
        this.router.navigate(['/']);
    }).catch(e =>{
      this.toastr.warning("wrong credentials!!! " + e?.message);
    })
  }
 loadUser(){
  this.authFire.authState.subscribe(user =>{
    this.user.next(user);
    console.log(JSON.parse(JSON.stringify(user)));
  })
 }

 logOut(){
  this.authFire.signOut().then(()=>{
    this.toastr.success('User logged out successfully...!');
    this.router.navigate(['/login']);
  });
 }

}
