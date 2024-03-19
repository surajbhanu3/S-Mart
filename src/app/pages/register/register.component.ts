import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { DbService } from '../../services/db/db.service';
import { Users } from '../../model/users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  title = 'Register';
  logoutValue = true;
  userObj : Users = {
    username: '',
    phno: '',
    email: '',
    password: '',
    gender: ''
  };

  username: string = '';
  phoneno: string = '';
  emailid: string = '';
  pass: string = '';
  gen: string = '';


  constructor(
    private titleService: Title, 
    private auth: AuthService, 
    private router: Router,
    private data:DbService){ 

      titleService.setTitle(this.title);
  }

  appNumbersOnly(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];

    if ( allowedKeys.includes(event.key) || (event.key >= '0' && event.key <= '9')) {
      return; // Allow: backspace, delete, arrow keys, and numbers
    } else {
      event.preventDefault();
    }
  }

  
  submit(form: any, username: any, phno: any, email: any, password: any, gender: any) {
    
    if( form.value.email === '' ) {
      alert("please fill the form");
    }
    else {
      this.auth.signup(email.control.value, password.control.value)
        .then((val) => {
          console.log(val);
        }).catch((err) => console.log(err))

      this.userObj.username = this.username;
      this.userObj.phno = this.phoneno;
      this.userObj.email = this.emailid;
      this.userObj.password = this.pass;
      this.userObj.gender = this.gen;

      this.data.addUsers(this.userObj);
    }
    alert("You are Successfully Registered");
    this.router.navigate([ '/login' ]);
  }

  loginWithGoogle(){
    this.auth.setBooleanValue(this.logoutValue);
    this.auth.googleSignin();
  }

  loginWithFacebook(){
    alert("This feature is not available.")
  }
}