import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  private userEmail: string;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private userService: UsersService, private router: Router
    ) { }

  ngOnInit() {
  }

  public submit() {
    this.userService.changePassword(this.userEmail).subscribe(result => {
      this.router.navigate(['']);
      console.log(result);
    }, err => {
      console.log(err);
    });
  }

}
