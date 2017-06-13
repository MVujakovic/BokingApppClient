import { NgForm, FormsModule } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { User } from '../user/user.model';
import { RegisterService } from '../services/register.service';
import { Http, Response } from '@angular/http';

import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[RegisterService]
})
export class RegisterComponent implements OnInit {

  choosenRole:string;
  constructor(private registerService: RegisterService) { }
  
  ngOnInit() {
  }

  addUser(newUser:User,form:NgForm):void{
    // var u=new User();
    // u.Name=newUser.Name;
    // u.Lastname=newUser.Lastname;
    // u.Email=newUser.Email;
    // u.Password=newUser.Password;
    // u.ConfirmPassword=newUser.ConfirmPassword;
    // u.Role=newUser.Role;
    
    

    newUser.Role=this.choosenRole;

    this.registerService.postUser(newUser).subscribe(this.onPost);
    form.reset();
  }

   onPost(res:any):void{
     console.log(res.json());
   }

}
