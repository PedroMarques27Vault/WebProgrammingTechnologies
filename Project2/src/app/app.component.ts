import {Component, OnInit} from '@angular/core';
import {DRFService} from "./Services/drf.service";
import {User} from "./Models/User";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'TPW-Project2';
  user: User|null=null;
  private static isAdmin: boolean;

  constructor(public drfService: DRFService) {

  }
  logout(): void{
    localStorage.clear();
    AppComponent.isAdmin = false;
  }



  public slides = [
    { src: "https://image1.com" },
    { src: "https://image2.com" },
    { src: "https://image3.com" },
    { src: "https://image4.com" }
  ];

  static isUserAdmin(value: boolean) {
    AppComponent.isAdmin= value;
  }

  isUserAdmin() {
    return AppComponent.isAdmin
  }
}
