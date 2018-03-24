import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  token;
  tokenSub: Subscription;
  constructor(private service: ApiService, private router: Router) {
    this.token = localStorage.getItem('token');
    if (this.token != null) {
      this.service.getData();
    }
  }

  ngOnInit() {
    this.tokenSub = this.service.token.subscribe((abc: any) => this.token = abc );
  }

  logout() {
    localStorage.clear();
    this.service.loginStatus = false;
    this.token = null;
    this.router.navigate(['/login']);
    this.tokenSub.unsubscribe();
  }
  ngOnDestroy() {
    this.tokenSub.unsubscribe();
  }

}
