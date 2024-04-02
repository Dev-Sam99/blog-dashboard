import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Observable, filter } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  constructor(private authService : AuthService, private router : Router){}
  userEmail:string;
  ngOnInit(): void {
    this.userEmail=JSON.parse(localStorage.getItem('user'))?.email;
    console.log('mail',this.userEmail)

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe((event:any)=>{
      console.log(event)
    this.userEmail=JSON.parse(localStorage.getItem('user'))?.email;
    console.log(this.userEmail)
    });
  }

  logOut(){
    this.authService.logOut();
  }
}
