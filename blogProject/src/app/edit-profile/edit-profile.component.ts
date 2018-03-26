import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../api.service";
import {DialogService} from "ng2-bootstrap-modal";
import {ConfirmModalComponent} from "../modals/confirm-modal/confirm-modal.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userEditForm: FormGroup;
  getProfileData;
  constructor(private service: ApiService, private dialogService: DialogService, private router: Router) {
    this.userEditForm = new FormGroup({
      pname: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      pic: new FormControl('')
    });
  }
  ngOnInit() {
    this.service.getData().subscribe(
      (res) => {
        this.getProfileData = res[0];
        this.userEditForm.setValue({
          pname: this.getProfileData.name,
          mobile: this.getProfileData.mobile,
          pic: this.getProfileData.pic
        });
      }
    );
    // console.log('edit');
  }

  changeImageEdit(event) {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.userEditForm.get('pic').setValue({
        name: file.name,
        type: file.type,
        value: reader.result.split(',')[1]
      });
    };
  }

  onEdit() {
    this.dialogService.addDialog(ConfirmModalComponent, {title: 'Edit Profile', message: 'Are You sure to update your Profile'}).subscribe(
      (data) => {
        if (data) {
          this.service.editProfileData(this.getProfileData._id, {name: this.userEditForm.value.pname, mobile: this.userEditForm.value.mobile, pic: this.userEditForm.value.pic.value }).subscribe(
            (res) => {
              console.log(res);
              this.router.navigate(['/profile']);
            }
          );
          this.userEditForm.reset();
        }
      }
    );
  }
}
