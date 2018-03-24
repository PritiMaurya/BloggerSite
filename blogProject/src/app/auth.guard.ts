import {Injectable, OnInit} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {ApiService} from "./api.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private service: ApiService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.service.checkToken()) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
}
