import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  signUp() {
    this.auth.signUp(this.user).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/private']);
      },
      req => {
        console.log(req);
      }
    );
  }
}
