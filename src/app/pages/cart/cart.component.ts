import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';
import { DbService } from '../../services/db/db.service';

declare var Razorpay: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  title = 'Cart';
  productLength: any[] = [];
  checkOutPrice! : number;
  currentUser: any;

  constructor(private titleService: Title, private as:ApiService, private route:Router, private data:DbService){ 
    titleService.setTitle(this.title);
    
    const storedProducts = localStorage.getItem('myProducts');
    if (storedProducts) {
      this.productLength = JSON.parse(storedProducts);
    }
    console.log(this.productLength);

    const userEmail:any = localStorage.getItem('currentUser');
    
    this.data.getUserByEmail(userEmail).subscribe(existingUser => {
      if (existingUser.length === 1) {
        this.currentUser = existingUser[0].payload.doc.data();
        console.log(this.currentUser);
      }
    });
  }

  incr(item: any) {
    if (item.count >= 10) {
      item.isDisabled=true;
    }else {
      item.count++;
      item.isDisabled2=false;
    }
    this.saveToLocalStorage();
  }

  decr(item: any) {
    if (item.count <= 1) {
      item.isDisabled2=true;
    }else {
      item.count--;
      item.isDisabled=false;
    }
    this.saveToLocalStorage();
  }
  saveToLocalStorage() {
    localStorage.setItem('myProducts', JSON.stringify(this.productLength));
  }

  calculateTotalPrice(item: any): number {
    return item.price * item.count;
  }
  TotalPrice(): number {
    let totalPrice = 0;
    for (const item of this.productLength) {
      totalPrice += item.price * item.count;
    }
    this.checkOutPrice = totalPrice;
    return totalPrice;
  }

  removecart(id:number){
    const index = this.productLength.findIndex((item: any) => {
      return item.id === id;
    });

    if (index !== -1) {
      this.productLength.splice(index, 1);
      const updatedProducts = JSON.stringify(this.productLength);
      localStorage.setItem('myProducts', updatedProducts);
      
      this.as.updateCartCount(this.productLength.length);
      console.log(this.productLength.length);
    } else {
        console.log("Item not found in Cart.");
    }
  }
  checkOut(){
    const token = localStorage.getItem('token');
    if(this.checkOutPrice === 0){
      alert("Cart is empty. \nPlease add item.");
    }else{
      if(token) {
        const RozarpayOptions = {
          description: 'payment for My Cart Product',
          currency: 'INR',
          amount: this.checkOutPrice * 100,
          pname: 'My Order',
          key: 'rzp_test_UzmHM4EQPTg5qR',
          prefill: {
            name: this.currentUser.username,
            email: this.currentUser.email
          },
          theme: {
            color: '#00bfff',
          },
          modal: {
            ondismiss: () =>{
              alert('Payment Canceled.')
            }
          },
          brand: 'All Products',
          image: '../../../assets/icon.png',
        }
  
        const successCallback = (paymentid: any) => {
          alert(paymentid);
        }
        const errorCallback = (e: any) => {
          alert(e);
        }
        Razorpay.open(RozarpayOptions, successCallback, errorCallback)
      } else{
        const confirmed = window.confirm("Please login first. Do you want to proceed to the login page?");
        if (confirmed) {
          this.route.navigateByUrl('/login');
        }
      }
      console.log(this.checkOutPrice);
    }
  }
}

