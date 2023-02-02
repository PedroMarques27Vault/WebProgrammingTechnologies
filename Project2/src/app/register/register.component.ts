import { Component, OnInit } from '@angular/core';
import {User} from "../Models/User";
import {DRFService} from "../Services/drf.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup | null = null;
  constructor(private drf: DRFService, fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),
      email: new FormControl('', [
        Validators.required,
      ])
    });
  }
  register(): void{
    if (this.registerForm){
      this.drf.register(this.registerForm.controls['username'].value, this.registerForm.controls['password'].value, this.registerForm.controls['email'].value).subscribe((u: User)=> {
        this.router.navigate(['/login']);
      });
    }
  }


}






