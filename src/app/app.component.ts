import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './common/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  alertMessage: string = ''

  constructor(private router: Router, private alertService: AlertService){}

  ngOnInit(){
    this.alertService.alert$.subscribe(message => {
      this.alertMessage = message;
      if (message){
        setTimeout(() => this.alertService.clearAlert(), 5000)
      }
    })
  }

  navigateToSignup(){
    this.router.navigate(['/signup']);
  }
  
  navigateToSignin(){
    this.router.navigate(['/signin']);
  }
}
