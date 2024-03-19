import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  title = 'Contact';
  
  constructor(private titleService: Title){ 
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
}