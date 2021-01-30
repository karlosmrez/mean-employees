import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  user = {
    email: '',
    password: ''
  };

  message;

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  signIn() {
    this.auth.signIn(this.user).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/profile']);
      },
      req => {
        console.log(req);
        this.message = req.error;
        console.log(this.message);
      }
    );
  }
}
