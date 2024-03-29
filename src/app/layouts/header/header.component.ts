import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  constructor(private authService : AuthService){}
 user:any;
  ngOnInit(): void {
    this.authService.user.subscribe((user)=>{
      this.user = user;
    });
  }
  logOut(){
    this.authService.logOut();
  }
}
