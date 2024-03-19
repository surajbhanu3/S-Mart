import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  title = 'About';
  
  constructor(private titleService: Title){ 
    titleService.setTitle(this.title);
  }
}
