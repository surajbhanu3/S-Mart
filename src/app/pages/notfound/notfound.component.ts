import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css'
})
export class NotfoundComponent {
  title = 'Not Found';
  constructor(private titleService: Title){ 
    titleService.setTitle(this.title);
  }
}