import { Component, OnInit } from '@angular/core';
import {DRFService} from "../Services/drf.service";
import {Sold} from "../Models/Sold";
import {User} from "../Models/User";

@Component({
  selector: 'app-sold',
  templateUrl: './sold.component.html',
  styleUrls: ['./sold.component.css']
})
export class SoldComponent implements OnInit {
  soldItems = Array<Sold>();
  constructor(private service: DRFService) { }

  ngOnInit(): void {
    this.getSold()
  }

  getSold():void {
    this.service.profile().subscribe((user:User)=>{

      this.service.getSoldHistory(user.username).subscribe((sold: Sold[]) => {
        this.soldItems = sold
      });
    })

  }

}
