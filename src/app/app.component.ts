import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router){}

  navigateToSignup(){
    this.router.navigate(['/signup']);
  }
  
  navigateToSignin(){
    this.router.navigate(['/signin']);
  }
}
