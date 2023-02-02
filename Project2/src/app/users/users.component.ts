import { Component, OnInit } from '@angular/core';
import {Comment} from "../Models/Comment";
import {User} from "../Models/User";
import {DRFService} from "../Services/drf.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = Array<User>();

  constructor(private service: DRFService,
  ) { }

  ngOnInit(): void {
    this.getUsers();

  }

  getUsers(): void{
    this.service.getUsers().subscribe((u: User[])=>
    {
      this.users = u;
    })
  }

  deleteUser(userID: number | null): void {
    confirm('Are You Sure Yow Want To Delete This User?')
    if (userID)
      this.service.deleteUser(userID).subscribe((_)=>{
        window.location.reload()
      })

  }


}
