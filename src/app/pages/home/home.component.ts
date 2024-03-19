import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'S-Mart';
  itemActive = 0;
  intervalId: any;

  items = [
    { image: "https://cdn.dummyjson.com/product-images/5/thumbnail.jpg", title: "Huawei P30", description: "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK." },
    { image: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg", title: "iPhone X", description: "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip." },
    { image: "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg", title: "OPPO F19", description: "OPPO F19 is officially announced on April 2021." },
    { image: "https://cdn.dummyjson.com/product-images/7/thumbnail.jpg", title: "Samsung Galaxy Book", description: "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched." },
    { image: "https://cdn.dummyjson.com/product-images/9/thumbnail.jpg", title: "Infinix INBOOK X1Pro", description: "Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty." },
  ];
  thumbnails = [
    { image: "https://cdn.dummyjson.com/product-images/5/thumbnail.jpg", name: "Huawei P30", link: 5 },
    { image: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg", name: "iPhone X", link: 2 },
    { image: "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg", name: "OPPO F19", link: 4 },
    { image: "https://cdn.dummyjson.com/product-images/7/thumbnail.jpg", name: "Samsung Galaxy Book", link: 7 },
    { image: "https://cdn.dummyjson.com/product-images/9/thumbnail.jpg", name: "INBOOK X1Pro", link: 9 },
  ];
  
  constructor(private titleService: Title){ 
    titleService.setTitle(this.title);
    this.startSlide();
  }

  startSlide() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 4000);
  }
  stopSlide() {
    clearInterval(this.intervalId);
  }
  next() {
    this.itemActive = (this.itemActive + 1) % this.items.length;
  }
  prev() {
    this.itemActive = (this.itemActive - 1 + this.items.length) % this.items.length;
  }
  changeImage(index: number) {
    this.itemActive = index;
  }

}