import { Component, OnInit } from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfirmModalComponent} from "../confirm-modal/confirm-modal.component";
import {ApiService} from "../../api.service";
export interface DialogData {
  title: String;
  title2: String;
  id: String;
}
@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.css']
})
export class DialogModalComponent extends DialogComponent<DialogData, null> implements DialogData, OnInit {
  title: String;
  title2: String;
  id: String;
  postFrom;
  file;
  constructor(dialogService: DialogService, private service: ApiService) {
    super(dialogService);
  }
  ngOnInit() {
    this.postFrom = new FormGroup({
          status: new FormControl('', Validators.required),
          postImg: new FormControl('')
        });
  }

  changePost(event) {
    console.log('change call');
    const reader = new FileReader;
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.postFrom.get('postImg').setValue({
          name: this.file.name,
          type: this.file.type,
          value: reader.result.split(',')[1]
        });
      };
    }
  }
  onPost() {
    const postData = {
      status: this.postFrom.get('status').value,
      img: this.postFrom.get('postImg').value.value,
      id: this.id
    }
    this.dialogService.addDialog(ConfirmModalComponent, {title: 'Add Post', message: 'Are you sure to add a post'}).subscribe(
      (data) => {
        if (data) {
          console.log(data);
          this.service.addPost(postData).subscribe(
            (res)  => {
              console.log(res);
              this.service.selectAllPost(this.id);
            },
            (err) => {
              console.log(err);
            }
          );
        }
        this.close();
      }
    );
  }

  onUpdate() {
    console.log(' on update ', this.id);
  //   const postData = {
  //     status: this.postFrom.get('status').value,
  //     img: this.postFrom.get('postImg').value.value,
  //     id: this.id
  //   }
  //   this.dialogService.addDialog(ConfirmModalComponent, {title: 'Add Post', message: 'Are you sure to add a post'}).subscribe(
  //     (data) => {
  //       if (data) {
  //         console.log(data);
  //         this.service.addPost(postData).subscribe(
  //           (res)  => {
  //             console.log(res);
  //             this.service.selectAllPost(this.id);
  //           },
  //           (err) => {
  //             console.log(err);
  //           }
  //         );
  //       }
  //       this.close();
  //     }
  //   );
   }
}
