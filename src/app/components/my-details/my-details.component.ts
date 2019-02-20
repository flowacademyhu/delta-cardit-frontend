import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-details',
  templateUrl: './my-details.component.html',
  styleUrls: ['./my-details.component.scss']
})
export class MyDetailsComponent implements OnInit {
  private userPassword: string;
  private currentUser;

  constructor(private userService: UsersService, private router: Router, private auth: AuthService) {
    this.auth.currentUser.subscribe(result => {
      this.currentUser = result;
    })
  }

  ngOnInit() {
  }

  public submit() {
    console.log(this.userPassword);
    console.log(this.currentUser.id);
    this.userService.changeOwnPassword(this.currentUser.id, this.userPassword).subscribe(result => {
      this.router.navigate(['index']);
      console.log(result);
    }, err => {
      console.log(err);
    });
    
  }

}
