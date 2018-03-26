import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.css']
})
export class ProfileDataComponent implements OnInit {

  constructor(private service: ApiService) { }
  getProfileData;
  ngOnInit() {
    this.service.getData().subscribe(
      (res) => {
        this.getProfileData = res[0];
      }
    );
  }

}
