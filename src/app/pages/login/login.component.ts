import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  title = 'Login';
  showPassword = false;
  logoutValue = true;
  
  constructor(private titleService: Title, private auth:AuthService, private route:Router){ 
    titleService.setTitle(this.title);
  }

  clicking(){
    this.showPassword = !this.showPassword;
  }

  login(email: any, password: any) {

    this.auth.login(email.control.value, password.control.value).then((val) => {
        alert('successfully logged in');
        localStorage.setItem('currentUser', email.value);
        localStorage.setItem('token', Math.random().toString());
        this.auth.setBooleanValue(this.logoutValue);
        this.route.navigateByUrl('/dashboard');
      })
      .catch((val) => alert('email or password not matched'));
  }

  loginWithGoogle(){
    this.auth.setBooleanValue(this.logoutValue);
    this.auth.googleSignin();
  }

  loginWithFacebook(){
    alert("This feature is not available.")
  }

}