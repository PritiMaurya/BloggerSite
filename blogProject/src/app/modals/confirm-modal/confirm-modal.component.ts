import { Component, OnInit } from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
export interface ConfirmDialog{
  title: String;
  message: String;
}
@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent extends DialogComponent<ConfirmDialog, null> implements ConfirmDialog  {
  title: String;
  message: String;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  result;
  confirm() {
    this.result = true;
    this.close();
  }

  cancel() {
    this.result = false;
    this.close();
  }

}
