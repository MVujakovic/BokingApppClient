import { Component, OnInit } from '@angular/core';
import { ChngPassUser } from './chngPassUser.model';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  Fullname: string;
  Username: string;
  Email: string;
  Role: string;

  constructor(private authService: AuthenticationService, private router: Router) {

  }

  ngOnInit() {
    this.Fullname = (localStorage.getItem("fullname"));
    this.Username = (localStorage.getItem("username"));
    this.Email = (localStorage.getItem("email"));
    this.Role = (localStorage.getItem("role"));
  }

  changePassword(chUser: ChngPassUser, form: NgForm): void {

    this.authService.changePassword(chUser)
      .subscribe(result => {
        if (result === true) {

          this.authService.logOut();
          this.router.navigate(['/login']);
        } else {

          alert('Username or password is incorrect');
          
        }
      });

    // this.authService.changePassword(chngUser.OldPassword,
    //   chngUser.NewPassword,
    //   chngUser.ConfirmPassword)
    //   .subscribe(this.onPost);


    form.reset();
  }

  onPost(res: any): void {
    console.log(res.json());
  }
}
