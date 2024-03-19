import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';
import { GoogleAuthProvider, FacebookAuthProvider } from '@angular/fire/auth';
import { DbService } from '../db/db.service';
import { Users } from '../../model/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userList: any[] = [];
  userName:any;
  userEmail:any;
  userObj : Users = {
    username: '',
    phno: '',
    email: '',
    password: '',
    gender: ''
  };

  private showLogoutBtn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private auth: AngularFireAuth, private router: Router,private data:DbService) {
    console.log("service started");
    
  }
  

  async signup(email: string, password: string) {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword( email, password );
      return userCredential;
    } catch (error: any) {
      console.error('Signup error:', error.message);
      throw new Error(error.message);
    }
  }

  async login(email: string, password: string) {
    try {
      const userCredential = await this.auth.signInWithEmailAndPassword( email, password );
      return userCredential;
    } catch (error: any) {
      console.error('Login error:', error.message);
      throw new Error(error.message);
    }
  }

  googleUserData(){
    this.data.getUserByEmail(this.userEmail).subscribe((existingUser: string | any[]) => {





      
      if (existingUser.length === 0) {
        // User does not exist in Firestore, so add them
        this.userObj.username = this.userName;
        this.userObj.phno = '';
        this.userObj.email = this.userEmail;
        this.userObj.password = '';
        this.userObj.gender = '';

        this.data.addUsers(this.userObj).then(() => {
          console.log('User added successfully');
        }).catch((error: any) => {



          
          console.error('Error adding user to Database:', error);
        });
      } else {
        console.log('User with the email already exists');
      }
    });
  }
  googleSignin(){
    return this.auth.signInWithPopup(new GoogleAuthProvider()).then(res => {
      const user = res?.user;
      if (user) {
        this.userName = user.displayName;
        this.userEmail = user.email;

        this.googleUserData();
        localStorage.setItem('token', Math.random().toString());
        localStorage.setItem('currentUser', this.userEmail);
        
        this.router.navigate(['/dashboard']);
      } else {
          console.error("User is null");
      }
    }, err => {
      alert(err.message);
    })

  }

  async logout() {
    await this.auth.signOut();
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']); // Redirect to login after logout
  }

  setBooleanValue(value: boolean): void {
    this.showLogoutBtn.next(value);
  }
  getBooleanValue(): BehaviorSubject<boolean> {
    return this.showLogoutBtn;
  }

}