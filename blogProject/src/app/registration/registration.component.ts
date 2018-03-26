import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  userForm: FormGroup;
  genders = ['Male', 'Female'];
  file;
  inserData;
  constructor(private service: ApiService, private router: Router) {
    if (localStorage.getItem('token')) {
      router.navigate(['/profile']);
    } else {
      router.navigate(['/form']);
    }
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      pass: new FormControl('', [Validators.required, Validators.minLength(5)]),
      cpass: new FormControl('', [Validators.required, Validators.minLength(5)]),
      gender: new FormControl('Male'),
      email: new FormControl('', [Validators.required, Validators.email]),
      pic: new FormControl('')
    });
  }
  changeImage(event)
  {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      console.log(event.target.files[0]);
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.userForm.get('pic').setValue(
          {
            fileName: this.file.name,
            fileType: this.file.type,
            value: reader.result.split(',')[1]
          }
        );
      }
    }
  }
  onRegister()
  {
    this.inserData = {
      name: this.userForm.get('name').value,
      mob: this.userForm.get('mobile').value,
      gen: this.userForm.get('gender').value,
      password: this.userForm.get('pass').value,
      email: this.userForm.get('email').value,
      pic: this.userForm.get('pic').value.value
    }
    // console.log(this.inserData);
    this.service.signUp(this.inserData);
    this.userForm.reset();
  }
}
