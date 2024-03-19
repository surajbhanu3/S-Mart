import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DbService } from '../../services/db/db.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  title = 'Dashboard';
  userList: any[] = [];
  currentUser: any;

  constructor(private titleService: Title, private data:DbService){ 
    titleService.setTitle(this.title);
    const userEmail:any = localStorage.getItem('currentUser');
    
    this.data.getUserByEmail(userEmail).subscribe(existingUser => {
      if (existingUser.length === 1) {
        this.currentUser = existingUser[0].payload.doc.data();
        console.log(this.currentUser);
      }
    });

  }
}