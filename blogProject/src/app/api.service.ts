import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Subject} from "rxjs/Subject";

@Injectable()
export class ApiService {
  errMsg = false;
  loginStatus: boolean;
  result;
  data;
  getProfileData;
  allPost;
  baseUrl = 'http://localhost:3001';
  token = new Subject<String>();
  constructor(private http: HttpClient, private router: Router) { }
  signUp(data) {
    this.http.post(this.baseUrl + '/signup', data).subscribe(
      (result) => {
        if (result !== null) {
          console.log('Successfully Register');
          this.result = result;
          localStorage.setItem('token', this.result.token);
          alert('Successfully Register');
          this.loginStatus = true;
          this.token.next(this.result.token);
          this.router.navigate(['/profile']);
        } else {
          console.log('user already register');
          alert('user already register');
        }
      }
    );
  }

  signIn(data) {
    this.http.post(this.baseUrl + '/login', data).subscribe(
      (result) => {
        if (result !== null) {
          console.log('Successfully Login');
          this.result = result;
          console.log(result);
          localStorage.setItem('token', this.result.token);
          this.token.next(this.result.token);
          console.log(this.token);
          alert('Successfully Login');
          this.getData();
          this.errMsg = false;
          this.loginStatus = true;
          this.router.navigate(['/profile']);
        } else {
          console.log('invalid username or password');
          this.errMsg = true;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  checkToken() {
    const token = localStorage.getItem('token');
    console.log(token);
    return this.http.get(this.baseUrl + '/check?token=' + token).subscribe(
      (res) => {
        this.data = res[0];
        console.log('auth');
        console.log(this.data);
        if (token === this.data.token) {
          return true;
        } else {
          return false;
        }
      }
    );
  }

  getData() {
    const token = localStorage.getItem('token');
    return this.http.get(this.baseUrl + '/getData?token=' + token).subscribe(
      (res) => {
        this.getProfileData = res[0];
        this.selectAllPost(this.getProfileData._id);
      }
    );
  }

  addPost(data) {
    return this.http.post(this.baseUrl + '/addPost', data);
  }

  deletePost(id) {
    this.http.get(this.baseUrl + '/deletePost/?id=' + id).subscribe(
      () => {
        console.log('one post deleted');
        this.selectAllPost(this.getProfileData._id);
      }
    );
  }

  editProfileData(id, data) {
    return this.http.post(this.baseUrl + '/editUser?id=' + id, data);
  }

  selectAllPost(id) {
    console.log('selectAllPost call');
    this.http.get(this.baseUrl + '/getPost/?id=' + id).subscribe(
      (res) => {
        console.log('get all data of post');
        this.allPost = res;
        console.log(res);
      }
    );
  }
}
