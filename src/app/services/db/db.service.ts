import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { Users } from '../../model/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private afs:AngularFirestore) { }

  addUsers(users: Users){
    return this.afs.collection('/Users').add(users);
  }

  getUser(){
    return this.afs.collection('/Users').snapshotChanges();
  }

  getUserByEmail(email: string): Observable<any[]> {
    return this.afs.collection('/Users', ref => ref.where('email', '==', email)).snapshotChanges();
  }

}