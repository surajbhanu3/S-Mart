import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from '../../services/api/api.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  title = 'Products';
  products: any[] = [];
  categories: { [key: string]: any[] } = {};
  pageName = 'products';
  searchts!: string;
  productLength: any[] = [];
  productsArray: any[] = [];

  constructor(private titleService: Title, private as:ApiService){
    this.as.searchTs.subscribe(searchTs => {
      this.searchts = searchTs;

      this.as.getFilterProduct(this.searchts).subscribe((data:any) => {
        this.products = data.products;
      })

    });

    this.as.getActivePage(this.pageName);
    // this.as.cartSubObs.subscribe((data)=>this.c=data);

    titleService.setTitle(this.title);

    this.as.getProducts().subscribe((data:any) => {
      this.products = data.products.map((product: any) => ({ ...product, count: 1, isDisabled: false, isDisabled2: true }));
      
      this.products.forEach((product: any) => {
        const category = product.category;
        if (this.categories[category]) {
          this.categories[category].push(product);
        } else {
          this.categories[category] = [product];
        }
      });
    });

    const storedProducts = localStorage.getItem('myProducts');
    if (storedProducts) {
      this.productLength = JSON.parse(storedProducts);
    }
    
  }

  showAll(){
    this.as.getProducts().subscribe((data:any) => {
      this.products = data.products;
    });
  }
  filterAll(e:any){
    this.as.getCategoryProduct(e.target.textContent).subscribe((data:any) => (this.products = data.products));
  }

  addtocart(prod:Object){
    const storedProducts = localStorage.getItem('myProducts');
    if (storedProducts) {
      this.productsArray = JSON.parse(storedProducts);
    }
    
    this.productsArray.push(prod);
    const updatedProducts = JSON.stringify(this.productsArray);
    localStorage.setItem('myProducts', updatedProducts);

    this.productLength = this.productsArray;
    this.as.updateCartCount(this.productLength.length);
    console.log(this.productLength.length);
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
}