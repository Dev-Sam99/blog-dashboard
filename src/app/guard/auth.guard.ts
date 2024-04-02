import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  Observable<boolean | UrlTree> 
  | Promise<boolean | UrlTree> 
  | boolean 
  | UrlTree=> {
    
  if(inject(AuthService).isLoggedInGuard || JSON.parse(localStorage.getItem('user'))){
  
    return true;
  }
  else{
   inject(Router).navigate(['/login']);
    return false;
  }

};


