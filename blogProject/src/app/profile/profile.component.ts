import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {DialogService} from "ng2-bootstrap-modal";
import {DialogModalComponent} from "../modals/dialog-modal/dialog-modal.component";
import {ConfirmModalComponent} from "../modals/confirm-modal/confirm-modal.component";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  p: Number = 1
  getProfileData;
  constructor(private service: ApiService, private dialogService: DialogService) {
    this.service.getData();
      // .subscribe(
    //   (res) => {
    //     console.log('this.getProfileData', res);
    //     this.getProfileData = res[0];
    //     console.log(this.getProfileData);
    //     this.service.selectAllPost(this.getProfileData._id);
    //   }
    // );
  }

  ngOnInit() {

  }

  deletePost(id) {
    this.dialogService.addDialog(ConfirmModalComponent, {title: 'Delete Post', message: 'Are you sure to delete this post'}).subscribe(
      (data) => {
        if (data) {
          this.service.deletePost(id);
        }
      }
    );
  }

  showAddPostDialog() {
    this.dialogService.addDialog(DialogModalComponent, {title: 'Add Post' , title2: 'Add', id: this.service.getProfileData._id});
  }

  // updatePostDialog(id) {
  //   this.dialogService.addDialog(DialogModalComponent, {title: 'Update Post', title2: 'Update', id: id});
  // }
}
