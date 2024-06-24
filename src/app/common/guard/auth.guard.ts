import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from 'src/app/model/service/authService/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>{
    return this.authService.isLoggedIn().pipe(
      take(1),
      map((isLoggedIn: boolean)=>{
        if(!isLoggedIn){
          this.router.navigate(['notfound'])
          return false
        }
        return true;
      })
    )
  }
}
